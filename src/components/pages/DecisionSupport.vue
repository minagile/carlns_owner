<template>
  <!-- 决策支持 -->
  <div class="DecisionSupport">
    <!-- KPI指标 -->
    <div class="header">
      <ChartHeader :title="'KPI指标'"/>
      <div class="change_pandect">
        <div class="change_curve" v-for="(o, i) in 4" :key="i">
          <h6>全额投保订单数</h6>
          <p><i>2341</i><b>同比 0.36%</b></p>
          <div :id="'curve' + i" style="width: 100%;height: 80px;"></div>
        </div>
      </div>
    </div>
    <!-- 来源分析 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'来源分析'"/>
          <div id="scatter" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'来源统计TOP5'"/>
          <div id="pie0" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 交易分析 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'交易分析'"/>
          <div id="line" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'逾期与退保率'"/>
          <div id="overline" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 用户分析 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'用户分析'"/>
          <div id="scatter1" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'性别'"/>
          <div id="pie1" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 车型 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'车型'"/>
          <div id="bar" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'模式'"/>
          <div id="pie2" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 年龄 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'年龄'"/>
          <div id="bar_line" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'期数'"/>
          <div id="pie3" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartHeader from '../common/ChartHeader'
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
    }
  },
  mounted () {
    this.getBarcharts(0)
    this.getBarcharts(1)
    this.getBarcharts(2)
    this.getBarcharts(3)
    // this.getPiecharts()
    this.getPiecharts(0, {
      color: ['#FF7700', '#FF9705', '#FFB10A', '#FFC552', '#FFE414'],
      legend: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      data: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 234, name: '联盟广告'},
        {value: 135, name: '视频广告'},
        {value: 1548, name: '搜索引擎'}
      ]
    })
    this.getPiecharts(1, {
      color: ['#35A3FF', '#FFCBDB'],
      legend: ['直接访问', '邮件营销'],
      data: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'}
      ]
    })
    this.getPiecharts(2, {
      color: ['#04AAFE', '#0593FF', '#6BC4FF'],
      legend: ['直接访问', '邮件营销', '邮件营'],
      data: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 310, name: '邮件营'}
      ]
    })
    this.getPiecharts(3, {
      color: ['#4AA8F6', '#3DBDA2', '#FCB738'],
      legend: ['直接访问', '邮件营销', '邮件营'],
      data: [
        {value: 335, name: '直接访问'},
        {value: 310, name: '邮件营销'},
        {value: 310, name: '邮件营'}
      ]
    })
    this.getScatterCharts()
    this.getLinecharts()
    this.OverLinecharts()
    this.BarCarCharts()
    this.BarFullCarCharts()
  },
  methods: {
    // 折线缩略图
    getBarcharts (i) {
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
          data: [800, 932, 23, 934, 12, 1330, 32],
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
    getScatterCharts () {
      var myChart = echarts.init(document.getElementById('scatter'))
      var myChart1 = echarts.init(document.getElementById('scatter1'))
      var data = [
        [44056, 81.8, 23968973, 'Australia', 2015],
        [43294, 81.7, 35939927, 'Canada', 2015],
        [13334, 76.9, 1376048943, 'China', 2015],
        [21291, 78.5, 11389562, 'Cuba', 2015],
        [38923, 80.8, 5503457, 'Finland', 2015],
        [37599, 81.9, 64395345, 'France', 2015],
        [44053, 81.1, 80688545, 'Germany', 2015],
        [42182, 82.8, 329425, 'Iceland', 2015],
        [5903, 66.8, 1311050527, 'India', 2015],
        [36162, 83.5, 126573481, 'Japan', 2015],
        [1390, 71.4, 25155317, 'North Korea', 2015],
        [34644, 80.7, 50293439, 'South Korea', 2015],
        [34186, 80.6, 4528526, 'New Zealand', 2015],
        [64304, 81.6, 5210967, 'Norway', 2015],
        [24787, 77.3, 38611794, 'Poland', 2015],
        [23038, 73.13, 143456918, 'Russia', 2015],
        [19360, 76.5, 78665830, 'Turkey', 2015],
        [38225, 81.4, 64715810, 'United Kingdom', 2015],
        [53354, 79.1, 321773631, 'United States', 2015]
      ]
      var options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{c}'
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
            name: '2015',
            data: data,
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2
            },
            label: {
              emphasis: {
                show: true,
                color: '#000',
                formatter: function (param) {
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
      myChart1.setOption(options)
    },
    // 饼图
    getPiecharts (i, data) {
      var myChart = echarts.init(document.getElementById('pie' + i))
      var options = {
        color: data.color,
        title: {
          text: '23456\n总人数',
          left: '34%',
          top: '45%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
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
            name: '用户来源TOP5',
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
    getLinecharts () {
      var myChart = echarts.init(document.getElementById('line'))
      myChart.setOption({
        color: ['#3dbda3', '#fda70d', '#5a54c0', '#f24e6c'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: '9%',
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问']
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
        series: [
          {
            name: '邮件营销',
            type: 'line',
            symbol: 'rect',
            symbolSize: 10,
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            symbol: 'roundRect',
            symbolSize: 10,
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            symbol: 'triangle',
            symbolSize: 10,
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            symbol: 'triangle',
            symbolRotate: '180',
            symbolSize: 10,
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          }
        ]
      })
    },
    // 逾期与退保率折线
    OverLinecharts () {
      var myChart = echarts.init(document.getElementById('overline'))
      myChart.setOption({
        color: ['#3dbda3', '#fda70d', '#5a54c0', '#f24e6c'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: '9%',
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问']
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
        series: [
          {
            name: '邮件营销',
            type: 'line',
            showSymbol: false,
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            showSymbol: false,
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      })
    },
    // 车型柱状图
    BarCarCharts () {
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      })
    },
    // 年龄柱状图
    BarFullCarCharts () {
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: '#eee'
              }
            },
            barWidth: 50,
            data: [200, 200, 200, 200, 200, 200, 200],
            type: 'bar'
          },
          {
            // barGap: '-100%',
            barWidth: 50,
            data: [120, 200, 150, 80, 70, 110, 130],
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
    ChartHeader
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
