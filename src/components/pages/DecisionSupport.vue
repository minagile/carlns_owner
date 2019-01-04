<template>
  <!-- 决策支持 -->
  <div class="DecisionSupport">
    <!-- KPI指标 -->
    <div class="header">
      <ChartHeader :title="'KPI指标'" :num="0" @dateChage="dateChage" @timeChage="timeChage"/>
      <div class="change_pandect">
        <div class="change_curve" v-for="(o, i) in KPIlist" :key="i">
          <h6>{{ lebels[i] }}</h6>
          <p>
            <i>{{ o.count }}</i>
            <b v-if="o.percentage !== 0">同比 {{ o.percentage }}</b>
            <img src="../../assets/img/arrow_down.png" v-show="o.percentage !== 0 && o.on === 0" alt="">
            <img src="../../assets/img/arrow_up.png" v-show="o.percentage !== 0 && o.on === 1" alt="">
          </p>
          <!-- <div :id="'curve' + i" style="width: 100%;height: 80px;"></div> -->
          <div style="width: 100%;height: 80px;">
            <Curve :linex="o.x" :liney="o.y" :i="i" />
          </div>
        </div>
      </div>
    </div>
    <!-- <Curve /> -->
    <!-- 交易分析 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'交易分析'" :num="1" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="line" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'逾期与退保率'" :num="2" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="overline" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 用户分析 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'用户分析'" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="scatter1" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'性别'" :num="3" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="pie1" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 来源分析 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'来源分析'" :num="4" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="scatter" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'来源统计TOP5'" :num="5" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="pie0" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 车型 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'车型'" :num="6" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="bar" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'模式'" :num="7" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="pie2" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 年龄 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'年龄'" :num="8" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="bar_line" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'期数'" :num="9" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="pie3" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartHeader from '../common/ChartHeader'
