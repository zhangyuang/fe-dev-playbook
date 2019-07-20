---
sidebarDepth: 2
---

# 终端

本篇将会介绍zsh这个shell的强大之处以及iterm2这个强大的现代化终端，将两个工具结合使用即酷炫又实用。  
注：本文只会介绍实际开发中使用频率比较高的用法，该工具的强大功能并未全部介绍完。如有兴趣可查阅官方文档继续学习。

## iterm2

> iterm2取代了默认的Terminal，它将带给你现代化的体验以及任何你想要的功能

### 安装iterm2

这里我们直接去[官网](https://www.iterm2.com/)进行download

### 快捷键

熟练使用快捷键是程序员的基本操守

#### 唤醒热键

给终端加一个快速唤醒/隐藏的快捷键是必须要做的，否则用鼠标找到终端的快捷方式再打开这种做法不仅慢而且逼格低，设置方式
`iterm2` -> `Preferences` -> `Keys` -> `Hotkey`

![](https://gw.alicdn.com/tfs/TB1AHfOXvb2gK0jSZK9XXaEgFXa-1920-1048.jpg)

这里我们建议使用`option` + `space` 组合键来唤醒/隐藏终端

#### 其他快捷键

以下快捷键与chrome快捷键类似，必须熟练使用

- `ctrl` + `a/e` 快速切换到当前正在输入的文本的头部／尾部  
- `ctrl` + `u` 清空当前输入  
- `cmd` + `T` 打开一个新的iterm2 Tab  
- `cmd` + `方向键` 左右切换Tab  
- `cmd` + `D` 分屏  
- `cmd` + `K` 清屏  
- `cmd` + `N` 打开一个新的iterm2 窗口 

#### 透明度

个人喜好这里建议给iterm2配置一个透明度，看起来体验感舒适很多
`iterm2` -> `Preferences` -> `Profiles` -> `Window` -> `Transparency`

效果如下

![](https://gw.alicdn.com/tfs/TB1Fm_RXuH2gK0jSZJnXXaT1FXa-1452-986.jpg)

## zsh

> Unix shell，一种壳层与命令行界面，是UNIX操作系统下传统的用户和计算机的交互界面。第一个用户直接输入命令来执行各种各样的任务。
普通意义上的shell就是可以接受用户输入命令的程序。它之所以被称作shell是因为它隐藏了操作系统低层的细节。同样的Unix下的图形用户界面GNOME和KDE，有时也被叫做“虚拟shell”或“图形shell”。

目前常见的shell有bash、sh、csh，ksh等, 这里我们介绍shell中的极品zsh。
zsh的强大之处随便列举就有以下几点，色彩高亮，命令提示，智能补全等等，下面我们会详细介绍
这么牛逼的东西安装起来自然是及其麻烦的，好在已经有大神帮我们做了一个一键安装zsh的脚本[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

### 安装zsh

使用curl来安装

```
# sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### 配置主题

默认的zsh主题是非常丑并且展示的信息也很少的，这里zsh提供了多种主题供我们直接使用，当然你可以根据自己的喜欢来编写一个主题，这里我们使用ys这个主题。设置方式

```
$ vim ~/.zshrc // 打开zsh配置文件
10 ZSH_THEME="ys" // 在第10行设置当前主题为ys
$ source ~/.zshrc // 重新执行一遍zsh配置文件
```

![](https://gw.alicdn.com/tfs/TB1OxHTXAH0gK0jSZPiXXavapXa-1442-870.jpg)

### 插件

zsh提供了插件功能，我们可以通过插件来实现更加强大的功能

#### autojump插件

必装插件没有之一，可以让你在任意目录之间进行跳转

```
$ brew install autojump
$ vim ~/.zshrc

61 plugins=(
62   git
63   autojump
64 )

$ source ~/.zshrc
```

##### 使用autojump

`j` + `目录缩写` 快速去到你曾经进入过的目录

autojump会自动对你进入过的目录进行记录并且定义权重，使用j命令可以迅速进入目录

```
$ j hub // 等价于 cd ~/workspace/github
$ j hub // 如果当前目录不对，可以重复执行该命令，会自动根据权重依次匹配
$ d // 会列出你曾经进入过的目录，输入前面的序号可以直接进入该目录
```

#### git插件

git插件也是必装的插件，它提供了多种alias来简化你的git命令，以下几种是会被经常使用的命令，你也可以在.zshrc中额外添加喜好的alias

```
$ g // 等价于git
$ ga // 等价于git add
$ gcmsg "" // 等价于git commit -m ""
$ gco // 等价与git check out
$ gb // 等价于git branch
```

### 进入目录

无需输入`cd`命令  
输入`~`等价于`cd ～`

### 路径补全

*nix 下的其他shell默认可以通过tab来实现路径补全，但是功能比起zsh的路径补全简直是太简单了。这里我们举一个例子
`cd /u/l/b` 按下tab键自动帮你补全为`cd /usr/local/bin/`
