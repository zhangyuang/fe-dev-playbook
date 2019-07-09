# Node.js

本文档将会介绍我们在开发Node.js应用时会用到的一些工具

## nvm

管理Node.js版本，通过[nvm](https://github.com/nvm-sh/nvm)我们可以同时安装/切换不同的Node.js版本

### 安装nvm

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

### 添加环境变量

```
$ vim ~/.zshrc

在尾部添加以下配置
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### 使用命令

```
$ nvm ls-remote // 列出所有支持的Node.js版本
$ nvm ls // 列出本地已安装的Node.js版本
$ nvm install 11.5.0 // 安装指定的Node.js版本
$ nvm alias default 11 // 设置默认使用的版本
```

## nrm

使用[nrm](https://github.com/Pana/nrm)可以让我们来切换不同的npm源而不用单独安装cnpm之类的库

### 安装nrm

```
$ npm install -g nrm
```

### 使用命令

```
$ nrm ls // 列出当前支持切换的源
$ nrm use taobao // 使用taobao的源作为默认的npm源
```

## http-server

使用[http-server](https://www.npmjs.com/package/http-server)我们可以快速的创建一个本地http server服务，并且托管我们当前目录作为静态资源文件夹而不用特地去用Node.js框架来搭建一个静态资源服务

### 使用http-server

```
$ npm install http-server -g // 安装http-server模块
$ http-server . -p 8080 // 监听8080端口，以当前目录作为静态资源目录
```

### util.promisify

[util.promisify](http://nodejs.cn/api/util.html#util_util_promisify_original)是Node.js的官方API，使用该API我们可以将callback形式的Node.js API包装为Promise的形式,只要符合最后一个参数是callback，并且callback第一个参数是错误处理的API都可以通过promisify来包装

```js
const { promisify } = require('util')
const { exec } = require('child_process')
const execWithPromise = promisify(exec)
const installServer = async () => {
    const { stdout } = await execWithPromise(`npm i -g http-server`)
}
```