import Curve from './charts/Curve'
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require('echarts/lib/chart/scatter')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')
export default {
  name: 'DecisionSupport',
  data () {
    return {
      KPIlist: [{}, {}, {}, {}],
      time: '5',
      startTime: '',
      endTime: '',
      lebels: ['全额投保订单数', '分期投保订单数', '访客数', '支付转化率'],
      list: ['KPIIndex', 'transactionAnalysis', 'overdueRateAndSurrenderRate', 'gender', 'streamAnalysis', 'sourceStatisticsTop5', 'carAge', 'pattern', 'ageCount', 'periods']
    }
  },
  mounted () {
    this.list.forEach(v => {
      this.getKPIData(v)
    })
  },
  methods: {
    dateChage (data) {
      // console.log(data)
      this.time = data[0]
      this.startTime = ''
      this.endTime = ''
      this.getKPIData(this.list[data[1]])
    },
    timeChage (data) {
      this.time = ''
      this.startTime = data[0][0]
      this.endTime = data[0][1]
      this.getKPIData(this.list[data[1]])
    },
    // kpi指标
    getKPIData (data) {
      this.$fetch('/admin/report/' + data, {
        date: this.time,
        startTime: this.startTime,
        endTime: this.endTime
      }).then(res => {
        if (res.code === 0) {
          // 缩略图
          if (data === 'KPIIndex') {
            this.KPIlist = [res.data.full, res.data.stages, res.data.visitor, res.data.conversion]
          }
          // 交易分析
          if (data === 'transactionAnalysis') {
            this.getLinecharts(res.data)
          }
          // 逾期和退保率
          if (data === 'overdueRateAndSurrenderRate') {
            // console.log(res)
            this.OverLinecharts(res.data)
          }
          // 用户分析
          // if (data === 'ageCount') {
          //   // console.log(res)
          // }
          // 性别
          if (data === 'gender') {
            var arr = []
            res.data.forEach(v => {
              arr.push(v.name)
            })
            this.getPiecharts(1, {
              color: ['#35A3FF', '#FFCBDB'],
              legend: arr,
              data: res.data
            })
          }
          // 来源分析
          if (data === 'streamAnalysis') {
            // console.log(res)
            this.getScatterCharts(res.data)
          }
          // top5
          if (data === 'sourceStatisticsTop5') {
            var arr2 = []
            res.data.forEach(v => {
              arr2.push(v.name)
            })
            this.getPiecharts(0, {
              color: ['#FF7700', '#FF9705', '#FFB10A', '#FFC552', '#FFE414'],
              legend: arr2,
              data: res.data
            })
          }
          // 车型
          if (data === 'carAge') {
            // console.log(res)
            this.BarCarCharts(res.data)
          }
          // 模式
          if (data === 'pattern') {
            // console.log(res)
            var arrr = []
            res.data.forEach(v => {
              arrr.push(v.name)
            })
            this.getPiecharts(2, {
              color: ['#04AAFE', '#0593FF', '#6BC4FF'],
              legend: arrr,
              data: res.data
            })
          }
          // 年龄
          if (data === 'ageCount') {
            // console.log(res)
            this.BarFullCarCharts(res.data)
          }
          // 期数
          if (data === 'periods') {
            // console.log(res)
            var arr5 = []
            res.data.forEach(v => {
              arr5.push(v.name)
            })
            this.getPiecharts(3, {
              color: ['#4AA8F6', '#3DBDA2', '#FCB738'],
              legend: arr5,
              data: res.data
            })
          }
        }
      })
    },
    // 折线缩略图
    getBarcharts (i, x, y) {
      var myChart = echarts.init(document.getElementById('curve' + i))
      myChart.setOption({
        color: ['#60b5f9'],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        xAxis: {
          show: false,
          boundaryGap: false,
          // type: 'category',
          min: 'dateMin',
          data: ['0', '1', '2', '3', '4', '5', '6']
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          data: [34, 23, 12, 3, 54, 23],
          type: 'line',
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#7fc6ff'
              }, {
                offset: 1, color: '#f7fbff'
              }],
              globalCoord: false
            }
          },
          showSymbol: false
        }]
      })
    },
    // 气泡图
    getScatterCharts (data) {
      // console.log(data)
      var myChart = echarts.init(document.getElementById('scatter'))
      // var myChart1 = echarts.init(document.getElementById('scatter1'))
      // var data = [
      //   [44056, 81.8, 23968973, 'Australia', 2015]
      // ]
      var data1 = []
      data.forEach(v => {
        data1.push([v.avgPrice, v.headCount, v.price, v.channelName])
      })
      var options = {
        tooltip: {
          trigger: 'item',
          formatter: function (params, ticket, callback) {
            // console.log(params)
            return '渠道名：' + params.data[3] + '<br />人均投保额：' + params.data[0] + '<br />人头数：' + params.data[1] + '<br />投保总额：' + params.data[2]
          }
        },
        xAxis: {
          axisLine: { show: false },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'solid'
            }
          },
          axisLine: { show: false },
          axisTick: { show: false },
          scale: true
        },
        series: [
          {
            // name: '2015',
            data: data1,
            type: 'scatter',
            symbolSize: function (data) {
              // console.log(Math.sqrt(data[2]))
              return data[2]
            },
            label: {
              emphasis: {
                show: true,
                color: '#000',
                formatter: function (param) {
                  // console.log(param)
                  return param.data[3]
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: '#c9e1f8',
                borderColor: '#a2caf2'
              }
            }
          }
        ]
      }
      myChart.setOption(options)
      // myChart1.setOption(options)
    },
    // 饼图
    getPiecharts (i, data) {
      var myChart = echarts.init(document.getElementById('pie' + i))
      var options = {
        color: data.color,
        // title: {
        //   text: '23456\n总人数',
        //   left: '34%',
        //   top: '45%'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '8%',
          data: data.legend,
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
            name: '',
            type: 'pie',
            radius: ['35%', '60%'],
            avoidLabelOverlap: false,
            center: ['40%', '50%'],
            label: {
              normal: {
                show: true,
                position: 'inside',
                formatter: '{d}%'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data.data
          }
        ]
      }
      myChart.setOption(options)
    },
    // 交易分析折线
    getLinecharts (data) {
      var lengend = []
      var symbol = ['rect', 'roundRect', 'triangle', 'triangle']
      data.series.forEach((v, k) => {
        lengend.push(v.name)
        v.stack = '总量'
        v.symbolSize = 10
        v.symbol = symbol[k]
      })
      var myChart = echarts.init(document.getElementById('line'))
      myChart.setOption({
        color: ['#3dbda3', '#fda70d', '#5a54c0', '#f24e6c'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: '9%',
          data: lengend
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '18%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.xData
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'solid'
            }
          },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: data.series
        // series: [
        //   {
        //     name: '邮件营销',
        //     type: 'line',
        //     symbol: 'rect',
        //     symbolSize: 10,
        //     stack: '总量',
        //     data: [120, 132, 101, 134, 90, 230, 210]
        //   },
        //   {
        //     name: '联盟广告',
        //     type: 'line',
        //     symbol: 'roundRect',
        //     symbolSize: 10,
        //     stack: '总量',
        //     data: [220, 182, 191, 234, 290, 330, 310]
        //   },
        //   {
        //     name: '视频广告',
        //     type: 'line',
        //     symbol: 'triangle',
        //     symbolSize: 10,
        //     stack: '总量',
        //     data: [150, 232, 201, 154, 190, 330, 410]
        //   },
        //   {
        //     name: '直接访问',
        //     type: 'line',
        //     symbol: 'triangle',
        //     symbolRotate: '180',
        //     symbolSize: 10,
        //     stack: '总量',
        //     data: [320, 332, 301, 334, 390, 330, 320]
        //   }
        // ]
      })
    },
    // 逾期与退保率折线
    OverLinecharts (data) {
      var lengend = []
      data.series.forEach((v, k) => {
        lengend.push(v.name)
        v.stack = '总量'
        v.showSymbol = false
      })
      var myChart = echarts.init(document.getElementById('overline'))
      myChart.setOption({
        color: ['#3dbda3', '#fda70d', '#5a54c0', '#f24e6c'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: '9%',
          data: lengend
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '18%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.xData
        },
        yAxis: {
          name: '概率100%',
          splitLine: {
            lineStyle: {
              type: 'solid'
            }
          },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: data.series
      })
    },
    // 车型柱状图
    BarCarCharts (data) {
      var myChart = echarts.init(document.getElementById('bar'))
      myChart.setOption({
        color: ['#FCB738'],
        grid: {
          left: '10%',
          top: '10%',
          right: '10%',
          bottom: '10%'
        },
        xAxis: {
          type: 'category',
          axisLine: { show: false },
          axisTick: { show: false },
          data: data.xData
        },
        yAxis: {
          name: '数量',
          splitLine: {
            lineStyle: {
              type: 'solid'
            }
          },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: [{
          barWidth: 50,
          data: data.series,
          type: 'bar'
        }]
      })
    },
    // 年龄柱状图
    BarFullCarCharts (data) {
      var dataShadow = []
      for (var i = 0; i < data.series.length; i++) {
        dataShadow.push(100)
      }
      var myChart = echarts.init(document.getElementById('bar_line'))
      myChart.setOption({
        color: ['#4AA8F6 '],
        grid: {
          left: '10%',
          top: '10%',
          right: '10%',
          bottom: '10%'
        },
        xAxis: {
          type: 'category',
          axisLine: { show: false },
          axisTick: { show: false },
          data: data.xData
        },
        yAxis: {
          name: '数量',
          splitLine: {
            lineStyle: {
              type: 'solid'
            }
          },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: [
          {
            type: 'bar',
            barWidth: 50,
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false
          },
          {
            // barGap: '-100%',
            barWidth: 50,
            data: data.series,
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            }
          }
        ]
      })
    }
  },
  components: {
    ChartHeader,
    Curve
  }
}
</script>

<style lang="less" scoped>
.DecisionSupport {
  min-height: 100%;
  .header {
    height: 280px;
    border-bottom: 10px solid #F4F8F9;
    .change_pandect {
      display: flex;
      height: calc(100% - 78px);
      justify-content: space-around;
      .change_curve {
        width: 25%;
        box-sizing: border-box;
        border-right: 1px solid #F5F4F2;
        height: 100%;
        padding: 23px 30px 0 43px;
        h6 {
          font-size:17px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
        }
        p {
          padding-top: 33px;
          font-size:12px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(153,153,153,1);
          i {
            font-size:24px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            padding-right: 14px;
          }
          img {
            width: 10px;
          }
        }
      }
    }
  }
  .el-col-7 {
    width: 32%;
  }
  .center {
    height: 525px;
    background: #F4F8F9;
    border-bottom: 10px solid #F4F8F9;
    .grid-content {
      background: #fff;
      height: 100%;
    }
  }
}
</style>
