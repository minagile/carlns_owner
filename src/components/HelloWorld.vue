<template>
  <div class="hello">
    <div class="sidebar">
      <div style="background:#525BFF;height: 70px;width: 100%;"></div>
      <div class="face_area">
        <img src="" alt="">
        <div class="name">admin</div>
      </div>
      <div class="tab_area">
        <li v-for="(o, i) in dataList" :key="i" @click="$router.push({name: o.link})">{{ o.label }}</li>
      </div>
    </div>
    <div class="right">
      <div class="top"></div>
      <div class="body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
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
  }
}
</script>

<style lang="less" scoped>
.hello {
  height: 100%;
  display: flex;
  .sidebar {
    width: 225px;
    height: 100%;
    background: #fff;
    .face_area {
      height: 270px;
    }
    // float: left;
  }
  .right {
    width: calc(100% - 225px);
    // float: left;
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
</style>
