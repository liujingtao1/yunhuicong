<template>
  <div>
      <el-input v-model="input" placeholder="用户名" style="width: 150px"></el-input>
      <el-button type="primary" style="margin-left:10px">查询</el-button>
      <el-button style="margin-left:10px">清空</el-button>
      <div style="margin-top:10px">
          <el-button type="primary">
              添加
          </el-button>
          <el-button type="danger">批量删除</el-button>
      </div>
      <div>
        <el-table
          :data="data"
          style="width: 100%" border>
          <el-table-column
            type="selection"
            align="center"
            width="width">
          </el-table-column>
          <el-table-column
          align="center"
            type="index"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="用户名"
            width="130">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="用户昵称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="权限列表"
            width="width">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="创建时间"
            width="width">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="更新时间"
            width="width">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="250">
            <el-button type="info" icon="el-icon-user-solid" size="mini"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div>
          <!-- <el-pagination
              layout="prev, pager, next"
              :total="50"
              page-size="10"
                layout='prev, pager, next, jumper, ->, total'
              >
          </el-pagination> -->
          <!-- 
              @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
           -->
          <el-pagination
              :current-page="current"
              :page-sizes="[10, 20, 50]"
              :page-size="pageSize"
              layout=" prev, pager, next, jumper,->,sizes,total "
              :total="totalCount">
          </el-pagination>
      </div>
      </div>
</template>

<script>
export default {
    name: "Role",
    data(){
      return {
        data:[],
        input: "",
      current: 1,// 第几页
      pageSize: 10,// 每页显示数据条数
      totalCount: 0,// 总共多少条数据
      }
    },
}
</script>

<style scoped>

</style>