# Vue project seed

> vue 脚手架 种子项目

### 只适用于移动端开发

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and analyze the package
npm run analyz

# run unit tests
npm run unit

# run all tests
npm test
```

## 主要的针对性优化点

- 增加 BundleAnalyzerPlugin ， 可视化打包结果
- 移除 旧版本下的 CommonsChunkPlugin，改换 optimization
- 集成 vConsolePlugin， 方便移动端调试
- 集成 server 端的接口配置，区分不同环境
- 集成 node 接口转发

## 主要 modules 的版本

- "vue": "^2.5.2",
- "vue-router": "^3.0.1"
- "webpack": "^4.6.0"

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
