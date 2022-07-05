import {reqGoodsInfo,reqAddUpdateShopCart} from '@/api';
// 封装游客身份模块uuid  生成一个随机字符串（不变的）
import {getUUID} from '@/utils/uuid_token';

const state={
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const actions={
    // 获取产品信息
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    // 将产品加入到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车后(发请求)，前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据。只是返回code=200，代表这次操作成功
        // 因为服务器没有返回其他数据，所以这次不需要三连环存储数据
        let result = await reqAddUpdateShopCart(skuId,skuNum)  
        // 服务器加入购物车成功
        if(result.code == 200){
            return "ok"
        }else{
            // 加入失败
            return Promise.reject(new Error('failed'))
        }      
    }
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const getters={
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}