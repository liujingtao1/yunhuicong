<template>
  <div>
    <!-- inline：代表的是行内表单，代表一行可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1" :disabled="show">
          <el-option :label="list1.name" :value="list1.id" v-for="(list1,index) in list1" :key="list1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handler2" :disabled="show">
          <el-option :label="list2.name" :value="list2.id" v-for="(list2,index) in list2" :key="list2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3" :disabled="show">
          <el-option :label="list3.name" :value="list3.id" v-for="(list3,index) in list3" :key="list3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      // 一级分类的数据
      list1:[],
      // 二级分类的数据
      list2:[],
      // 三级分类的数据
      list3:[],
      // 收集相应的一级二级三级分类的id
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
      },
    }
  },
  // 组件挂载完毕：向服务器发请求，获取相应的一级分类的数据
  mounted() {
    // 获取一级分类的数据的方法
    this.getCategory1List();
  },
  methods: {
    // 获取一级分类数据的方法
    async getCategory1List(){
      // 获取一级分类的请求：不需要携带参数
      let result = await this.$API.attr.reqCategory1List()
      // console.log(result);
      if(result.code == 200){
        this.list1 = result.data;
      }
    },
    // 一级分类的select事件回调（当一级分类的option发送变化的时候获取相应二级分类数据）
    async handler1(){
      // 清除数据
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = '';
      this.cForm.category3Id = '';
      // 解构出一级分类的id
      const {category1Id} = this.cForm;
      this.$emit('getCategoryId',{categoryId:category1Id,level:1});
      // 通过一级分类的id，获取二级分类的数据
      let result = await this.$API.attr.reqCategory2List(category1Id)
      // console.log(result);
      if(result.code == 200){
        this.list2 = result.data;
      }
    },
    // 二级分类的select事件回调（当一级分类的option发送变化的时候获取相应二级分类数据）
    async handler2(){
      // 清除数据
      this.list3 = [];
      this.cForm.category3Id = '';
      // 解构出一级分类的id
      const {category2Id} = this.cForm;
      this.$emit('getCategoryId',{categoryId:category2Id,level:2})
      // 通过一级分类的id，获取二级分类的数据
      let result = await this.$API.attr.reqCategory2List(category2Id)
      // console.log(result);
      if(result.code == 200){
        this.list3 = result.data;
      }
    },
    // 三级分类的事件回调
    handler3(){
      // 获取三级分类id
      const {category3Id} = this.cForm;
      this.$emit('getCategoryId',{categoryId:category3Id,level:3})
    }
  },
};
</script>

<style>
</style>