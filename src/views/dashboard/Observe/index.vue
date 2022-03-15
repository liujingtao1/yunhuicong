<template>
  <div>
    <el-row class="el-row" :gutter="10">
      <div>
          <Search />
      </div>
      <div>
          <Category />
      </div>
    </el-row>
  </div>
</template>

<script>
import Search from './Search';
import Category from './Category';
export default {
    name: 'Observe',
    components: {
      Search,
      Category
    }
}
</script>

<style scoped>
.el-row{
  display: flex;
}
.el-row div{
  width: 704px;
  margin: 0px 5px;
}
</style>