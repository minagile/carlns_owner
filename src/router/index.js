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
import SDetail from '@/components/pages/StageManagement/SDetail'

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
          component: Homepage,
          meta: {requiresAuth: true}
        },
        {
          path: '/PolicyList',
          name: 'PolicyList',
          meta: {requiresAuth: true},
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
          meta: {requiresAuth: true},
          component: StageManagement,
          children: [
            {
              path: 'SDetail',
              name: 'SDetail',
              component: SDetail
            }
          ]
        },
        {
          path: '/DecisionSupport',
          name: 'DecisionSupport',
          meta: {requiresAuth: true},
          component: DecisionSupport
        },
        {
          path: '/Setting',
          name: 'Setting',
          meta: {requiresAuth: true},
          component: Setting
        },
        {
          path: '/LoginOut',
          name: 'LoginOut',
          meta: {requiresAuth: true},
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
