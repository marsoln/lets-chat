# 一个稀疏平常的即时通讯聊天室

## 使用说明

- 首先安装并启动mongoDB和redis-windows服务 
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
  - 添加graffiti(但是没有跑起来)
- 1.3 更改开发环境配置
  - 将gulp-ruby-sass切换为node-sass
  - 添加webpack
    - 取消了开发时针对js文件的gulp-watch,取而代之的是webpack在启动服务器时打包文件
    - webpack会生成hash文件,由服务器在渲染时替换变量
  - 添加了注册功能
  - 移除部分不再依赖的lib
  - 更为严格的eslintrc配置

## 未来更新计划

 - 添加单元测试
 - 将现有server修改为基于graphQL的数据feeder server
 - 将web框架由ng1.x更改为react
 - 添加react-native android的示例