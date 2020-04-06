# VS Code

VS Code 毫无疑问是目前最强大的编辑器，没有之一，凭借自身丰富的插件体系以及优秀的断点调试能力迅速成为最火热的编辑器。

## 安装 VS Code

这个不多介绍，直接去[官网](https://code.visualstudio.com/)下载安装包安装

## code 命令

打开 VS Code，打开控制面板（⇧⌘P）, 输入 `shell command` ，在提示里看到 `Shell Command: Install "code" command in PATH`，运行它就可以了。

然后，在终端里，通过 `code .` 或 `code xx` 直接打开目录或文件。

## 快捷键

熟练使用 VS Code 快捷键是必备技能

### 左边栏快捷键

`cmd + k + s` -> `keybinds.json`

添加以下配置

```json
({
  "key": "cmd+1",
  "command": "workbench.view.explorer"
},
{
  "key": "cmd+2",
  "command": "workbench.view.search"
},
{
  "key": "cmd+3",
  "command": "workbench.view.scm"
},
{
  "key": "cmd+4",
  "command": "workbench.view.debug"
},
{
  "key": "cmd+5",
  "command": "workbench.view.extensions"
})
```

添加完毕后我们可以通过 cmd + 数字键的组合方式来快速切换左边栏

### 其他快捷键

以下介绍实际使用 VS Code 中经常需要用到的快捷键

- `cmd + p` 根据关键字快速打开一个文件
- `cmd + ,` 打开 VS Code 配置项
- `cmd + d` 快速选取多个相同的内容块
- `option + shift + 鼠标左键` 让光标多行选取
- `cmd + shift + h` 全局替换内容

## VSCode 设置

这里附上个人的 VSCode 设置，契合绝大多数前端开发的需求，并且忽略不必要的设置防止 VSCode CPU 占用过高

```json
{
  "explorer.confirmDelete": false,
  "emmet.triggerExpansionOnTab": true,
  "editor.tabSize": 4,
  "window.zoomLevel": -1,
  "stylelint.autoFixOnSave": true,
  "standard.autoFixOnSave": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "gitlens.advanced.messages": {
    "suppressShowKeyBindingsNotice": true
  },
  "files.associations": {
    "*.wpy": "vue",
    "*.html": "html"
  },
  "editor.renderControlCharacters": true,
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "wxml": "html"
  },
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "search.followSymlinks": false,
  "files.exclude": {
    // 是否显示这些文件(夹)
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/tmp": true,
    // "**/node_modules": true,
    "**/bower_components": true
    // "**/dist": true
  },
  "search.exclude": {
    // 搜索的时候排除的文件夹，视情况开启
    // "**/node_modules": false,
  },
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/**": true,
    "**/tmp/**": true,
    "**/bower_components/**": true,
    "**/dist/**": true
  },
  "explorer.confirmDragAndDrop": false,
  "javascript.implicitProjectConfig.experimentalDecorators": true,
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "vscode-icons",
  "vsicons.dontShowNewVersionMessage": true,
  "workbench.settings.editor": "json"
}
```

## 插件

在这里我们介绍前端开发中需要经常用到的一些插件,很多插件的功能VSCode已经内置了，我们安装之前需要查询一下相关资料不要重复安装使得臃肿

- `Code Spell Checker` 帮助我们检查名词的拼写
- `GitLens` 展示该代码块的 commit 信息
- `vscode-icons` 为不同的文件设置不同的 ICON
- `Markdown Preview` 预览 md 文件
- `StandardJS` JavaScript 代码规范配套的 VS Code 插件，下面我们会介绍为什么使用 standardjs 而不是 eslint
- `stylelint-plus` 配合"extends": "stylelint-config-standard"，所有的规范都按 standard 的来
- `React Standard Style` 同上，在 React 组件中使用 standardjs 代码规范
- `Minify` 自动生成经过 uglify 后的文件

## 主题

推荐使用`One Dark Pro`配合`vscode-icons`更佳
安装后 setting 添加如下配置开启

```json
"workbench.colorTheme": "One Dark Pro",
"workbench.iconTheme": "vscode-icons"
```
