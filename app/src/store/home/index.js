//home的state
import { reqCategoryList, reqGetBannerList,reqFloorList } from '@/api';
const state = {
    categoryList: [],
    // 轮播图
    bannerList:[],
    floorList:[],
}
const actions = {
    // 获取三级菜单
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    // 获取首页轮播图
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code = 200){
            commit("GETBANNERLIST", result.data)
        }
    },
    // 获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            commit("GETFLOORLIST",result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}