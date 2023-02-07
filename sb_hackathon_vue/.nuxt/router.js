import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _43979986 = () => interopDefault(import('../pages/App.vue' /* webpackChunkName: "pages/App" */))
const _916e436a = () => interopDefault(import('../pages/App_backup.vue' /* webpackChunkName: "pages/App_backup" */))
const _26d6e2b5 = () => interopDefault(import('../pages/sample.vue' /* webpackChunkName: "pages/sample" */))
const _0bdb6ed2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/App",
    component: _43979986,
    name: "App"
  }, {
    path: "/App_backup",
    component: _916e436a,
    name: "App_backup"
  }, {
    path: "/sample",
    component: _26d6e2b5,
    name: "sample"
  }, {
    path: "/",
    component: _0bdb6ed2,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
