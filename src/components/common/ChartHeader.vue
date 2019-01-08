<template>
  <div class="chart_header">
    <span>{{ title }}</span>
    <div class="timechoose">
      <el-select v-model="value"
      @change="changetime"
      placeholder="请选择时间段">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="value7"
        type="datetimerange"
        range-separator="—"
        @change="dateTimeChange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
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
      // time: '近一周',
      options: [
        {
          label: '当天',
          value: '1'
        },
        {
          label: '当周',
          value: '2'
        },
        {
          label: '当月',
          value: '3'
        },
        {
          label: '当季',
          value: '4'
        },
        {
          label: '当年',
          value: '5'
        }
      ],
      value: ''
    }
  },
  methods: {
    changetime (data) {
      this.value7 = ''
      // console.log(data)
      this.$emit('dateChage', [data, this.num])
    },
    dateTimeChange (data) {
      this.value = ''
      // console.log(data)
      this.$emit('timeChage', [data, this.num])
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
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
    width: 118px;
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
