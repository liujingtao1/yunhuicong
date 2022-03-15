<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(kg)" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-sort-up"
            size="mini"
            v-if="row.isSale == 0"
            @click="sale(row)"
            >上架</el-button
          >
          <el-button
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            v-else
            @click="cancel(row)"
            >下架</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @current-change="getSkuList"
      @size-change="handleSizeChange"
      style="text-align: center"
      :current-page="1"
      :page-sizes="[3, 5, 10]"
      :page-size="10"
      layout=" prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉效果 -->
    <el-drawer :visible.sync="drawer" :show-close="false" size="45%" v-loading="show">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              style="margin-right: 10px"
              v-for="(attr, index) in skuInfo.skuAttrValueList"
              :key="attr.id"
              >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="12">
          <template>
            <el-carousel height="350px">
              <el-carousel-item v-for="(item,index) in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="height:350px;width:100%">
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, // 代表当前第几页
      limit: 10, // 代表当前页面有几条数据
      records: [], // 存储sku列表数据
      total: 0, // 存储分页器一共展示的数据
      skuInfo: {}, // 存储sku信息
      drawer: false, // 判断是否显示抽屉
      show: false,
    };
  },
  // 组件挂载完毕
  mounted() {
    // 获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    // 获取sku列表数据的方法
    async getSkuList(pages = 1) {
      this.page = pages;
      // 解构出默认的参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      // console.log(result)
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    // 一页展示多少条数据变化时触发
    handleSizeChange(limit) {
      // 修改参数
      this.limit = limit;
      this.getSkuList();
    },
    // 上架
    async sale(row) {
      // console.log('上架',row);
      let result = await this.$API.sku.reqSale(row.id);
      // console.log(result);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功！" });
      }
    },
    // 下架
    async cancel(row) {
      // console.log('下架',row);
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功！" });
      }
    },
    // 修改
    edit() {
      this.$message("这里我就不写了~。~");
    },
    // 获取sku详情的方法
    async getSkuInfo(row) {
      this.skuInfo = {};
      this.show = true;
      // 展示抽屉
      this.drawer = true;
      // 获取sku数据
      let result = await this.$API.sku.reqSkuById(row.id);
      // console.log(result);
      if (result.code == 200) {
        this.skuInfo = result.data;
        this.show = false;
      }
    },
  },
};
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .el-carousel__item{
    border: 1px solid #d3dce6;
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__indicator .el-carousel__button{
    background-color: black;
    width: 10px;
    height: 2px;
  }
</style>
<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
</style>