# Node.js

本文档将会介绍我们在开发Node.js应用时会用到的一些工具

## nvm

管理Node.js版本，通过[nvm](https://github.com/nvm-sh/nvm)我们可以同时安装/切换不同的Node.js版本

### 安装nvm

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

### 添加环境变量

```bash
$ vim ~/.zshrc

在尾部添加以下配置
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### 使用命令

```bash
$ nvm ls-remote # 列出所有支持的Node.js版本
$ nvm ls # 列出本地已安装的Node.js版本
$ nvm install 11.5.0 # 安装指定的Node.js版本
$ nvm alias default 11 # 设置默认使用的版本
```

## nrm

使用[nrm](https://github.com/Pana/nrm)可以让我们来切换不同的npm源而不用单独安装cnpm之类的库

### 安装nrm

```bash
$ npm install -g nrm
```

### 使用命令

```bash
$ nrm ls # 列出当前支持切换的源
$ nrm use taobao # 使用taobao的源作为默认的npm源
```

## 实用模块

下面来介绍一些实用的Node.js模块

### dclone

[dclone](https://github.com/zhangyuang/dclone)用来下载某个特定的github仓库的文件夹，而不是下载整个项目，可以缩短你的下载时间

```bash
$ npm i -g dclone
$ dclone https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable
```

### http-server

使用[http-server](https://www.npmjs.com/package/http-server)我们可以快速的创建一个本地http server服务，并且托管我们当前目录作为静态资源文件夹而不用特地去用Node.js框架来搭建一个静态资源服务

#### 如何使用http-server

```bash
$ npm install http-server -g # 安装http-server模块
$ http-server . -p 8080 # 监听8080端口，以当前目录作为静态资源目录
```

### npx

使用npx来让我们可以方便的调用项目的依赖模块

```bash
$ npx jest # 直接调用node_modules中的jest而不需要手动编写npm script
$ npx create-react-app app # npx 将create-react-app下载到一个临时目录，使用以后再删除。使得你不需要全局安装
```

### optimist

用于解析命令行参数

```js
var argv = require('optimist').argv;
 
if (argv.rif - 5 * argv.xup > 7.138) {
    console.log('Buy more riffiwobbles');
}
else {
    console.log('Sell the xupptumblers');
}
```

### yargs 

用于开发命令行工具

![](https://raw.githubusercontent.com/yargs/yargs/master/screen.png)

### cloc

使用cloc 快速统计某文件夹下代码的数据, 更多参考资料查看[代码统计利器 Cloc](https://www.hi-linux.com/posts/4004.html)

```bash
$ npm i -g cloc
$ cloc --exclude-dir=node_modules . --exclude-ext=json,html # 统计文件类型，排除node_modules,排除json，html文件
```
![cloc](https://img.alicdn.com/tfs/TB1kYu2qND1gK0jSZFsXXbldVXa-1136-950.jpg)

### promisify

[util.promisify](http://nodejs.cn/api/util.html#util_util_promisify_original)是Node.js的官方API，使用该API我们可以将callback形式的Node.js API包装为Promise的形式,只要符合最后一个参数是callback，并且callback第一个参数是错误处理的API都可以通过promisify来包装

```js
const { promisify } = require('util')
const { exec } = require('child_process')
const execWithPromise = promisify(exec)
const installServer = async () => {
    const { stdout } = await execWithPromise(`npm i -g http-server`)
}
```

### mdv

[mdv](https://www.npmjs.com/package/mdv)是一个用来校验markdown语法的npm模块，此模块检测的语法错误类型包括七项：插入图片时是否添加Alt标签，超链接是否包含链接名称，页面内跳转时是否缺失锚点，页面内跳转的地址是否包含#，锚点是否包含#，锚点是否重复定义，json、xml语法是否解析失败。

#### 安装使用

```bash
$ npm i -g mdv
$ mdv xxx.md -d # 检测md文件语法
$ mdv xxx.md -s # 根据md生成html
```

#### 错误类型

- 重复链接 - `duplicatedAnchors[]`
- 锚点地址错误 - `anchorsWithHash[]`
- 空的链接 - `anchorsWithEmptyText[]`
- img标签缺少alt属性 tag - `imagesWithMissingAlt[]`
- `yaml`, `json`, `xml` or `abnf` 语法解析错误 - `nonParsingExamples[]`

## 使用 npm link 调试模块

熟练的使用npm link可以帮助我们本地调试任何开源项目，当我们的一个项目还没有发布到npmjs.com想在本地测试时，或者当我们想修改React/Vue的源码想在本地测试效果时，我们都需要使用npm link来进行测试。npm link 类似于Linux中的软链接，简单理解可以理解为一个快捷方式。使用方式：

```
$ cd vue // 进入本地clone下来的vue文件夹
$ npm link // 如果没有全局安装过vue 此时会创建全局node_modules下的一个软链接vue指向本地clone的vue入口文件
$ npm link vue // 在需要用调试vue模块的应用执行该命令会将当前应用的node_modules/vue指向全局node_modules/vue软链接
```

![](https://gw.alicdn.com/tfs/TB1iEl0XKH2gK0jSZFEXXcqMpXa-1450-876.jpg)
![](https://gw.alicdn.com/tfs/TB1QBh0XQY2gK0jSZFgXXc5OFXa-1450-860.jpg)
