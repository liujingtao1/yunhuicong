<template>
  <div>
    <el-card>
      <div slot="header" class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group size="medium" v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="charts" ref="charts"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    // 饼图
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title:{
        text: '视频',
        subtext: 1048,
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "肯德基1" },
            { value: 735, name: "麦当劳" },
            { value: 580, name: "海底捞" },
            { value: 484, name: "巷林烤肉" },
            { value: 300, name: "汉堡王" },
          ],
        },
      ],
    });
    // 绑定事件 
    mychart.on("mouseover",(params)=>{
      // 获取鼠标移上去的那条样式
      const {name,value} = params.data;
      // 重新设置标题
      mychart.setOption({
        title: {
          text: name,
          subtext: value,
        }
      })
    })
  },
};
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(175, 174, 174);
}
.charts {
  width: 100%;
  height: 300px;
}
</style>