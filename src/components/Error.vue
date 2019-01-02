<template>
  <!-- 404 -->
  <div class="Error">
    <img src="../assets/img/notfond.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.Error {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  img {
    // vertical-align: middle;
  }
}
</style>
