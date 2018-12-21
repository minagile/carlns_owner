<template>
  <div class="hello">
    <div class="homepage">
      <div class="sidebar">
        <div style="background:#525BFF;height: 70px;width: 100%;"></div>
        <div class="face_area">
          <img src="../assets/img/7.png" alt="">
          <div class="name">admin</div>
        </div>
        <div class="tab_area">
          <li v-for="(o, i) in dataList" :key="i" @click="tab(o, i)" :style="{color: num === i ? '#525BFF' : '#878787'}">
            <!-- <img src="../assets/img/add.png" alt=""> -->
            {{ o.label }}
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      num: 0,
      dataList: [
        {
          label: '首页',
          link: 'Homepage',
          img: '',
          activeImg: ''
        },
        {
          label: '保单列表',
          link: 'PolicyList',
          img: '',
          activeImg: ''
        },
        {
          label: '分期管理',
          link: 'StageManagement',
          img: '',
          activeImg: ''
        },
        {
          label: '决策支持',
          link: 'DecisionSupport',
          img: '',
          activeImg: ''
        },
        {
          label: '系统设置',
          link: 'Setting',
          img: '',
          activeImg: ''
        },
        {
          label: '注销',
          link: 'LoginOut',
          img: '',
          activeImg: ''
        }
      ]
    }
  },
  mounted () {
    var barheight = document.documentElement.clientheight || document.body.clientHeight
    document.getElementsByClassName('sidebar')[0].style.height = barheight + 'px'
  },
  methods: {
    tab (o, i) {
      this.num = i
      this.$router.push({name: o.link})
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
          }
          &:hover {
            color: #525BFF;
          }
        }
      }
      // float: left;
    }
    .right {
      width: calc(100% - 225px);
      // float: left;
      // background: #fff;
      .top {
        // width: 100px;
        height: 70px;
        background: linear-gradient(142.68deg,rgba(89,98,255,1) 0%,rgba(130,101,255,1) 100%);
      }
      .body {
        margin: 40px;
        background: #fff;
        height: calc(100% - 80px - 70px);
        border-radius: 5px;
      }
    }
  }
}
</style>
