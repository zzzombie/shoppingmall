const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验
  lintOnSave:false,
  // 代理服务器
  devServer:{
    proxy:{
      '/api':{
        // target:'http://39.98.123.211',
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''},
      }
    }
  }
})
