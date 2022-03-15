<template>
  <div>
    <div class="header">
      <span class="search-header">
        搜索用户次数
      </span>
      <svg t="1647054852605" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2183" width="26" height="26"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" p-id="2184" fill="#2c2c2c"></path></svg>
    </div>
    <div class="context">
      <span class="context-span">2332</span>
        <span class="context-div">18.1</span>
        <i class="icon1"></i>
        <i class="icon2"></i>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts"
export default {
    name: 'lineCharts',
    mounted() {
    // 初始化echarts
    let lineChart = echarts.init(this.$refs.charts);
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
            color: "blue",
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
                  color: "blue", // 0% 处的颜色
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
}
</script>

<style scoped>
.context{
  margin: 10px 0px;
  position: relative;
}
.context-div{
  padding-left: 10px;
}
.header{
  display: flex;
  align-items: center;
  color: rgb(134, 129, 129);
}
.search-header{
  margin-right: 10px;
}
i {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.icon1 {
  border-bottom: 10px solid red;
  border-top: 10px solid transparent;
  position: absolute;
  top: -7px;
  left: 90px;
}
.icon2 {
  border-bottom: 10px solid transparent;
  border-top: 10px solid green;
  position: absolute;
  top: 4px;
  left: 110px;
}
.charts{
  width: 100%;
  height: 50px;
}
</style>