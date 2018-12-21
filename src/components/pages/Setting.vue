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
    <el-tab-pane label="账号管理" name="third" :lazy="true">账号管理</el-tab-pane>
    <el-tab-pane label="短信模板" name="fourth" :lazy="true">短信模板</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import Instalment from './setting/Instalment'
import TypesOfInsurance from './setting/typesOfInsurance'
export default {
  name: 'Setting',
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    Instalment,
    TypesOfInsurance
  }
}
</script>

<style lang="less" scoped>
.Setting {
  height: 100%;
  // padding: 20px 30px 35px 30px;
  box-sizing: border-box;
  // overflow: auto;
}
</style>
