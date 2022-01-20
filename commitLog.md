# 1-20 

    闲话：最近太忙了 忘记提交更新了

本次提交主要包含以下内容
1.  mock相关
  
    搭建本地mock服务，拦截请求

    根据路由文件动态添加路由到devServer(devServer.before)

    监控路由文件的增删改自动重载路由

2.  axios路由简单封装
3.  eslint规则修改：
```javascript
  'max-classes-per-file': OFF, //但文件class的数量限制
  'class-methods-use-this': OFF, //类方法内部不使用this
  'no-return-assign': OFF,
  'react/function-component-definition': [
    //函数组件命名规则
    Error,
    { namedComponents: 'function-declaration' | 'function-expression' | 'arrow-function' },
  ],
```
4.  tsconfig文件修改：关闭文件强制模块化导出isolatedModules
5.  格式化忽略 .md结尾的文件
6.  webpack配置相关

    copyWebpackPlugin 拷贝静态文件异常bug修改

    开发环境去掉externals外部库

    热更新bug修改。 如果使用webpack5配置并且热更新失效了，原因是packagejson内部的browserslist和 webpack-dev-server有冲突可以参考webpack-dev-server的issue: [github](https://github.com/webpack/webpack-dev-server/issues/2758)。在dev Server添加配置 下target：'web'可以解决，或者删除browserslist或 者.browserslistrc文件
