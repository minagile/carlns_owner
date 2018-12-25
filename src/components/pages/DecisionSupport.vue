<template>
  <!-- 决策支持 -->
  <div class="DecisionSupport">
    <div class="header">
      <p>
        <el-button class="all">全部时间</el-button>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker> -
        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
      </p>
      <p>
        <el-button class="all">全部渠道</el-button>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button class="look">查询</el-button>
        <el-button>清空</el-button>
      </p>
    </div>
    <div class="content">
      <p>
        <el-button v-for="(o, i) in list" :class="{all: num === i}" :key="i" @click="tab(i)">{{ o }}</el-button>
      </p>
      <div class="charts">
        <div id="bar" style="width: 100%;height: 100%;"></div>
      </div>
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
  name: 'DecisionSupport',
  data () {
    return {
      value1: '',
      options: [],
      value: '',
      list: ['来源', '地区', '时间', '金额', '逾期'],
      num: 0
    }
  },
  mounted () {
    this.getBarcharts()
  },
  methods: {
    // 柱状图
    getBarcharts () {
      var myChart = echarts.init(document.getElementById('bar'))
      myChart.setOption({
        legend: {
          show: false
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '20%',
          left: '18%',
          height: '60%',
          width: '64%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [1, 2, 3, 4, 5],
            axisTick: {
              alignWithLabel: true,
              show: false,
              interval: 0
            },
            axisLabel: {
              interval: 0
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'y',
            nameGap: 30,
            axisLine: {
              lineStyle: {
                color: '#C6C8C9'
              }
            },
            axisTick: { show: false },
            axisLabel: {
              color: '#666'
            },
            splitLine: {
              lineStyle: {
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '空置房屋',
            type: 'bar',
            stack: '总量',
            barWidth: '50px',
            data: [2, 3, 4, 5, 6],
            label: {
              show: true
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  // 首先定义一个数组
                  var colorList = ['#F0788F', '#DE76CA', '#9972E7', '#6E72EA', '#F0788F', '#DE76CA', '#9972E7', '#6E72EA']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }, true)
    },
    tab (i) {
      this.num = i
    }
  }
}
</script>

<style lang="less" scoped>
.DecisionSupport {
  min-height: 100%;
  .header {
    height: 148px;
    padding-top: 13px;
    border-bottom: rgba(247,247,247,1) solid 20px;
    p {
      padding-top: 22px;
      padding-left: 51px;
      .look {
        color: #282828;
        background: #fff;
        border-color: #282828;
        margin-left: 30px;
        &:focus, &:hover {
          color: #fff;
          background: #282828;
          border-color: #282828;
        }
      }
    }
  }
  p .all {
    margin-right: 38px;
    width: 122px;
    background: #5962FF;
    border-color: #5962FF;
    color: #fff;
  }
  .content {
    p {
      padding: 24px 0 0 50px;
      .el-button {
        margin-right: 38px;
        width: 120px;
        color: #282828;
        background: #fff;
        border-color: #282828;
        &.all {
          margin-right: 38px;
          width: 120px;
          background: #5962FF;
          border-color: #5962FF;
          color: #fff;
        }
      }
    }
  }
  .charts {
    height: 530px;
  }
}
</style>
