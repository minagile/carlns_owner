<template>
  <!-- 登录 -->
  <div class="login">
    <div class="login_box">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(../assets/img/bg.png);
  // background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    width:1203px;
    height:718px;
    background:rgba(255,255,255,1);
    border-radius:20px;
  }
}
</style>
