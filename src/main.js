// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import VueResource from 'vue-resource'
import { post, fetch, put } from './assets/js/http'
// import './assets/css/iconfont.css'

import './assets/css/style.css'
// import vueEventCalendar from 'vue-event-calendar'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import animate from 'animate.css'

Vue.use(animate)

// Vue.use(vueEventCalendar, {
//   locale: 'en',
//   color: '#4977FC'
// })

// 组件免注册
// Require in a base component context
const requireComponent = require.context(
  './components', false, /base-[\w-]+\.vue$/
)
requireComponent.keys().forEach(fileName => {
  console.log(fileName)
  // Get component config
  const componentConfig = requireComponent(fileName)
  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  // Register component globally
  Vue.component(componentName, componentConfig.default || componentConfig)
})

// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$put = put

Vue.use(VueResource)

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  const userKey = sessionStorage.getItem('token')
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    if (!userKey && to.path !== '/login') { // 查询本地存储信息是否已经登陆
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else if (userKey && to.path === '/') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
