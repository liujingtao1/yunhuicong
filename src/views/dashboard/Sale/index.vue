<template>
  <el-card class="box-card" style="margin: 10px 0px">
    <div slot="header" class="clearfix">
      <!--   @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!--  v-model="value1" -->
        <el-date-picker
        v-model="date"
          class="date"
          size="mini"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </div>
    <div>
      <el-row class="el-row" :gutter="10">
        <div class="gutter">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </div>
        <div class="content">
          <div class="content-right">
            <h3>门店{{title}}排名</h3>
            <ul class="content-right-ul">
              
              <li>
                <span class="lis-span-left rank">1</span>
                <span class="lis-span-content">肯德基1</span>
                <span class="lis-span-right">230,233</span>
              </li>
              <li>
                <span class="lis-span-left rank">2</span>
                <span class="lis-span-content">麦当劳</span>
                <span class="lis-span-right">225,423</span>
              </li>
              <li>
                <span class="lis-span-left rank">3</span>
                <span class="lis-span-content">海底捞</span>
                <span class="lis-span-right">194,422</span>
              </li>
              <li>
                <span class="lis-span-left">4</span>
                <span class="lis-span-content">巷林烤肉</span>
                <span class="lis-span-right">170,623</span>
              </li>
              <li>
                <span class="lis-span-left">5</span>
                <span class="lis-span-content">汉堡王</span>
                <span class="lis-span-right">169,399</span>
              </li>
              <li>
                <span class="lis-span-left">6</span>
                <span class="lis-span-content">陕西面条</span></span>
                <span class="lis-span-right">150,194</span>
              </li>
              <li>
                <span class="lis-span-left">7</span>
                <span class="lis-span-content">手抓饼</span>
                <span class="lis-span-right">130,432</span>
              </li>
              <li>
                <span class="lis-span-left">8</span>
                <span class="lis-span-content">煎饼果子</span>
                <span class="lis-span-right">109,255</span>
              </li>
            </ul>
          </div>
        </div>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import dayjs from 'dayjs';
import * as echarts from "echarts";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      myCharts: null,
      // 收集日历的数据
      date: []
    };
  },
  computed: {
    // 标题
    title(){
      return this.activeName == 'sale' ? '销售额' : '访问量';
    }
  },
  // 监听属性
  watch: {
    title(){
      // 重新修改图表的配置数据
      // 图表的配置数据可以再次修改，如果有新的数值，新的数值，没有新的数值，还是用以前的
      this.myCharts.setOption({
        title: {
          text: this.title + '趋势',
        }
      })
    }
  },
  mounted() {
    // 初始化echarts实例
    this.myCharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.myCharts.setOption({
      title: {
        text: `${this.title}趋势`
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "1%",
        right: "2%",
        bottom: "2%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [140, 172, 200, 334, 390, 330, 220, 239, 329, 392, 292, 422],
          color: "green",
        },
      ],
    });
  },
  methods: {
    // 今日
    setDay(){
      const day = dayjs().format('YYYY-MM-DD');
      this.date =[day,day]
    },
    // 本周
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD');
      const end = dayjs().day(7).format('YYYY-MM-DD');
      this.date = [start,end]
    },
    // 本月
    setMonth(){
      const start = dayjs().startOf('month').format('YYYY-MM-DD');
      const end = dayjs().endOf('month').format('YYYY-MM-DD');
      this.date = [start,end]
    },
    // 本年
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD');
      const end = dayjs().endOf('year').format('YYYY-MM-DD');
      this.date = [start,end]
    }
  }
};
</script>

<style scoped>
.gutter{
  width: 1200px;
}
.content{
  width: 500px;
}
.el-row{
  display: flex;
}
.content-right{
  width: 400px;
}
.right span{
  cursor: pointer;
}
.lis-span-content{
  text-align: center;
  margin-left: 1.2vw;
}
li span{
  display: inline-block;
  line-height: 25px;
}
.lis-span-right{
  margin-right: 2.6vw;
  float: right;
}
.rank{
  background: black;  
  color: white;
  border-radius: 50%;
}
.lis-span-left{
  float: left;
  width: 25px;
  line-height: 25px;
  height: 25px;
  text-align: center;
}
.content-right-ul{
  font-size: 1vw;
  padding: 0;
  list-style-type: none;
  width: 100%;
  height: 250px;
}
.content-right-ul li{
  height: 25px;
  margin: 10px 0px;
}
.clearfix {
  width: 1400px;
  position: relative;
}
.tab {
  width: 100vw;
}
.right {
  position: absolute;
  right: 0;
  top: 5px;
  font-size: 14px;
}
.date {
  width: 250px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 10px;
}
.charts {
  width: 800px;
  height: 300px;
}
h3{
  font-size: 1.5vw;
}
</style>