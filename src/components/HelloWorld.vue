<template>
  <div class="hello">
    <div class="homepage">
      <div class="sidebar">
        <div style="background:#525BFF;height: 70px;width: 100%;"></div>
        <div class="face_area">
          <img src="../assets/img/7.png" alt="">
          <div class="name">{{username}}</div>
        </div>
        <div class="tab_area">
          <li v-for="(o, i) in dataList" :key="i" @click="tab(o, i)" :style="{color: num === i ? '#525BFF' : '#878787'}" v-show="o.show">
            <div v-if="i !== 2">
              <img :src="num === i ? o.activeImg : o.img" alt="">
              {{ o.label }}
            </div>
            <el-badge :value="order" class="item" v-if="i === 2" :hidden="order === 0">
              <img :src="num === i ? o.activeImg : o.img" alt="">
              {{ o.label }}
            </el-badge>
          </li>
        </div>
      </div>
      <div class="right">
        <div class="top"></div>
        <div class="body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { img } from '../assets/js/img.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      num: 0,
      order: 0,
      dataList: [
        {
          label: '首页',
          link: 'Homepage',
          img: img.list1,
          activeImg: img.active1,
          show: true
        },
        {
          label: '保单列表',
          link: 'PolicyList',
          img: img.list2,
          activeImg: img.active2,
          show: false
        },
        {
          label: '分期管理',
          link: 'StageManagement',
          img: img.list3,
          activeImg: img.active3,
          show: false
        },
        {
          label: '决策支持',
          link: 'DecisionSupport',
          img: img.list4,
          activeImg: img.active4,
          show: false
        },
        {
          label: '系统设置',
          link: 'Setting',
          img: img.list5,
          activeImg: img.active5,
          show: false
        },
        {
          label: '注销',
          link: 'LoginOut',
          img: img.list6,
          activeImg: img.active6,
          show: true
        }
      ],
      username: ''
    }
  },
  mounted () {
    this.$fetch('/admin/limit/findPermission').then(res => {
      if (res.code === 0) {
        sessionStorage.setItem('permission', JSON.stringify(res.data))
        this.dataList.forEach(v => {
          res.data.forEach(m => {
            if (m.adauthName === v.label) {
              v.show = true
            }
          })
        })
      }
    })
    let path = this.$router.history.current.name
    this.dataList.forEach((v, k) => {
      if (path === v.link) {
        this.num = k
      }
      if (path === 'Detail') {
        this.num = 1
      }
      if (path === 'SDetail') {
        this.num = 2
      }
    })
    var barheight = document.documentElement.clientheight || document.body.clientHeight
    document.getElementsByClassName('sidebar')[0].style.height = barheight + 'px'
    this.username = sessionStorage.getItem('username')
    this.getData()
  },
  methods: {
    getData () {
      this.$fetch('/admin/insure/selectFlag').then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.order = res.data
        }
      })
    },
    open7 () {
      this.$confirm('是否退出当前帐号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$router.push('/')
        sessionStorage.clear()
        this.$notify({
          type: 'success',
          title: '注销登录'
        })
      })
    },
    tab (o, i) {
      this.num = i
      if (i === 5) {
        this.open7()
      } else {
        this.$router.push({name: o.link})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hello {
  min-height: 100%;
  background: #F4F8F9;
  .homepage {
    height: 100%;
    display: flex;
    .sidebar {
      width: 225px;
      position: fixed;
      // min-height: 100%;
      background: #fff url(../assets/img/barbg.png) no-repeat right bottom;
      // background-size: contain;
      .face_area {
        text-align: center;
        img {
          width: 89px;
          height: 89px;
          border: 1px solid rgba(33,211,226,1);
          border-radius: 50%;
          margin: 40px auto 0;
        }
        .name {
          line-height: 50px;
          color: #525BFF;
        }
      }
      .tab_area {
        padding-left: 43px;
        li {
          height: 54px;
          line-height: 54px;
          cursor: pointer;
          color: #878787;
          img {
            vertical-align: middle;
            margin-top: -4px;
            margin-right: 10px;
          }
          &:hover {
            color: #525BFF;
          }
        }
      }
      // float: left;
    }
    .right {
      padding-left: 225px;
      width: calc(100% - 225px);
      // float: left;
      // background: #fff;
      .top {
        width: 100%;
        z-index: 1;
        position: fixed;
        height: 70px;
        background: linear-gradient(142.68deg,rgba(89,98,255,1) 0%,rgba(130,101,255,1) 100%);
      }
      .body {
        margin: 104px 40px 40px;
        background: #fff;
        height: calc(100% - 80px - 70px);
        border-radius: 5px;
      }
    }
  }
}
</style>
