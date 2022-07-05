// 对axios进行二次封装
import axios from 'axios';
// 进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import store from '@/store';

const request = axios.create({
    baseURL:"/api",
    timeout:5000,
})

// 请求拦截器
request.interceptors.request.use((config)=>{
    // config为配置对象
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config
});
// 响应拦截器
request.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('failure'))
})

export default request;