import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api';
import { Promise } from 'core-js';

const state = {
    cartList:[]
}

const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("failed"))
        }
    },

    // 修改购物车某个商品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("failed"))
        }
    },

    // 删除全部勾选的商品
    deleteAllCheckedCart({dispatch,getters}){
        // context：小仓库
        // 获取购物车中全部的产品
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1 ? dispatch('deleteCartListBySkuId',item.skuId):''
            // 将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise)
        });
        // 只要有全部的p1|p2...都成功，返回结果即为成功
        // 如果有一个个失败，返回结果即为失败
        return Promise.all(PromiseAll)
    },

    // 修改全部产品状态（全选）
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item =>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
        promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
    
}

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
    
}

export default{
    state,
    actions,
    mutations,
    getters
}