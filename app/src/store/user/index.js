import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo, reqLogout } from '@/api';
import {setToken,getToken, removeToken} from '@/utils/token';

// 登陆与注册的模块
const state = {
    // 验证码
    code:'',
    token:getToken(),
    userInfo:''
}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit("GETCODE",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    // 用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if(result.code==200){
            commit('USERLOGIN',result.data.token);
            // 持久化存储token
            // localStorage.setItem("TOKEN",result.data.token)
            console.log(result);
            setToken(result.data.token)
            return "ok"
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    // 获取用户信息
    async getUserInfo({commit}){
       let result = await reqUserInfo()
        if(result.code==200){
            commit("GETUSERINFO",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error('failed'))
        }
    },

    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit("CLEAR")
            return "ok"
        }else{
            return Promise.reject(new Error('filed'))
        }
    }
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        // 清除仓库中关于用户信息的数据
        state.token = ''
        state.userInfo = {}
        // 清除本地存储数据
        removeToken()
    }
}
const getters = {}
export default{
    state,
    actions,
    mutations,
    getters
}