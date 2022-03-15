<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import * as chart from "echarts";
export default {
  name: "barCard",
  mounted() {
    // 初始化echarts
    let lineChart = chart.init(this.$refs.charts);
    // 配置数据
    lineChart.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      // 系列
      series: [
        {
        // 图标形式-柱状图
          type: "bar",
          data: [10, 7, 11,13,8,9,17,12],
          // 线条的样式
          lineStyle: {
            color: "purple",
          },
        },
      ],
      // 布局调试
      grid: {
        // width: "%",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
      tooltip: {}
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>