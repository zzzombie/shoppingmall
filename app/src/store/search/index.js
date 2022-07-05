import {reqGetSearchInfo} from '@/api';
const state = {
    searchList:{}
}
const actions = {
    async getSearchInfo({commit},params={}){
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
const getters = {
    // 如果服务器没数据，至少要返回一个空数组
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}