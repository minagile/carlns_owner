<template>
  <!-- 系统设置 -->
  <div class="Setting">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="分期模板" name="first" :lazy="true">
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
    </el-tab-pane>
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
      activeName: 'first'
    }
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
