<template>
  <div class="chart_header">
    <span>{{ title }}</span>
    <div class="timechoose">
      <el-select v-model="value" placeholder="请选择时间段">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
      },
      options: [{
        label: '当天',
        value: '1'
      }, {
        label: '当周',
        value: '2'
      }, {
        label: '当月',
        value: '3'
      }, {
        label: '当季',
        value: '4'
      }, {
        label: '当年',
        value: '5'
      }],
      value: ''
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
  .el-select {
    position: absolute;
    z-index: 1;
    line-height: 40px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    width: 125px;
    color:rgba(102,102,102,1);
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
