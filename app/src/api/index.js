import request from './request';
import mockRequests from './mockAjax';
import trade from '@/store/trade';
// 三级菜单
export const reqCategoryList = ()=>request({url:'/product/getBaseCategoryList',method:'get'});
// 首页轮播
export const reqGetBannerList = ()=>mockRequests.get('/banner')
// 
export const reqFloorList = ()=>mockRequests.get('/floor')

// 搜索页,params至少是一个空对象
export const reqGetSearchInfo = (params)=>request({url:'/list',method:'post',data:params})

// 详情页
export const reqGoodsInfo = (skuId)=>request({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车中
export const reqAddUpdateShopCart = (skuId,skuNum)=>request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表
export const reqCartList = ()=>request({url:'/cart/cartList',method:'get'})

// 删除购物车
export const reqDeleteCartById = (skuId)=>request({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 修改商品的选中状态
export const reqUpdateCheckedById = (skuId,isChecked)=>request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取注册验证码
export const reqGetCode = (phone)=>request({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册接口
export const reqUserRegister = (data)=>request({url:'/user/passport/register',data,method:'post'})

// 登录
export const reqUserLogin = (data)=>request({url:'/user/passport/login',data,method:'post'})

// 获取用户信息
export const reqUserInfo = ()=>request({url:'/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
export const reqLogout = ()=>request({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
export const reqAddressInfo = ()=>request({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取商品清单
export const reqOrderInfo = ()=>request({url:'/order/auth/trade',method:'get'})

// 提交订单
export const reqSubmitOrder = (tradeNo,data)=>request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取支付信息
export const reqPayInfo = (orderId)=>request({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付订单状态
export const reqPayStatus = (orderId)=>request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心的数据
export const reqMyOrderList = (page,limit)=>request({url:`/order/auth/${page}/${limit}`,method:'get'})