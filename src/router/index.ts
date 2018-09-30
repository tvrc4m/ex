import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const basic=()=>import('@/views/layout/basic')
const home=()=>import('@/views/home/index')
const history=()=>import('@/views/history/index')
const order=()=>import('@/views/order/index')


const routes = [
    {
        path: '/',
        component: basic,
        children: [
            {
                path:"",
                component:home,
                name:"home",
                meta:{
                    group:"home"
                }
            },
            {
                path:"/history",
                component:history,
                name:"history",
                meta:{
                    group:"history"
                }
            },
            {
                path:"/order",
                component:order,
                name:"order",
                meta:{
                    group:"order"
                }
            },
        ]
    }
]

const router = new Router({
  routes
})

export default router
