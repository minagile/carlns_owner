<template>
  <!-- 首页 -->
  <div class="Homepage">
    <el-row type="flex" class="row-bg top" justify="space-around">
      <el-col :span="7">
        <div class="grid-content" @click="addOrder">
          <div class="left">
            <i><b>{{ order }}</b> 笔</i>
            <span>新增订单</span>
          </div>
          <img src="../../assets/img/pic.png" alt="">
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="left">
            <i><b>{{ order1 }}</b> 元</i>
            <span>分期总费用</span>
          </div>
          <img src="../../assets/img/pic.png" alt="">
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <div class="left">
            <i><b>{{ order2 }}</b> 元</i>
            <span>总利润</span>
          </div>
          <img src="../../assets/img/pic.png" alt="">
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg center" justify="space-around">
      <el-col :span="16">
        <div class="grid-content" style="position:relative;">
          <el-button @click="changeLineCharts(1)" :class="{active: num === 1}">按月</el-button>
          <el-button @click="changeLineCharts(2)" :class="{active: num === 2}">按周</el-button>
          <el-button @click="changeLineCharts(3)" :class="{active: num === 3}">按天</el-button>
          <div id="line" style="width: 100%;height:100%;position:absolute;left:0;top:0;"></div>
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
      <el-button type="text" style="color:#333333;float:right;padding: 30px 25px 25px 0;" @click="getData('withinTheTimeLimitOrders', 1)">订单排序</el-button>
      <el-table
        max-height="700"
        :data="tableData"
        style="width: 96%;margin: 0 auto;">
        <el-table-column prop="orderNo" label="订单号" min-width="100"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="carNo" label="车牌"></el-table-column>
        <el-table-column prop="orderResource" label="订单来源"></el-table-column>
        <el-table-column prop="total" label="投保金额"></el-table-column>
        <el-table-column prop="installmentState" label="分期状态"></el-table-column>
        <el-table-column prop="repaymentDate" label="还款日期"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span style="color:red;">{{scope.row.state}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="text" style="color:#5962FF;">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <img src="../../assets/img/delete.png" @click="open7(scope.row.orderId)">
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
      tableData: [],
      num: 1,
      order: 0,
      order1: 0,
      order2: 0,
      orderby: null
    }
  },
  mounted () {
    this.getData('newOrderCount')
    this.getData('totalCostOfInstallments')
    this.getData('grossProfit')
    var X = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    this.getChartData('monthLine', X)
    this.getChartData('sourceOfUserTop5')
    // this.getData('deleteByOrder')
    this.getData('withinTheTimeLimitOrders', null)
  },
  methods: {
    addOrder () {
      this.$put('/index/isRead').then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.$router.push('/PolicyList')
        }
      })
    },
    getData (data, order) {
      var params = {}
      if (order === 1) {
        if (this.orderby === null) {
          this.orderby = 1
        } else {
          this.orderby = null
        }
      }
      if (data === 'withinTheTimeLimitOrders') params = { orderby: this.orderby }
      this.$fetch('/admin/index/' + data, params).then(res => {
        if (res.code === 0) {
          // console.log(res)
          if (data === 'withinTheTimeLimitOrders') this.tableData = res.data
          if (data === 'newOrderCount') this.order = res.data
          if (data === 'totalCostOfInstallments') this.order1 = res.data
          if (data === 'grossProfit') this.order2 = res.data
        }
      })
    },
    getChartData (data, X) {
      this.$fetch('/admin/index/' + data).then(res => {
        if (res.code === 0) {
          if (data === 'sourceOfUserTop5') {
            this.getPiecharts(res.data)
          } else {
            this.getLinecharts(res.data, X)
          }
        }
      })
    },
    // 折线图时间选择
    changeLineCharts (i) {
      this.num = i
      var X = []
      if (i === 1) {
        X = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        this.getChartData('monthLine', X)
      }
      if (i === 2) {
        X = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        this.getChartData('weekLine', X)
      }
      if (i === 3) {
        X = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        this.getChartData('dayLine', X)
      }
    },
    // 表格删除
    open7 (id) {
      this.$confirm('是否删除此订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$fetch('/admin/index/deleteByOrder', { orderId: id }).then(res => {
          if (res.code === 0) {
            this.$notify({
              type: 'success',
              title: '删除成功'
            })
            this.getData('withinTheTimeLimitOrders', null)
          } else {
            this.$notify({
              type: 'error',
              title: res.msg
            })
          }
        })
      })
    },
    // 折线图
    getLinecharts (data, xaxis) {
      var myChart = echarts.init(document.getElementById('line'))
      myChart.setOption({
        color: ['#5962FF', '#F7622E'],
        legend: {
          // orient: 'vertical',
          // x: 'right',
          // y: 'bottom',
          top: '30',
          right: '20',
          // data: [data[0].name, data[1].name],
          data: ['总分期金额', '还款金额'],
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 10,
          itemGap: 20,
          textStyle: {
            fontSize: 12,
            padding: [0, 0, 0, 6]
          }
        },
        grid: {
          left: '5%',
          right: '3%',
          top: '30%',
          bottom: '10%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xaxis,
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
            data: data[0].data,
            type: 'line',
            // smooth: true,
            // name: data[0].name,
            name: '总分期金额',
            symbolSize: 0,
            lineStyle: {
              width: 6,
              shadowBlur: 30,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowOffsetY: 8
            }
          },
          {
            data: data[1].data,
            type: 'line',
            // smooth: true,
            // name: data[1].name,
            name: '还款金额',
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
    getPiecharts (data) {
      let X = []
      data.forEach(v => {
        X.push(v.name)
      })
      var myChart = echarts.init(document.getElementById('main'))
      myChart.setOption({
        color: ['#979DFF', '#A951FB', '#2D38FF', '#FFC700', '#F7622E'],
        title: {
          text: '用户来源TOP5',
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontWeight: 400,
            fontSize: 17
          },
          left: '10px',
          top: '20px'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          x: 'center',
          // y: 'bottom',
          bottom: '10',
          data: X,
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 10,
          itemGap: 20,
          formatter: function (name) {
            return name.split(' ')[0] + '\n' + name.split(' ')[1]
          },
          textStyle: {
            fontSize: 12,
            padding: [0, 0, 0, 6]
          }
        },
        series: [
          {
            name: '用户来源TOP5',
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
                formatter: '{b}\n{c}',
                textStyle: {
                  fontSize: '15',
                  lineHeight: 50
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data
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
    cursor: pointer;
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
      position: relative;
      z-index: 3;
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
