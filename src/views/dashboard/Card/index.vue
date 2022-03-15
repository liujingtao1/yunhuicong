<template>
  <div>
    <el-row :gutter="10" class="el-row">
        <el-card class="el-card">
          <!-- 第一个card -->
          <Detail title="总销售额" price="123254">
            <template slot="charts">
              <div class="box1">
                <span class="span1"
                  >周同比&nbsp;&nbsp;&nbsp;56.32%<i class="icon1"></i
                ></span>
                <span class="span2"
                  >日同比&nbsp;&nbsp;&nbsp;58.40%<i class="icon2"></i
                ></span>
              </div>
            </template>
            <template slot="footer">
                <span>日销售额$</span>
            </template>
          </Detail>
        </el-card>
        <el-card>
          <!-- 第二个card -->
          <Detail title="访问量" price="32342">
            <template slot="charts">
              <lineCard></lineCard>
            </template>
            <template slot="footer">
              <span>日访问量 4822</span>
            </template>
          </Detail>
        </el-card>
        <el-card class="el-card">
          <!-- 第三个card -->
          <Detail title="支付笔数" price="4238">
            <template slot="charts">
              <barCard></barCard>
            </template>
            <template slot="footer">
              <span>转化率 87%</span>
            </template>
          </Detail>
        </el-card>
        <el-card class="el-card">
          <!-- 第四个card -->
          <Detail title="运营活动效果" price="69%">
            <template slot="charts">
              <progressCard></progressCard>
            </template>
             <template slot="footer">
              <div class="box1">
                <span class="span1"
                  >周同比&nbsp;&nbsp;&nbsp;56.32%<i class="icon1"></i
                ></span>
                <span class="span2"
                  >日同比&nbsp;&nbsp;&nbsp;58.40%<i class="icon2"></i
                ></span>
              </div>
            </template>
          </Detail>
        </el-card>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineCard from "./lineCard";
import barCard from "./barCard";
import progressCard from "./progressCard";
export default {
  name: "Card",
  components: {
    Detail,
    lineCard,
    barCard,
    progressCard, 
  },
};
</script>

<style lang="less">
   
</style>
<style scoped>
.el-card{
  flex: 1;
  width: 22vw;
  margin:0vw .5vw;
  justify-content: center;
  height: 190px;
}
.el-row{
  display: flex;
}
.box1{
  width: 100px;
  height: 30px;
}
.span1 {
  width: 105px;
  position: relative;
  left: 0px;
  top: 15px;
  display: inline-block;
  height: 30px;
}
.span2 {
    height: 30px;
    display: inline-block;
    width: 105px;
    position: relative;
    left: 153px;
    top: -15px;
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
  top: -5px;
  left: 110px;
}
.icon2 {
  border-bottom: 10px solid transparent;
  border-top: 10px solid green;
  position: absolute;
  top: 4px;
  left: 110px;
}
</style>