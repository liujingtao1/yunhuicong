<template>
  <div>
    <el-card style="width: 100%">
      <div slot="header" class="header">
        <span>线上热门搜索</span>
        <!-- 下拉菜单 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12">
            <lineCharts />
          </el-col>
          <el-col :span="12">
            <lineCharts />
          </el-col>
        </el-row>
        <!-- table表格 -->
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="排名" width="80" type="index">
          </el-table-column>
          <el-table-column label="搜索关键字" width="180"> </el-table-column>
          <el-table-column sortable label="用户数"> </el-table-column>
          <el-table-column sortable label="周涨幅"> </el-table-column>
        </el-table>
        <!-- 分页器 -->
          <el-pagination layout="prev, pager, next" :total="1000" class="pagination">
          </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  name: "Search",
  data() {
    return {
      tableData: [{}],
    };
  },
  components: {
    lineCharts,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 5px 0px;
}
.pagination{
  margin: 10px 0px;
  float: right;
}
</style>