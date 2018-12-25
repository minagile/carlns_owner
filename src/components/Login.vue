<template>
  <!-- 登录 -->
  <div class="login">
    <div class="login_box">
      <img src="../assets/img/lo.png" alt="">
      <div class="right">
        <h2>ingot个人用户后台</h2>
        <p>一款让车险更美好的智能平台</p>
        <div class="enter">
          <img src="../assets/img/per.png" >
          <input type="text" placeholder="请输入管理员姓名" v-model="user">
        </div>
        <div class="enter">
          <img src="../assets/img/psd.png" >
          <input type="password" placeholder="请输入登录密码" v-model="psd" @keypress="enter">
        </div>
        <div class="rember" @click="remember">
          <img v-if="check" src="../assets/img/unchecked.png" alt="">
          <img v-if="!check" src="../assets/img/checked.png" alt="">
          <span>记住用户名</span>
        </div>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from '../assets/js/cookie.js'
export default {
  name: 'Login',
  data () {
    return {
      check: true,
      user: '',
      psd: ''
    }
  },
  mounted () {
    if (getCookie('phone')) {
      this.user = getCookie('phone')
      this.psd = getCookie('pwd')
      this.check = false
    }
  },
  methods: {
    // 回车键登录
    enter (e) {
      if (e.keyCode === 13) {
        this.login()
      }
    },
    // 登录
    login () {
      if (this.check === false) {
        delCookie('phone')
        delCookie('pwd')
        setCookie('phone', this.user, 1000 * 60)
        setCookie('pwd', this.psd, 1000 * 60)
      } else {
        delCookie('phone')
      }
      if (this.user === '') {
        this.$notify({
          type: 'error',
          title: '警告',
          message: '请输入账号'
        })
      } else if (this.psd === '') {
        this.$notify({
          type: 'error',
          title: '警告',
          message: '请输入密码'
        })
      } else {
        this.$post('/login/loginIn', {
          phone: this.user,
          password: this.psd
        }).then(res => {
          console.log(res)
          if (res.code === 0) {
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('username', res.data.username)
            this.$router.push({name: 'Homepage'})
          } else {
            this.$notify({
              type: 'error',
              title: '警告',
              message: res.msg
            })
          }
        })
      }
    },
    // 记住密码
    remember () {
      if (this.check === false) {
        this.check = true
      } else {
        this.check = false
      }
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
    & > img {
      margin: 187px 0 0 100px;
    }
    .right {
      float: right;
      width: 370px;
      margin-right: 100px;
      padding-top: 130px;
      h2 {
        font-size: 40px;
        font-family:FZSKJW--GB1-0;
        // font-weight:normal;
        color:rgba(51,51,51,1);
        line-height:90px;
      }
      p {
        color: #A9A9A9;
        font-size: 18px;
        margin-bottom: 60px;
      }
      .enter {
        height: 70px;
        line-height: 70px;
        margin-bottom: 20px;
        border-bottom: 1px solid #EEEEEE;
        img {
          vertical-align: middle;
          margin-left: 10px;
        }
        input {
          text-indent: 20px;
          font-size: 19px;
          width: 85%;
          border: 0;
          outline: none;
        }
        input::-webkit-input-placeholder {
          color: #A9A9A9;
        }
      }
      .rember {
        font-size: 16px;
        cursor: pointer;
        img {
          margin-left: 15px;
          vertical-align: middle;
        }
        span {
          padding-left: 20px;
          color: #919191;
        }
      }
      button {
        width:320px;
        height:66px;
        background:rgba(79,147,254,1);
        border:1px solid rgba(26,114,254,1);
        border-radius:33px;
        color: #fff;
        font-size: 27px;
        margin-top: 40px;
        outline: none;
        cursor: pointer;
      }
    }
  }
}
</style>
