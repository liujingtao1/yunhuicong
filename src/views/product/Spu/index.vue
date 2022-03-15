<template>
  <div>
    <el-card style="margin: 20px 0px">
      <!-- 三级联动已经是全局组件了 -->
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>
    <el-card>
      <!-- 底部这里将来是有三部分进行切换 -->
      <div v-show="scene == 0">
        <!-- 展示Spu列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加Spu</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column label="序号" width="80" type="index" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="Spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="Spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的按钮将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改sku"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align=center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <!-- table展示sku列表 -->
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";
export default {
  name: "Spu",
  data() {
    return {
      // 分别是分类的id
      category1Id: "",
      category2Id: "",
      category3Id: "",
      page: 1, // 分页器当前第几页
      limit: 3, // 每一页需要展示多少条数据
      records: [], // spu列表的数据
      total: 0, // 分页器一共需要展示数据的条数
      scene: 0, // 0代表展示spu列表数据  1代表展示添加与修改spu 2代表添加sku
      dialogTableVisible: false, // 控制对话的显示与隐藏
      spu: {},
      skuList: [], // 存储的是sku列表的数据
      loading:true
    };
  },
  components: {
    SkuForm,
    SpuForm,
  },
  methods: {
    // 点击分页器的第几页按钮的回调
    // handleCurrentChange(page){
    //   // console.log(page)
    //   this.page = page;
    //   this.getSpuList();
    // },
    // 三级联动的自定义事件，可以把子组件的相应的id传递给父组件
    // 自定义事件的回调
    getCategoryId({ categoryId, level }) {
      // console.log(categoryId);
      // 区分三级分类相应的ID
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 代表三级分类的id有了
        this.category3Id = categoryId;
        // 发请求获取平台属性
        this.getSpuList();
      }
    },
    // 获取SPU列表数据的方法
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      // 携带三个参数：page 第几页、 limit 每一页需要展示多少条数据、三级分类id
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      // console.log(result);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
        this.limit = result.data.size;
        this.page = result.data.current;
      }
    },
    // 当分页器的某一个展示数据条数发生变化的回调
    handleSizeChange(limit) {
      // console.log(limit)
      // 修改参数
      this.limit = limit;
      // 再次发送请求
      this.getSpuList();
    },
    // 添加spu按钮的回调
    addSpu() {
      // 切换场景为1
      this.scene = 1;
      // 通知子组件SpuForm发请求---两个
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改某一个spu
    updateSpu(row) {
      this.scene = 1;
      // 获取子组件SpuForm子组件的
      // 在父组件当中可以通过$refs获取子组件等等
      this.$refs.spu.initSpuData(row);
      // console.log(this.$refs.spu);
    },
    // 自定义事件回调（SpuFrom）
    changeScene({ scene, flag }) {
      // flag这个形参是为了区分保存按钮是添加还是修改
      // console.log(scene);
      // 切换结构（场景）
      this.scene = scene;
      // 子组件通知父组件切换场景，需要再次获取spu列表的数据进行展示
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    changeScenes(scene) {
      this.scene = scene;
    },
    // 删除spu的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      // console.log(row);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        // 代表spu个数大于1，删除的时候停留在当前页，如果spu个数小于1，回到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    // 添加sku按钮的回调
    addSku(row) {
      // 切换场景为2
      this.scene = 2;
      // 父组件调用子组件的方法，让子组件发请求，----一共三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // 查看sku的按钮的回调
    async handler(row) {
      // console.log(row);
      this.loading = true;
      // 点击这个按钮的时候，对话框是可见的
      this.dialogTableVisible = true;
      // 保存spu的信息
      this.spu = row;
      // 获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(row.id);
      // console.log(result);
      if (result.code == 200) {
        this.skuList = result.data;
        // loading隐藏
        this.loading = false;
      }
    },
    // 关闭对话框的回调
    close(done){
      // 清除sku列表的数据
      this.skuList = [];
      // 关闭对话框
      done();
    }
  },
  // 组件挂载完毕
  // mounted() {
  //     console.log('发请求');
  // },
};
</script>

<style scoped>
</style>