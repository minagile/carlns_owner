<template>
  <!-- 决策支持 -->
  <div class="Curve" ref="loadingContainer">
    <div class="cccc" ref="chartContainer"></div>
  </div>
</template>

<script>
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
  name: 'Curve',
  data () {
    return {
    }
  },
  watch: {
    linex () {
      // this._showLoading()
      this.$nextTick(() => {
        this._chart(this.linex, this.liney)
        // this._hideLoading()
      })
      // this._hideLoading()
    }
  },
  mounted () {
    // this._showLoading()
    this.$nextTick(() => {
      this._chart(this.linex, this.liney)
      // this._hideLoading()
    })
  },
  methods: {
    _showLoading () {
      this._loadingObj = this.$loading({ target: this.$refs.loadingContainer })
    },
    _hideLoading () {
      setTimeout(() => {
        this._loadingObj.close()
      }, 1000)
    },
    beforeDestroy () {
      this._loadingObj = null
    },
    // 折线缩略图
    _chart (x, y) {
      // console.log(x, y)
      var myChart = echarts.init(this.$refs.chartContainer)
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
          data: x
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          data: y,
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
    }
  },
  props: {
    i: {
      type: Number,
      default () {
        return 0
      }
    },
    linex: {
      type: Array,
      default () {
        return []
      }
    },
    liney: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Curve {
  width: 100%;
  height: 100%;
  .cccc {
    width: 100%;
    height: 100%;
  }
  // background: #00ff00;
}
</style>
