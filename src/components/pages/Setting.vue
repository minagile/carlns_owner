<template>
  <!-- 系统设置 -->
  <div class="Setting">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="(o, i) in list" :key="i" :label="o.label" :name="o.name" :disabled="o.show" :lazy="true"></el-tab-pane>
    <instalment v-if="activeName === 'first'" />
    <typesOfInsurance v-if="activeName === 'second'" />
    <account-number v-if="activeName === 'third'" />
    <short-message v-if="activeName === 'fourth'" />
    <channel v-if="activeName === 'fifth'" />
    <log v-if="activeName === 'sixth'" />
    <!-- <el-tab-pane label="分期模板" name="first" :lazy="true">
      <instalment />
      </el-tab-pane>
      <el-tab-pane label="险种模板" name="second" :lazy="true">
        <typesOfInsurance/>
      </el-tab-pane>
      <el-tab-pane label="账号管理" name="third" :lazy="true">
        <account-number/>
      </el-tab-pane>
      <el-tab-pane label="短信模板" name="fourth" :lazy="true">
        <short-message/>
      </el-tab-pane>
      <el-tab-pane label="渠道管理" name="fifth" :lazy="true">
        <channel/>
      </el-tab-pane>
      <el-tab-pane label="日志管理" name="sixth" :lazy="true">
        <log/>
    </el-tab-pane> -->
  </el-tabs>
  </div>
</template>

<script>
import Instalment from './setting/Instalment'
import TypesOfInsurance from './setting/typesOfInsurance'
import AccountNumber from './setting/accountNumber'
import ShortMessage from './setting/shortMessage'
import Channel from './setting/channel'
import log from './setting/log'
export default {
  name: 'Setting',
  data () {
    return {
      activeName: '',
      list: [
        {
          html: '<instalment />',
          label: '分期模板',
          name: 'first',
          show: true
        },
        {
          html: '<typesOfInsurance/>',
          label: '险种模板',
          name: 'second',
          show: true
        },
        {
          html: '<account-number/>',
          label: '账号管理',
          name: 'third',
          show: true
        },
        {
          html: '<short-message/>',
          label: '短信模板',
          name: 'fourth',
          show: true
        },
        {
          html: '<channel/>',
          label: '渠道管理',
          name: 'fifth',
          show: true
        },
        {
          html: '<log/>',
          label: '日志管理',
          name: 'sixth',
          show: true
        }
      ]
    }
  },
  beforeMount () {
    var arr = []
    this.list.forEach(v => {
      JSON.parse(sessionStorage.getItem('permission')).forEach(m => {
        if (m.adauthName === v.label) {
          v.show = false
          arr.push(v.name)
        }
      })
    })
    this.activeName = arr[0]
    // console.log(this.activeName)
  },
  mounted () {
    console.log(this.activeName)
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    }
  },
  components: {
    Instalment,
    TypesOfInsurance,
    AccountNumber,
    ShortMessage,
    Channel,
    log
  }
}
</script>

<style lang="less" scoped>
.Setting {
  height: 790px;
  // padding: 20px 30px 35px 30px;
  box-sizing: border-box;
  // overflow: auto;
}
</style>
