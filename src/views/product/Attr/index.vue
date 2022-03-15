<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格：展示平台属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <!-- {{scope.row.status}} -->
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
                >修改</el-button
              >
              <el-button type="danger" icon="el-icon-delete" size="mini"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form ref="form" label-width="80px" :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column width="width" prop="prop" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <!-- 这里的结构需要用到span与input进行来回的切换 -->
              <el-input
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column width="width" prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收平台属性的字段
      attrList: [],
      // 控制table表格显示与隐藏
      isShowTable: true,
      // 收集新增属性|修改属性用的
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [
          // 属性名称的属性值，因为属性值可以是多个，因此需要的是数组，每一个属性值都是一个对象，需要attrId，valueName
          // {
          //   attrId: 0, // 属性名的id
          //   valueName: "", // 属性值
          // },
        ],
        categoryId: 0, // category3Id 三级分类的id
        categoryLevel: 3, // 因为服务器也需要区分几级id
      },
    };
  },
  methods: {
    // 自定义事件的回调
    getCategoryId({ categoryId, level }) {
      // console.log(getCategoryId);
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
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    // 当用户确定三级分类的数据的时候，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      // 获取分类的id
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值回调
    addAttrValue() {
      // 向属性值的数组里面添加元素
      // attrId:相应属性的ID，目前而言我们是添加属性的操作，还没有相应的属性的id，目前而言带给服务器的id为undefined
      // valueName:相应属性值的名称
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, // 对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值（新增属性值的时候，需要把已有的属性的id带上）
        valueName: "",
        flag: true, // flag属性：给每一个属性值添加一个标记flag，用于切换查看模式与编辑模式，好处是每一个属性值可以控制自己的模式切换
        // 当前的flag属性，响应式属性（数据变化视图跟着变化）
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性按钮的回调
    addAttr() {
      // 切换table显示与隐藏
      this.isShowTable = false;
      // 清除数据
      // 收集三级分类的ID
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 修改某一个属性
    updateAttr(row) {
      // console.log(row);
      // isShowTable变为false
      this.isShowTable = false;
      // 将选中的属性赋值给attrInfo
      // 由于数据结构当中存在对象里面套数组，数组里面有套对象，因此需要使用深拷贝解决这类问题
      // 深拷贝，浅拷贝，深拷贝实现方法有两种，一种是使用递归函数，还有一种则是使用JSON中的stringify和parse
      this.attrInfo = cloneDeep(row);
      // 在修改某一个属性的时候，将相应的属性值元素添加上flag这个标记
      this.attrInfo.attrValueList.forEach((item) => {
        // 这样书写也可以给属性值添加flag字段，但是会发现不是响应式数据
        // item.flag = false;
        // 第一个参数：对象，第二个参数：添加新的响应式属性，第三个参数：新的属性的属性值
        this.$set(item, "flag", false);
      });
    },
    // 失去焦点的事件---切换为查看模式，展示span
    toLook(row) {
      // 如果属性值为空，不能作为新的属性值，需要给用户提示，让它输入一个其他的属性值
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性值");
        return;
      }
      // 新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // 需要将row从数组里面判断的时候去除
        // console.log(item);
        // row最新增的属性值【数组的最后一项元素】
        // 判断的时候，需要把已有的数组当中新增的这个属性值去除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      // console.log(isRepat);
      if (isRepat) {
        this.$message("输入的值不能重复！！");
        row.valueName = "";
        return;
      }
      // row：形参是当前用户添加的最新的属性值
      // 当前编辑模式变为查看模式【让input消失，显示span】

      row.flag = false;
    },
    // 点击span的回调，变为编辑模式
    toEdit(row, index) {
      row.flag = true;
      // console.log(index,this);
      // 获取input节点，实现自动聚焦
      // 需要注意：点击span的时候，切换为input变为编辑模式，但是需要注意，对于浏览器而言，页面重绘与重排耗时间
      // 点击span的时候，重绘重排一个input，它是需要耗费时间的，因此我们不可能一点击span立马获取到input
      // $nextTick：当节点渲染完毕，会执行一次
      this.$nextTick(() => {
        // 获取相应的input表单元素实现聚焦
        this.$refs[index].focus();
        // console.log(this.$refs);
      });
    },
    // 气泡确认框确定按钮的回调
    // 最新版本的elementUI----2.15.6，目前模板中的版本号是2.13.x
    deleteAttrValue(index){
      // 当前这个删除属性值的操作是不需要发请求的
      this.attrInfo.attrValueList.splice(index,1);
    },
    // 保存按钮：进行添加属性或者修改属性的操作
    async addOrUpdateAttr(){
      // 整理参数
      // 1：如果用户添加了很多属性值，且属性值为空的不应该提交给服务器
      // 2：提交给服务器的数据当中不应该出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
        // 过滤掉属性值不是空的
        if(item.valueName!=''){
          // 删除掉flag属性
          delete item.flag;
          return true;
        }
      });
      try {
        // 发请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        // 提示消息
        this.$message({type:'success',message:'保存成功'});
        // 保存成功以后需要再次获取平台属性进行展示
        this.getAttrList();
        // 展示平台属性的信号量进行切换
        this.isShowTable = true;
      } catch (error) {
        this.$message('保存失败')
      }
    }
  },
};
</script>

<style scoped>
</style>