# nodejs实现的数据服务器

> 旨在建立一个基于nodejs的数据服务器,给其他项目提供数据接口

## 使用说明

- 安装依赖 `npm i`
- 启动服务器 `npm start`
- 访问 `http://localhost:9000`
- api地址 `http://localhost:9000/api`

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