<template>
  <!-- 首页 -->
  <div class="Homepage">
    <div class="top">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
    <div class="center"></div>
    <div class="table"></div>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.Homepage {
  height: 100%;
  background: rgb(36, 143, 169);
  .row-bg {
    padding: 0 0 40px 0;
    justify-content: space-between;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 125px;
    background: #ffffff;
  }
}
</style>
