const { defineConfig } = require('@vue/cli-service');
const { webpack } = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new (require('webpack')).DefinePlugin({
        // 定義功能旗標
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
        // 建議同時定義以下兩個，以確保 Tree-shaking 運作正常
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
      }),
    ],
  },
});
