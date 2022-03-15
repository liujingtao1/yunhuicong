<template>
  <div>
       <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="权限值"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="跳转权限值">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: "Menu",
    data() {
        return {
            tableData: null,
        }
    },
}
</script>

<style scoped>

</style>