# 一个稀疏平常的即时通讯聊天室

## 使用说明

- **首先安装并启动mongoDB和redis-windows服务** 
- 安装依赖 `npm i`
- 启动服务器 `npm start`
- 访问 `http://localhost`

## 版本变更信息

- 1.1 文件拆分,目录变更
  - 将app.js重命名为server.js
  - 添加server.properties配置文件
  - 添加依赖properties-reader,socket-io
  - 添加即时通讯功能
- 1.2 代码质量工具和问题修复
  - 添加eslint
  - 修复应用开启会打开两个数据库连接的问题
- 1.3 更改开发环境配置
  - 将gulp-ruby-sass切换为node-sass
  - 添加webpack
    - 取消了开发时针对js文件的gulp-watch,取而代之的是webpack在启动服务器时打包文件
    - webpack会生成hash文件,由服务器在渲染时替换变量
  - 添加了注册功能
  - 移除部分不再依赖的lib
  - 更为严格的eslintrc配置
- 1.4 服务器端调整
  - 添加Graphql的支持
  - 重新实现了身份验证机制
  - 改变js文件打包顺序,修复页面带有滚动条的bug

## 关于这个repo

- 一般情况下能跑起来(只保证在windows环境下)
- 业余时间近乎于纯手工撸出来的 
  - 免不了有bug 
  - 进度相当缓慢
  - 缺失文档
- 我会尽量做好前端工程化的部分
- 当前版本的技术栈包括但不限于
  - ng1.x bootstrap AdminLTE jade
  - jquery lodash
  - mongodb mongoose
  - redis(session)
  - nodejs express graphql-express socket.io
  - gulp webpack babel node-sass eslint
  