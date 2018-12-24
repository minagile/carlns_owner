<template>
  <!-- 首页 -->
  <div class="Homepage">
    <el-row type="flex" class="row-bg top" justify="space-around">
      <el-col :span="7">
        <div class="grid-content">
          <div class="left">
            <i><b>53</b>笔</i>
            <span>新增订单</span>
          </div>
          <img src="../../assets/img/pic.png" alt="">
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="left">
            <i><b>53</b>笔</i>
            <span>新增订单</span>
          </div>
          <img src="../../assets/img/pic.png" alt="">
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="left">
            <i><b>53</b>笔</i>
            <span>新增订单</span>
          </div>
          <img src="../../assets/img/pic.png" alt="">
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <el-button @click="changeLineCharts(1)" :class="{active: num === 1}">按月</el-button>
          <el-button @click="changeLineCharts(2)" :class="{active: num === 2}">按周</el-button>
          <el-button @click="changeLineCharts(3)" :class="{active: num === 3}">按天</el-button>
          <span style="float:right;padding:35px 30px 0 0;">金额</span>
          <div id="line" style="width: 100%;height:300px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div id="main" style="width: 100%;height:100%;"></div>
        </div>
      </el-col>
    </el-row>

    <div class="table">
      <el-button type="text" style="color:#333333;padding: 30px 0 25px 25px;">逾期订单</el-button>
      <el-button type="text" style="color:#333333;float:right;padding: 30px 25px 25px 0;">订单排序</el-button>
      <el-table
        max-height="700"
        :data="tableData"
        style="width: 96%;margin: 0 auto;">
        <el-table-column prop="date" label="订单号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="name" label="车牌"></el-table-column>
        <el-table-column prop="name" label="订单来源"></el-table-column>
        <el-table-column prop="name" label="投保金额"></el-table-column>
        <el-table-column prop="name" label="分期状态"></el-table-column>
        <el-table-column prop="name" label="还款日期"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span style="color:red;">已逾期1天</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="text" style="color:#5962FF;">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <img src="../../assets/img/delete.png" @click="open7">
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')
export default {
  name: 'Homepage',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      num: 1
    }
  },
  mounted () {
    this.getPiecharts()
    this.getLinecharts()
  },
  methods: {
    // 折线图时间选择
    changeLineCharts (i) {
      this.num = i
    },
    // 表格删除
    open7 () {
      this.$confirm('是否删除此订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$notify({
          type: 'success',
          title: '删除成功'
        })
      })
    },
    // 折线图
    getLinecharts () {
      var myChart = echarts.init(document.getElementById('line'))
      myChart.setOption({
        color: ['#5962FF', '#F7622E'],
        grid: {
          left: '3%',
          right: '3%',
          top: '10%',
          bottom: '10%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: '#BABABA'
          },
          min: 'dateMin'
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: '#BABABA'
          },
          splitLine: {
            lineStyle: {
              type: 'dotted'
            }
          }
        },
        series: [
          {
            data: [0, 10, 5, 15, 8, 16, 18],
            type: 'line',
            // smooth: true,
            symbolSize: 0,
            lineStyle: {
              width: 6,
              shadowBlur: 30,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowOffsetY: 8
            }
          },
          {
            data: [0, 11, 5, 18, 8, 20, 18],
            type: 'line',
            // smooth: true,
            symbolSize: 0,
            lineStyle: {
              width: 6,
              shadowBlur: 30,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowOffsetY: 8
            }
          }
        ]
      })
    },
    // 饼状图
    getPiecharts () {
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#5962FF', '#2D38FF', '#FFC700', '#F7622E'],
        title: {
          text: '用户来源',
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontWeight: 400,
            fontSize: 17
          },
          left: '35px',
          top: '35px'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          x: 'center',
          // y: 'bottom',
          bottom: '20',
          data: ['微信', '渠道', '公司', '视频广告'],
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 10,
          itemGap: 20,
          textStyle: {
            fontSize: 12,
            padding: [0, 0, 0, 6]
          }
        },
        series: [
          {
            name: '用户来源',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '微信'},
              {value: 310, name: '渠道'},
              {value: 234, name: '公司'},
              {value: 135, name: '视频广告'}
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.Homepage {
  min-height: 100%;
  background: #F4F8F9;
  .row-bg {
    padding: 0 0 30px 0;
    justify-content: space-between;
  }
  .el-col-7 {
    width: 32%;
  }
  .grid-content {
    border:1px solid rgba(235,235,235,1);
    border-radius: 4px;
    min-height: 125px;
    background: #ffffff;
    .left {
      float: left;
      padding: 30px 0 0 35px;
      i {
        color: #525BFF;
        display: block;
        font-size: 20px;
        b {
          font-size: 30px;
        }
      }
      span {
        font-size: 14px;
        color: #8D9498;
      }
    }
    img {
      padding: 35px 30px 0 0;
      float: right;
    }
  }
  .center .grid-content {
    height: 400px;
    .el-button {
      margin: 20px 0 35px 20px;
      color: #5962FF;
      background: #fff;
      border-color: #fff;
      &.active {
        background: #5962FF;
        border-color: #5962FF;
        color: #fff;
      }
    }
  }
  .table {
    background: #fff;
    border-radius: 5px;
    padding-bottom: 10px;
    border:1px solid rgba(235,235,235,1);
    .el-table {
      color: #777777;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      img {
        cursor: pointer;
        border: 1px solid #E1E1E1;
        border-radius: 50%;
        padding: 10px;
        width: 16px;
        &:hover {
          border-color: #777777;
        }
      }
    }
  }
  .el-table tr {
    height: 92px;
  }
}
</style>
