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
          <ChartHeader :title="'用户分析'" :num="10" @dateChage="dateChage" @timeChage="timeChage"/>
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
          <ChartHeader :title="'渠道来源分析'" :num="4" @dateChage="dateChage" @timeChage="timeChage"/>
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
          <ChartHeader :title="'车龄'" :num="6" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="bar" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <ChartHeader :title="'投保方案'" :num="7" @dateChage="dateChage" @timeChage="timeChage"/>
          <div id="pie2" style="width: 100%;height:448px;"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 年龄 -->
    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content">
          <ChartHeader :title="'年龄区间分析'" :num="8" @dateChage="dateChage" @timeChage="timeChage"/>
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
    <!-- <div id="qwe" style="width:100%;height: 400px;"></div> -->
  </div>
</template>

<script>
import ChartHeader from '../common/ChartHeader'
import Curve from './charts/Curve'
var echarts = require('echarts/lib/echarts')
require('echarts/map/js/china')
require('echarts/map/js/world')
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
      list: ['KPIIndex', 'transactionAnalysis', 'overdueRateAndSurrenderRate', 'gender', 'streamAnalysis', 'sourceStatisticsTop5', 'carAge', 'pattern', 'ageCount', 'periods', 'areaCount']
    }
  },
  mounted () {
    this.list.forEach(v => {
      this.getKPIData(v)
    })
  },
  methods: {
    map (i) {
      var myChart = echarts.init(document.getElementById('scatter1'))
      var geoCoordMap = {
        '上海': [121.472644, 31.231706],
        '云南': [102.712251, 24.040609],
        '内蒙古': [111.670801, 40.818311],
        '北京': [116.405285, 39.904989],
        '台湾': [121.509062, 25.044332],
        '吉林': [125.3245, 43.886841],
        '四川': [103.065735, 30.659462],
        '天津': [119.190182, 39.125596],
        '宁夏': [106.278179, 38.46637],
        '安徽': [117.283042, 31.86119],
        '山东': [118.000923, 36.675807],
        '山西': [112.049248, 37.057014],
        '广东': [113.280637, 23.125178],
        '广西': [108.320004, 22.82402],
        '新疆': [87.617733, 43.792818],
        '江苏': [119.467413, 33.741544],
        '江西': [115.892151, 28.676493],
        '河北': [114.802461, 37.745474],
        '河南': [113.665412, 33.757975],
        '浙江': [120.153576, 29.287459],
        '海南': [110.33119, 20.031971],
        '湖北': [113.298572, 30.984355],
        '湖南': [112.12279, 28.19409],
        '澳门': [113.54909, 22.198951],
        '甘肃': [103.823557, 36.058039],
        '福建': [119.306239, 26.075302],
        '西藏': [91.132212, 29.660361],
        '贵州': [106.713478, 26.578343],
        '辽宁': [123.029096, 41.396767],
        '重庆': [106.504962, 29.933155],
        '陕西': [108.948024, 34.263161],
        '青海': [100.578916, 36.623178],
        '香港': [114.173355, 22.320048],
        '黑龙江': [126.642464, 46.756967]
      }

      var convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = []
          // console.log(data)
          if (data[i].address.indexOf('省') === -1) {
            geoCoord = geoCoordMap[data[i].address]
            if (geoCoord) {
              res.push({
                name: data[i].address,
                value: geoCoord.concat([data[i].hitAvg, data[i].amountAvg, data[i].headCount, data[i].percent, data[i].amount])
              })
            }
          } else {
            geoCoord = geoCoordMap[data[i].address.split('省')[0]]
            if (geoCoord) {
              res.push({
                name: data[i].address.split('省')[0],
                value: geoCoord.concat([data[i].hitAvg, data[i].amountAvg, data[i].headCount, data[i].percent, data[i].amount])
              })
            }
          }
        }
        return res
      }
      var convertedData = convertData(i)
      // console.log(convertedData)
      var y = []
      var data = []
      var x = []
      i.forEach((v, k) => {
        data.push({name: v.address, value: v.percent})
      })
      data.forEach((v, k) => {
        for (var j = 0; j < data.length - 1 - k; j++) {
          if (data[j].value > data[j + 1].value) {
            var temp = data[j + 1]
            data[j + 1] = data[j]
            data[j] = temp
          }
        }
      })
      data.forEach(v => {
        y.push(v.name)
        x.push(v.value)
      })
      // console.log(data)
      // console.log(x)
      // console.log(data)

      var option = {
        title: {
          text: '各个地区所占人数',
          left: '40%'
        },
        // backgroundColor: '#404a59',
        tooltip: {
          trigger: 'item',
          formatter: function (val) {
            // console.log(val)
            return '地区：' + val.data.name + '<br />人数: ' + val.data.value[4] + '<br />区域占比: ' + val.data.value[5] + '<br />区域投保总额: ' + val.data.value[6]
          }
        },
        grid: {
          right: 40,
          top: 50,
          bottom: 40,
          width: '20%'
        },
        xAxis: {
          type: 'value',
          scale: true,
          position: 'top',
          boundaryGap: false,
          splitLine: {
            show: false
          },
          // data: x,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 2,
            textStyle: {
              color: '#a2caf2'
            }
          }
        },
        yAxis: {
          type: 'category',
          //  name: 'TOP 20',
          nameGap: 16,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#a2caf2'
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#a2caf2'
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#a2caf2'
            }
          },
          data: y
        },
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          left: '10',
          right: '35%',
          label: {
            normal: {
              show: false, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#c9e1f8',
              borderColor: '#a2caf2'
            },
            emphasis: {
              areaColor: '#35A3FF30'
            }
          }
        },
        series: [
          {
            // name: 'pm2.5',
            type: 'scatter',
            // symbol: 'pin',
            coordinateSystem: 'geo',
            data: convertedData,
            symbolSize: function (val) {
              return Math.max(val[2], 5)
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                // color: function (params) {
                //   var colorList = [
                //     '#FF7700', '#35A3FF', '#FFCBDB', '#FFC552', '#FFE414', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                //   ]
                //   return colorList[params.dataIndex]
                // },
                color: 'blue',
                position: 'right',
                show: true
              }
            }
          },
          {
            // name: 'pm2.5',
            type: 'scatter',
            symbol: 'pin',
            coordinateSystem: 'geo',
            data: convertedData,
            symbolSize: 30,
            label: {
              normal: {
                formatter: function (val) {
                  return val.data.value[4]
                },
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                }
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'red',
                position: 'right',
                show: true
              }
            }
          },
          {
            id: 'bar',
            zlevel: 2,
            type: 'bar',
            symbol: 'none',
            itemStyle: {
              normal: {
                color: '#FF770030'
              }
            },
            data: data
          }
        ]
      }
      // console.log(data)
      myChart.setOption(option)
    },
    // 用户分析
    getScatterCharts1 (data) {
      // console.log(data)
      var myChart = echarts.init(document.getElementById('scatter1'))
      // var myChart1 = echarts.init(document.getElementById('scatter1'))
      // var data = [
      //   [44056, 81.8, 23968973, 'Australia', 2015]
      //     x      y      size        name
      // ]
      // address: "云南省" 地区
      // amount: 27 投保总额
      // amountAvg: 13.5 人均投保额
      // headCount: 2 人数
      // hit: 34 投保次数
      // hitAvg: 17 人均投保次数
      var data1 = []
      data.forEach(v => {
        data1.push([v.hitAvg, v.amountAvg, v.headCount, v.address])
      })
      var options = {
        tooltip: {
          trigger: 'item',
          formatter: function (params, ticket, callback) {
            // console.log(params)
            return '人均购买次数：' + params.data[0] + '<br />人均购买金额：' + params.data[1] + '<br />人数：' + params.data[2] + '<br />地区：' + params.data[3]
          }
        },
        grid: {
          left: '6%',
          top: '10%',
          right: '12%',
          bottom: '10%'
        },
        xAxis: {
          name: '人均购买次数（次）',
          axisLine: { show: false },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          name: '人均购买金额（元）',
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
              normal: {
                show: true,
                color: '#000',
                position: 'top',
                formatter: function (param) {
                  // console.log(param)
                  return param.data[3]
                }
              },
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
          if (data === 'areaCount') {
            // console.log(res)
            // this.getScatterCharts1(res.data)
            this.map(res.data)
          }
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
            }, '性别')
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
            this.getPiecharts1(0, {
              color: ['#FF7700', '#FFE414', '#FFB10A', '#FF9705', '#FFC552'],
              legend: arr2,
              data: res.data
            }, '来源')
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
            }, '模式')
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
            }, '期数')
          }
        } else {
          this.$notify({
            type: 'info',
            title: res.msg
          })
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
    // 气泡图来源分析
    getScatterCharts (data) {
      // console.log(data)
      var myChart = echarts.init(document.getElementById('scatter'))
      // var myChart1 = echarts.init(document.getElementById('scatter1'))
      // var data = [
      //   [44056, 81.8, 23968973, 'Australia', 2015]
      //     x       y
      // ]
      var data1 = []
      data.forEach(v => {
        data1.push([v.headCount, v.price, v.avgPrice, v.channelName])
      })
      var options = {
        tooltip: {
          trigger: 'item',
          formatter: function (params, ticket, callback) {
            // console.log(params)
            return '渠道名：' + params.data[3] + '<br />人均投保额：' + params.data[2] + '<br />人数：' + params.data[0] + '<br />投保总额：' + params.data[1]
          }
        },
        xAxis: {
          name: '投保人数',
          axisLine: { show: false },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          name: '保额总数（万元）',
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
    getPiecharts1 (i, data, text) {
      var myChart = echarts.init(document.getElementById('pie' + i))
      var options = {
        color: data.color,
        // title: {
        //   text: '23456\n总人数',
        //   left: '34%',
        //   top: '45%'
        // },
        tooltip: {
          show: false
          // trigger: 'item',
          // formatter: '{b}: {c}'
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
                show: false
                // position: 'inside',
                // formatter: text + ': {b}\n\n数量: {c}'
                // formatter: function (val) {
                //   return '排名：' + val.data.name.split(' ')[0] + '\n' + text + ': ' + val.data.name.split(' ')[1] + '\n数量: ' + val.data.value
                // }
              }
            },
            labelLine: {
              normal: {
                show: false,
                length: 30
              }
            },
            data: data.data
          }
        ]
      }
      myChart.setOption(options)
    },
    // 饼图
    getPiecharts (i, data, text) {
      var myChart = echarts.init(document.getElementById('pie' + i))
      var options = {
        color: data.color,
        // title: {
        //   text: '23456\n总人数',
        //   left: '34%',
        //   top: '45%'
        // },
        tooltip: {
          show: false
          // trigger: 'item',
          // formatter: '{b}: {c}'
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
                // position: 'inside',
                formatter: text + ': {b}\n\n数量: {c}'
                // formatter: function (val) {
                //   return '排名：' + val.data.name.split(' ')[0] + '\n' + text + ': ' + val.data.name.split(' ')[1] + '\n数量: ' + val.data.value
                // }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 30
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
        // v.stack = '总量'
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
          name: '日期',
          type: 'category',
          boundaryGap: false,
          data: data.xData
        },
        yAxis: {
          name: '保额总数（万元）',
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
        // v.stack = '总量'
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
          right: '8%',
          bottom: '18%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          name: '月份',
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
          name: '车龄',
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
          name: '年龄',
          type: 'category',
          axisLine: { show: false },
          axisTick: { show: false },
          data: data.xData
        },
        yAxis: {
          name: '占比',
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
