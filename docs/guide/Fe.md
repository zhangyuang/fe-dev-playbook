# 前端开发

本章节介绍前端开发中常见的问题以及解决方案，欢迎补充

## 跨域

本章简单介绍一下什么是跨域以及如何解决跨域

### 什么是跨域

跨域基本是每一个前端工程师开发中都会遇到的问题，跨域的基本概念和原因这里简单概括下，协议域名端口三者任一不一致都会导致跨域。需要清楚的是跨域限制是浏览器给我们的安全策略的限制，在服务端是没有该限制的。

### 如何解决跨域

大部分网络上的答案都是让后端协助来修改设置`Access-Control-Allow-Origin`,这里我们不介绍这种方式，只介绍在几乎没有后端帮助的情况下如何解决跨域

#### JSONP

使用JSONP是前端解决跨域最快的方式，但是这种方式仍然需要后端小小支持下，这里我们给一个最简单的JSONP实现方式

```js
var url = `https://api.test.com?jsoncallback=jsonpCb`
var script = document.createElement('script')
script.src = url
document.getElementsByTagName('body')[0].appendChild(script)
function jsonpCb (res) {
    console.log(`接口数据${res}`)
}
```

#### Chrome插件

[Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=zh-CN)
本质是给接口的response header中添加`Access-Control-Allow-Origin: *`, 底层原理是通过Chrome提供的Api来实现

#### Node代理

大部分前端框架提供给你的proxy功能本质上都是使用了`webpack-dev-server`的proxy功能，而`webpack-dev-server`的proxy功能本质上是本地启动了一个Node服务来实现请求的转发
我们也可以自己用`egg|koa`框架来创建一个简单的本地Node服务

```js
// koa.js
const Koa = require('koa')
const router = require('koa-router')
const app = new Koa()
router.get('/api/getInfo', async (ctx) => {
    const res = await http.get('http://api.test.com/getInfo')
    ctx.body = res
})
app
  .use(router.routes())
  .use(router.allowedMethods())
app.listen(3000)

// fe.js
fetch('http://api.test.com/getInfo') 替换为 fetch(`http://localhost:3000/api/getInfo`)
```

## 纯前端下载excel

本节介绍在没有后端服务的情况下如何将数据下载为excel
使用[sheetJs](https://github.com/SheetJS/sheetjs)

```js
$ npm install xlxs // <script lang="javascript" src="dist/xlsx.full.min.js"></script>

const filename = 'file.xlsx' // 文件名称
const data = [
    {a: 1, b:2, c: 3},
    {a: 1, b:2, c: 3}
    {a: 1, b:2, c: 3}
] // 此时数据为一般接口返回的数据格式，不符合sheetJs要求，需要转换为二维数组
const dataArr = []
dataArr.push([
    'a数据',
    'b数据',
    'c数据',
]) // 第一行表头名称
data.map(item => {
    const arr = []
    for (const i in item) {
        arr.push(item[i])
    }
    dataArr.push(arr)
})
const wsName = 'Sheet1' // Excel第一个sheet的名称
const wb = XLSX.utils.book_new()
const ws = XLSX.utils.aoa_to_sheet(dataArr)
XLSX.utils.book_append_sheet(wb, ws, wsName) // 将数据添加到工作薄
XLSX.writeFile(wb, filename) // 导出Excel
```

## 代码风格

代码风格一直是程序员届争论不休的话题，这里根据本人多年开发经验以及数百个项目的开发体验，强烈建议抛弃eslint,prettier，不要让你的项目充斥着代码风格配置文件, 这里建议大家不要盲目模仿著名开源项目，这里以[React](https://github.com/facebook/react)为例,根目录下的独立文件有十几个与代码风格有关的文件就高达5个，实在是让人看了就头大
<img src="https://img.alicdn.com/tfs/TB1uw5WmKH2gK0jSZJnXXaT1FXa-590-1500.jpg"  style="height:256px;">

### Standardjs

```bash
$ npm i -g standard@13.0.0
```

这里我们着重介绍一下[Standardjs@13.0.0](https://standardjs.com/readme-zhcn.html)这个代码规范工具，为什么我们使用它而不是eslint呢，这里我引用standardjs官方的介绍

* 无须配置。 史上最便捷的统一代码风格的方式，轻松拥有。
* 自动代码格式化。 只需运行 standard --fix 从此和脏乱差的代码说再见。
* 提前发现风格及程序问题。 减少代码审查过程中反反复复的修改过程，节约时间。

如果我不同意某条规则，可以改吗？  

<span style="color:red">不行。制定这套 standard 规范的目的就是让大家都不必再花时间浪费在无谓的代码风格之争上面了。关于缩进该用制表符还是空格这个问题已经争论了很久了，永远也没有答案。争论这个都可以把需求提前写完了。遵循 standard 规范，你就不用再犹豫了，毕竟不管怎样争论总归会选择一种风格的。希望大家也能在个人语义和普适价值上做一个权衡。</span>

如果你非要自己去配置成百上千项的 ESLint 规则，那你可以直接使用 eslint-config-standard 来将个人配置包装在上层。

小贴士：<span style="color:red">选择 standard 然后保持吧。把时间留下来解决其他有意义的问题！(^____^)/</span>

### 使用版本

这里建议使用standardjs@13.0.0而不是@14.0.0, 其中14.0.0中新增的几个React的开发规则个人觉得十分不合理，影响开发体验。Ref [#1447](https://github.com/standard/standard/issues/1447)

#### 更好的使用Standardjs

在VS Code安装standardjs插件后，我们还需要进行一些配置来启用standardjs，首先要保证你在全局或者当前目录安装了standard模块，然后
 `cmd + ,` 打开配置，添加 `"standard.autoFixOnSave": true, "standard.enable": true,` 来让VS Code启用standard，此时在你不符合规范的地方会给你高亮提示，并且开启保存自动格式化功能，在你保存文件时自动格式化你的文件。