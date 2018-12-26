import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Error from '@/components/Error'

import Homepage from '@/components/pages/Homepage'
import PolicyList from '@/components/pages/PolicyList'
import StageManagement from '@/components/pages/StageManagement'
import DecisionSupport from '@/components/pages/DecisionSupport'
import Setting from '@/components/pages/Setting'
import LoginOut from '@/components/pages/LoginOut'
import Detail from '@/components/pages/policyList/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/he',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '/Homepage',
          name: 'Homepage',
          component: Homepage
        },
        {
          path: '/PolicyList',
          name: 'PolicyList',
          component: PolicyList,
          children: [
            {
              path: 'detail/:id',
              name: 'Detail',
              component: Detail
            }
          ]
        },
        {
          path: '/StageManagement',
          name: 'StageManagement',
          component: StageManagement
        },
        {
          path: '/DecisionSupport',
          name: 'DecisionSupport',
          component: DecisionSupport
        },
        {
          path: '/Setting',
          name: 'Setting',
          component: Setting
        },
        {
          path: '/LoginOut',
          name: 'LoginOut',
          component: LoginOut
        }
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Error',
      name: 'Error',
      component: Error
    }
  ]
})
