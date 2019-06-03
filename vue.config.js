module.exports = {
  devServer: {
    publicPath: '/', // 基本路径
    port: 5009,
    open: false // 配置自动启动浏览器
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.23.3:8090',
    //     changeOrigin: true
    //   }
    // }
  }
}
