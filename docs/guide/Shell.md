---
sidebarDepth: 2
---

# 终端

本篇将会介绍 zsh 这个 shell 的强大之处以及 iterm2 这个强大的现代化终端，将两个工具结合使用即酷炫又实用。  
注：本文只会介绍实际开发中使用频率比较高的用法，该工具的强大功能并未全部介绍完。如有兴趣可查阅官方文档继续学习。

## iterm2

> iterm2 取代了默认的 Terminal，它将带给你现代化的体验以及任何你想要的功能

### 安装 iterm2

这里我们直接去[官网](https://www.iterm2.com/)进行 download

### 快捷键

熟练使用快捷键是程序员的基本操守

#### 唤醒热键

给终端加一个快速唤醒/隐藏的快捷键是必须要做的，否则用鼠标找到终端的快捷方式再打开这种做法不仅慢而且逼格低，设置方式
 `iterm2` -> `Preferences` -> `Keys` -> `Hotkey` 

![](https://gw.alicdn.com/tfs/TB1AHfOXvb2gK0jSZK9XXaEgFXa-1920-1048.jpg)

这里我们建议使用 `option` + `space` 组合键来唤醒/隐藏终端

#### 其他快捷键

以下快捷键与 chrome 快捷键类似，必须熟练使用

- `ctrl` + `a/e` 快速切换到当前正在输入的文本的头部／尾部
- `ctrl` + `u` 清空当前输入
- `cmd` + `T` 打开一个新的 iterm2 Tab
- `cmd` + `方向键` 左右切换 Tab
- `cmd` + `D` 分屏
- `cmd` + `K` 清屏
- `cmd` + `N` 打开一个新的 iterm2 窗口

#### 透明度

个人喜好这里建议给 iterm2 配置一个透明度，看起来体验感舒适很多
 `iterm2` -> `Preferences` -> `Profiles` -> `Window` -> `Transparency` 

效果如下

![](https://gw.alicdn.com/tfs/TB1Fm_RXuH2gK0jSZJnXXaT1FXa-1452-986.jpg)

## zsh

> Unix shell，一种壳层与命令行界面，是 UNIX 操作系统下传统的用户和计算机的交互界面。第一个用户直接输入命令来执行各种各样的任务。
> 普通意义上的 shell 就是可以接受用户输入命令的程序。它之所以被称作 shell 是因为它隐藏了操作系统低层的细节。同样的 Unix 下的图形用户界面 GNOME 和 KDE，有时也被叫做“虚拟 shell”或“图形 shell”。

目前常见的 shell 有 bash、sh、csh，ksh 等, 这里我们介绍 shell 中的极品 zsh。
zsh 的强大之处随便列举就有以下几点，色彩高亮，命令提示，智能补全等等，下面我们会详细介绍
这么牛逼的东西安装起来自然是及其麻烦的，好在已经有大神帮我们做了一个一键安装 zsh 的脚本[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

### 安装 zsh

使用 curl 来安装

``` 
$ sh - c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### 配置主题

默认的 zsh 主题是非常丑并且展示的信息也很少的，这里 zsh 提供了多种主题供我们直接使用，当然你可以根据自己的喜欢来编写一个主题，这里我们使用 ys 这个主题。设置方式

``` 
$ vim~/.zshrc // 打开zsh配置文件
10 ZSH_THEME = "ys" // 在第10行设置当前主题为ys
$ source~/.zshrc // 重新执行一遍zsh配置文件
```

![](https://gw.alicdn.com/tfs/TB1OxHTXAH0gK0jSZPiXXavapXa-1442-870.jpg)

### 插件

zsh 提供了插件功能，我们可以通过插件来实现更加强大的功能

#### autojump 插件

必装插件没有之一，可以让你在任意目录之间进行跳转

``` 
$ brew install autojump
$ vim~/.zshrc

61 plugins = (
62  git 
63  autojump 
64 )

$ source~/.zshrc
```

##### 使用 autojump

 `j` + `目录缩写` 快速去到你曾经进入过的目录

autojump 会自动对你进入过的目录进行记录并且定义权重，使用 j 命令可以迅速进入目录

``` 
$ j hub // 等价于 cd ~/workspace/github
$ j hub // 如果当前目录不对，可以重复执行该命令，会自动根据权重依次匹配
$ d // 会列出你曾经进入过的目录，输入前面的序号可以直接进入该目录
```

#### [git 插件](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/git)

git 插件也是必装的插件，它提供了百余个 alias 来简化你的 git 命令，alias 列表可访问插件链接查看。以下几种是会被经常使用的命令，你也可以在.zshrc 中额外添加喜好的 alias

``` 
$ g // 等价于git
$ ga // 等价于git add
$ gcmsg "" // 等价于git commit -m ""
$ gco // 等价与git check out
$ gb // 等价于git branch
```

#### zsh-syntax-highlighting

既然 zsh 都已经安排上了，那 zsh 可用命令的高亮显示自然是不能落下，借助[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md) 来实现命令高亮

##### Preview

使用前：

![zsh-syntax-highlighting 使用前](https://img.alicdn.com/tfs/TB1F_iCb4D1gK0jSZFsXXbldVXa-404-62.png)

使用后：

![zsh-syntax-highlighting 使用后](https://img.alicdn.com/tfs/TB1H45BbW67gK0jSZFHXXa9jVXa-386-54.png)

#### zsh-autosuggestions

它能够根据你的命令历史记录即时提示，个人对它的喜爱程度仅次于 autojump。BTW，每次用同事的电脑我都会想吐槽，还不是因为他没安装 [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md) 😏

##### Preview

<a href="https://asciinema.org/a/37390" target="_blank"><img src="https://asciinema.org/a/37390.png" width="400" /></a>

#### last-working-dir

last-working-dir 插件，可以记录上一次退出命令行时候的所在路径，并且在下一次启动命令行的时候自动恢复到上一次所在的路径。这一切不需要我们进行任何操作，全部都是自动完成的

##### Preview

![last-working-dir 示例](https://img.alicdn.com/tfs/TB1poGSb4D1gK0jSZFKXXcJrVXa-1764-1408.jpg)

#### [web-search](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/web-search)

web-search 集成了程序猿可能会用到的大部分的搜索引擎，在 iterm 中键入 `${搜索引擎} ${搜索关键词}` ，他可以直接打开对应的网页，缩短了你的搜索路径

例如，输入 `google javascript` ，它会在我的浏览器中直接打开 https://www.google.com/search?q=javascript

web-search 常用的搜索引擎如下:

 - google
 - github
 - baidu
 - stackoverflow

### 进入目录

无需输入 `cd` 命令  
输入 `~` 等价于 `cd ～` 

### 路径补全

\*nix 下的其他 shell 默认可以通过 tab 来实现路径补全，但是功能比起 zsh 的路径补全简直是太简单了。这里我们举一个例子
 `cd /u/l/b` 按下 tab 键自动帮你补全为 `cd /usr/local/bin/` 

