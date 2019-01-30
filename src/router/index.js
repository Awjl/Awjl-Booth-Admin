import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: '/',
      component: () => import('@/views/home/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/websiteAdmin',
    component: Layout,
    redirect: '/websiteAdmin/home',
    name: '广告位管理',
    meta: {
      icon: 'guide'
    },
    children: [
      // {
      //   path: 'banner',
      //   name: '活动管理',
      //   component: () => import('@/views/websiteAdmin/banner'),
      //   meta: { title: '活动管理', noCache: true }
      // },
      {
        path: 'home',
        name: '广告位管理',
        component: () => import('@/views/websiteAdmin/home'),
        meta: { title: '广告位管理', noCache: true, icon: 'guide' }
      }]
  },
  {
    path: '/enterpriseAdmin',
    component: Layout,
    redirect: 'Member',
    meta: {
      title: '企业管理',
      icon: 'user'
    },
    children: [{
      path: '/enterpriseAdmin',
      component: () => import('@/views/enterpriseAdmin/enterpriseList'),
      name: 'footshopping',
      meta: { title: '企业管理', icon: 'user', noCache: true }
    },
    {
      path: '/enterpriseDetails/:id',
      component: () => import('@/views/enterpriseAdmin/enterpriseDetails'),
      name: '/enterpriseDetails',
      meta: { title: '企业详情', noCache: true },
      hidden: true
    }
    ]
  },
  {
    path: '/Exhibition',
    component: Layout,
    redirect: 'Exhibition',
    children: [{
      path: '/Exhibition/ExhibitionList',
      component: () => import('@/views/Exhibition/ExhibitionList'),
      name: 'ExhibitionList',
      meta: { title: '会展列表管理', noCache: true, icon: 'nested' }
    },
    {
      path: '/Exhibition/ExhibitionDetails/:id',
      component: () => import('@/views/Exhibition/ExhibitionDetails'),
      name: 'ExhibitionDetails',
      meta: { title: '会展详情管理' },
      hidden: true
    }]
  },
  {
    path: '/service',
    component: Layout,
    name: '服务管理',
    meta: {
      title: '服务管理',
      icon: 'email'
    },
    children: [
      // {
      //   path: '/authentication',
      //   component: () => import('@/views/service/authentication'),
      //   name: 'service',
      //   meta: { title: '企业认证列表' }
      // },
      {
        path: '/problem',
        component: () => import('@/views/service/demand'),
        name: 'problem',
        meta: { title: '设计需求列表' }
      },
      {
        path: '/signup',
        component: () => import('@/views/service/signup'),
        name: 'signup',
        meta: { title: '会展报名列表' }
      }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'admin',
    name: '管理员管理',
    meta: {
      title: '管理员管理',
      icon: 'component'
    },
    children: [{
      path: 'admin',
      component: () => import('@/views/admin/admin'),
      name: 'admin',
      meta: { title: '人员管理' }
    },
    {
      path: 'role',
      component: () => import('@/views/admin/role'),
      name: 'role',
      meta: { title: '权限管理' }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'system',
    children: [{
      path: 'system',
      component: () => import('@/views/system/index'),
      name: 'system',
      meta: { title: '系统管理', icon: 'lock', noCache: true }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
