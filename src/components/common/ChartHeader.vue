<template>
  <div class="chart_header">
    <span>{{ title }}</span>
    <div class="timechoose">
      <i>{{ time }}：</i>
      <el-date-picker
        v-model="value7"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="—"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
      </el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartHeader',
  data () {
    return {
      value7: '',
      time: '近一周',
      pickerOptions2: {
        shortcuts: [{
          text: '近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.chart_header {
  height: 77px;
  border-bottom: 1px solid #D7D7D7;
  padding: 0 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .timechoose {
    position: relative;
  }
  i {
    position: absolute;
    z-index: 1;
    line-height: 40px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
    text-indent: 15px;
  }
  .el-date-editor {
    height: 40px;
    border-radius: 40px;
    background: #F3F7FF;
    border: 0;
    width: 326px;
  }
}
</style>
