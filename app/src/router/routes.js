
// 二级路由
import Myorder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: "/home",
        component: ()=>import('@/pages/Home'),
        // 是否显示footer
        meta: { show: true }
    },
    {
        path: "/login",
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: "/register",
        component: ()=>import('@/pages/Register'),
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: ()=>import('@/pages/Search'),
        meta: { show: true },
        name: "search",
        props: (route) => ({ keyWord: route.params.keyWord, k: route.query.k })
    },
    {
        path: "/detail/:skuid",
        component: ()=>import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path:"/addcartsuccess",
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{ show: true  },
        name:"addcartsuccess"
    },
    {
        path:"/shopcart",
        component:()=>import('@/pages/ShopCart'),
        meta:{ show: true  },
    },
    {
        path:"/trade",
        component:()=>import('@/pages/Trade'),
        meta:{ show: true  },
        beforeEnter: (to, from, next) => {
            // 必须是从购物车来
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/pay",
        component:()=>import('@/pages/Pay'),
        meta:{ show: true  },
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/paysuccess",
        component:()=>import('@/pages/PaySuccess'),
        meta:{ show: true  },
    },
    {
        path:"/center",
        component:()=>import('@/pages/Center'),
        meta:{ show: true  },
        children:[
            {
                path:'myorder',
                component:Myorder,
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'',
                redirect:'myorder'
            }
        ]
    },
    
    {
        // 重定向，在项目跑起来的时候，访问/，立马跳转到
        path: '*',
        redirect: '/home'
    }
]