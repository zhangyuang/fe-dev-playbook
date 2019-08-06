---
sidebarDepth: 2
---

# 断点调试

有一句话说的好，1小时开发应用，6小时在debug。是否迅速的找出代码中的bug是决定开发效率的关键因素。大部分人在调试应用时还是用传统的`console.log`的方式，这种方式只适用于比较简单的应用，一旦应用改的复杂程度上升，这种方式无疑是低效的。使用断点进行debug是我们日常开发中必须要掌握的技巧，比起`console.log`更加的高效。

## 场景

针对不同的场景不同的应用，开启断点调试的方法也不一样。下面让我们来介绍一下大部分场景下如何开启使用断点调试。

### node debug

使用node自带的debug功能来开启断点调试

```js
let foo = 1
let bar = foo + 1
debugger
console.log(bar)
```

上述代码执行到 `debugger` 时会停下来

### 调试express应用

这里我们以express应用为例，我们在本地新建项目并且启动服务

```
$ npm install express-generator -g
$ express --view=pug myapp
$ cd myapp
$ npm i
$ npm start
```

通过以上命令，我们新建了一个express应用并且启动。此时我们来进行debug的配置
`cmd + 4` 打开VS Code debug栏目
点击齿轮按钮，打开launch.json

![](https://gw.alicdn.com/tfs/TB1iKQHXxv1gK0jSZFFXXb0sXXa-1734-628.png)

点击绿色箭头，选择添加配置，选择附加到进程选项

![](https://gw.alicdn.com/tfs/TB1hUEHXrj1gK0jSZFuXXcrHpXa-1054-716.png)

`F5`启动debug，选择第一个进程

![](https://gw.alicdn.com/tfs/TB1kkIGXAT2gK0jSZFkXXcIQFXa-1438-662.jpg)

浏览器中访问`http://localhost:3000` VS Code就能够检测到触发断点，接下来就是我们熟悉的界面

![](https://gw.alicdn.com/tfs/TB1yHgIXrr1gK0jSZFDXXb9yVXa-1122-436.jpg)

### 断点调试类型

这里说一下从左到右我们的断点调试类型分为4种
- 继续调试 点击后代码会执行到下一个断点所在位置，如果没有下一个断点，则认为该次请求执行完毕
- 单步跳过 点击后会跳到当前代码下一行继续执行，不会进入到方法内部
- 单步调试 点击后进入到当前方法的内部调试，例如在res.render这一行中执行单步调试，会进入到res.render方法内部进行调试
- 单步跳出 跳出当前调试的方法，与单步调试对应

## 总结

以上几种方式以了解为主，建议熟练掌握一种vscode中如何使用断点调试的方式即可