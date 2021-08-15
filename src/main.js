import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://42.194.225.214:10000'
axios.defaults.headers.post['Content-Type'] = '"application/json"'
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 改变路由标题以及未登录拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

// 请求拦截
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  NProgress.start()
  return config
})

axios.interceptors.response.use(config =>{
  NProgress.done()
  return config
})

new Vue({
  router:router,
  render: h => h(App)
}).$mount('#app')
