import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import store from '@/store';
Vue.use(VueRouter);



//备份VueRouter.prototype原有的push|replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
     //函数对象的apply与call的区别?
     //相同点:都可以改变函数的上下文一次，而且函数会立即执行一次
     //不同：函数执行的时候，传递参数不同，apply需要的是数组，call传递参数的时候用逗号隔开
     //原始的push方法可以进行路由跳转，但是需要保证上下文this是VueRouter类的实例
     //第一种情况：外部在使用push的时候传递成功与失败的回调
     if (resolve && reject) {
          originPush.call(this, location, resolve, reject);
     } else {
          //第二种情况：外部在使用push方法的时候没有传递成功与失败的回调函数
          originPush.call(this, location, () => { }, () => { });
     }
}
//重写VueRouter.prototype.replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
     (resolve && reject) ? originReplace.call(this, location, resolve, reject) : originReplace.call(this, location, () => { }, () => { });
}

let router =  new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to,from,savedPosition){
        // 滚动条在最上方
        return {y:0}
    }
})
// 全局前置守卫
router.beforeEach(async (to,from,next)=>{
     let token = store.state.user.token;
     let name = store.state.user.userInfo.name;
     // 已登录
     if(token){
          // 已登录去登录页，不行
        if(to.path=='/login'){
          //跳到根页面
             next('/')
        }else{
          //已登录去的不是登录页
          // 如果有用户名
          if(name){
               next()
          }else{
               // 没有用户信息，派发action获取用户信息
               try {
               await store.dispatch('getUserInfo')
               next()
               } catch (error) {
                    // token失效了获取不到用户信息，重新登陆，清除token
                    await store.dispatch('userLogout')
                    next('/login')
               }
          }
        }
     
     }else{
          //未登录,不能去交易相关、支付相关、个人中心
          let toPath = to.path
          if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
               // 把未登录时要去的地址存储于路由中
               next('/login?redirect='+toPath)
          }else{
               next()
          }
     }
     
})

export default router;