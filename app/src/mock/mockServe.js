// 引入mockjs模块
import Mock from 'mockjs';
// webpack默认暴露：图片、json
import banner from './banner.json';
import floor from './floor.json';

// 地址、数据
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})

