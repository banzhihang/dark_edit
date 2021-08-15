import Vue from 'vue'
import Router from 'vue-router'
const Edit = () => import(/* webpackChunkName: "edit" */ './components/Edit')
const Login = () => import(/* webpackChunkName: "login" */ './components/Login')
const List = () => import(/* webpackChunkName: "list" */ './components/List')
const Update = () => import(/* webpackChunkName: "update" */ './components/Update')

Vue.use(Router)

export default new Router({
        routes: [
            {
                path: '/edit',
                component: Edit,
                meta:{
                    title: '发布文章'
                }
            },
            {
                path: '/login',
                component: Login,
                meta:{
                    title: '登录'
                }
            },
            {
                path: '/list',
                component: List,
                meta:{
                    title: '文章列表'
                }
            },
            {
                path: '/update/:id',
                component: Update,
                meta:{
                    title: '修改文章'
                }
            },
            {
                path: '/',
                redirect: '/home' ,
            },
        ],
    }
)