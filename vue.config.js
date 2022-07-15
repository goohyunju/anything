const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/assets/css/global.scss";
        `,
      }
    }
  },
  publicPath: "/kinder/",
  devServer: {
    pathRewrite: {"^/": "/kinder"},
  }
})
