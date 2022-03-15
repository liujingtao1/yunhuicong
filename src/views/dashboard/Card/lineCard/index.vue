<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import * as chart from "echarts";
export default {
  name: "lineCard",
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
          type: "line",
          data: [40,17, 41, 36, 11,13,34,29,32,43,38],
          // 拐点的样式的设置
          itemStyle: {
            opacity: 0,
          },
          // 线条的样式
          lineStyle: {
            color: "purple",
          },
          // 填充颜色设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      // 布局调试
      grid: {
        width: '100%',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100;
  height: 100%;
}
</style>