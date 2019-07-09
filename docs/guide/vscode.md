# VS Code

vscode毫无疑问是目前最强大的编辑器，没有之一，凭借自身丰富的插件体系以及优秀的断点调试能力迅速成为最火热的编辑器。

## 安装vscode

这个不多介绍，直接去[官网](https://code.visualstudio.com/)下载安装包安装

## 快捷键

熟练使用vscode快捷键是必备技能

### 左边栏快捷键

`cmd + k + s` -> `keybinds.json`

添加以下配置

```
{ "key": "cmd+1",           "command": "workbench.view.explorer" },
{ "key": "cmd+2",           "command": "workbench.view.search" },
{ "key": "cmd+3",           "command": "workbench.view.scm" },
{ "key": "cmd+4",           "command": "workbench.view.debug" }
```

添加完毕后我们可以通过cmd + 数字键的组合方式来快速切换左边栏

### 快捷打开vscode

`cmd + shift + p` -> `code`

![](https://gw.alicdn.com/tfs/TB11o6_XET1gK0jSZFhXXaAtVXa-988-686.jpg)

在输入框中输入code，来为shell安装code命令，之后通过`code [PATH]` 可以快速用vscode打开一个目录, 例如打开当前目录`code .`

### 其他快捷键

以下介绍实际使用vscode中经常需要用到的快捷键

`cmd + p` 根据关键字快速打开一个文件  
`cmd + ,` 打开vscode配置项  
`cmd + d` 快速选取多个相同的内容块  
`option + shift + 鼠标左键` 让光标多行选取  
`cmd + shift + h` 全局替换内容

## 插件

在这里我们介绍前端开发中需要经常用到的一些插件

`Auto Close Tag` 帮助我们自动闭合标签  
`Auto Import` 自动找寻import路径, 在开发ts的时候经常用到  
`Code Spell Checker` 帮助我们检查名词的拼写  
`GitLens` 展示该代码块的commit信息  
`Icon Fonts` 为不同的文件设置不同的ICON  
`JavaScript (ES6) code snippets` 让编辑器自动联想es6语法  
`Markdown Preview` 预览md文件  
`StandardJS` JavaScript 代码规范配套的vscode插件，下面我们会介绍为什么使用standardjs而不是eslint  
`React Standard Style` 同上，在React组件中使用standardjs代码规范  
`Vetur` 开发Vue组件的辅助工具  

### standardjs

这里我们着重介绍一下[standardjs](https://standardjs.com/readme-zhcn.html)这个代码规范工具，为什么我们使用它而不是eslint呢，这里我引用standardjs官方的介绍

- 无须配置。 史上最便捷的统一代码风格的方式，轻松拥有。
- 自动代码格式化。 只需运行 standard --fix 从此和脏乱差的代码说再见。
- 提前发现风格及程序问题。 减少代码审查过程中反反复复的修改过程，节约时间。

如果我不同意某条规则，可以改吗？  

<span style="color:red">不行。制定这套 standard 规范的目的就是让大家都不必再花时间浪费在无谓的代码风格之争上面了。关于缩进该用制表符还是空格这个问题已经争论了很久了，永远也没有答案。争论这个都可以把需求提前写完了。遵循 standard 规范，你就不用再犹豫了，毕竟不管怎样争论总归会选择一种风格的。希望大家也能在个人语义和普适价值上做一个权衡。</span>

如果你非要自己去配置成百上千项的 ESLint 规则，那你可以直接使用 eslint-config-standard 来将个人配置包装在上层。

小贴士：<span style="color:red">选择 standard 然后保持吧。把时间留下来解决其他有意义的问题！(^____^)/</span>

#### 更好的使用standardjs

在vscode安装standardjs插件后，我们还需要进行一些配置来启用standardjs，首先要保证你在全局或者当前目录安装了standard模块，然后
`cmd + ,` 打开配置，添加`"standard.autoFixOnSave": true, "standard.enable": true,` 来让vscode启用standard，此时在你不符合规范的地方会给你高亮提示，并且开启保存自动格式化功能，在你保存文件时自动格式化你的文件。