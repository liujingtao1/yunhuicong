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
        // 最小值与最大值的设置
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [69],
          // 柱状图宽度设置
          barWidth: 10,
          color: 'red',
          // 背景颜色
          showBackground: true,
          // 设置背景颜色
          backgroundStyle: {
            color: "#eee",
          },
          // 文本
          label: {show:true,formatter:"|",position:"right"},
        },
      ],
      // 布局调试
      gird: {
        left: 0,
        top: -10,
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