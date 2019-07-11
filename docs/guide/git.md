# Git

> Git是目前世界上最先进的分布式版本控制系统

本篇文章将重点讲解大多数人忽略或者不清楚的点，注意: 这不是一篇大而全的git使用教程, 只会重点讲解一些关键知识点，如果你需要更全的git教程，你应该去查看[官方文档](https://git-scm.com/)

## 关联本地仓库与远程仓库

大多数人都会使用`git clone`命令来将github上的代码仓库克隆到本地，然后做一些修改后就可以使用`git push`等命令来提交修改，但是这导致的问题就是大多数人对本地仓库和远程仓库是如何关联起来的不清楚，同时也不清楚有时候用到的`origin`这个究竟代表什么意思。下面我们从零来讲解如何将本地仓库和远程仓库关联。

```
$ mkdir studyGit // 创建目录
$ cd studyGit // 进入该目录
$ g init // 初始化本地git仓库配置文件
// 这是最关键的命令，这里我们给本地的git仓库添加了一个名为origin，地址为git@github.com:ykfe/fe-dev-playbook.git的远程仓库
$ g remote add origin git@github.com:ykfe/fe-dev-playbook.git 
$ ga .
$ gcmsg "feat: init files" // 在这里我们做一些修改然后commit生成一个本地的版本
$ g push origin master // 将本地仓库的修改推送到远程origin 仓库的master分支
```

通过以上代码我们可以知道，`origin`代表的是远程仓库的名称，这里的`origin`我们可以在`git remote` 的时候自定义名称，不一定要叫`origin`只是官方的规范对`clone`下来的远程仓库默认叫做`origin`。  
看到这里，你可以知道我们完全可以通过`git remote`添加多个远程仓库来实现同时将代码推送到`github/gitlab/gitoschina`多个远程仓库

## git add + commit 与 git commit -am 的区别

大多数人喜欢用后面的一种方式来添加提交本地代码到本地仓库中，但后一种与前一种方式并不是完全相等的。  
熟悉Git的同学知道，我们在项目中新建一个新文件后，它的状态是`untracked`的，当我们使用`git add .` 将其添加到暂存区时，它的状态就会变为`tracked`，即可追踪的。当我们用`git commit`的时候会将暂存区的文件提交到本地仓库生成一个commit记录。  
`git commit -am` 只会将`tracked`状态的文件commit到本地仓库，意思是如果你有新的文件产生，并且之前没有用`git add` 将其状态变为`tracked`，使用 `git commit -am` 并不能将该文件commit到本地仓库，容易造成文件的丢失。

![](https://gw.alicdn.com/tfs/TB1c5RSXKL2gK0jSZPhXXahvXXa-1436-1152.jpg)

## 多人合作开发

如果要开发多人合作项目，我们建议将master分支设置为[protected](https://help.github.com/en/articles/configuring-protected-branches)分支，使得不允许直接在master上提交代码，只能通过PR的形式来合并。如何向项目提交PR请参考[GitHub 的 Pull Request 是指什么意思？](https://www.zhihu.com/question/21682976/answer/79489643)

## 使用git-flow

使用[git-flow](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)这个工具可以帮助我们更好的控制我们的工作流程

## commit message 规范

commit message是必须要遵循一定的规范的，随意的commit message只会让人感受到不专业。这里我们参考[AngularJS commit message conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
> This would add kinda “context” information. Look at these messages (taken from last few angular’s commits):  
Fix small typo in docs widget (tutorial instructions)  
Fix test for scenario.Application - should remove old iframe  
docs - various doc fixes  
docs - stripping extra new lines  
Replaced double line break with single when text is fetched from Google  
Added support for properties in documentation  

## 使用git rebase 来合并你的commit

大部分人在实际开发过程中，都会建立自己的分支开发，这是大部分团队都能做到的，但是我们在测试问题的时候总是会提交一些无用的commit去远程的repo，自己的分支还好，但是最后把自己的分支合并到master上的时候如果还带上这些commit就十分不雅观了，当然github的PR功能已经给我们合并PR的时候提供了多种选项，其中就包括rebase。但是这里还是要介绍一个很多人不常用的命令，git rebase，也就是变基，git rebase功能很强大，也很容易一不小心弄不好就把你的整个commit或者git历史弄乱，所以这里我们不写如何用它来变基，只说如何用它来合并自己的commit。[参考教程](http://gitbook.liuhui998.com/4_2.html)

注意事项: 只有个人操作的分支才可以用git rebase，多人一起协作的分支切记不要轻易使用git rebase,否则很容易造成冲突。

实战操作, 首先建立一个git目录。

```
$ mkdir testGit
$ git init
$ vim 1.txt
```
在master分支对1.txt做修改并且commit

![](http://gw.alicdn.com/tfs/TB1luMFXBr0gK0jSZFnXXbRRXXa-1138-852.png)

切换到rebase分支，修改两次1.txt，并进行两次commit
![](http://gw.alicdn.com/tfs/TB1UWIFXBv0gK0jSZKbXXbK2FXa-1140-856.png)
使用git rebase 合并刚刚的两次commit

```
git rebase -i HEAD~x x代表你要合并前x次commit 这里我们填2, 这里你也可以直接填具体的commit对应的hash值
git rebase -i HEAD~2
```
![](http://gw.alicdn.com/tfs/TB1Qs7DXAT2gK0jSZFkXXcIQFXa-1154-866.png)
这里的pick的意思是

> pick：保留该commit（缩写:p）  
reword：保留该commit，但我需要修改该commit的注释（缩写:r）  
edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）  
squash：将该commit和前一个commit合并（缩写:s）  
fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）  
exec：执行shell命令（缩写:x）  
drop：我要丢弃该commit（缩写:d）  

我们使用的比较多的是`s`和`f`两个选项，在这里我们想要合并两次commit为一个，所以将我们的rebase信息改为

![](http://gw.alicdn.com/tfs/TB1wPMDXuL2gK0jSZFmXXc7iXXa-1148-840.png)

保存之后出现如下界面，可以让我们设置合并后的commit信息，在第二行写上新的cm信息，并且注释掉之前的两次cm信息，或者直接用dd来删除

![](http://gw.alicdn.com/tfs/TB1WuIDXAT2gK0jSZPcXXcKkpXa-1142-852.png)

`:wq`保存后查看git log

![](http://gw.alicdn.com/tfs/TB1l5.DXuP2gK0jSZFoXXauIVXa-1144-848.png)

ok,前两次cm信息成功被合并为了一个

注意事项

你执行了rebase命令的分支如果和远程仓库的commit history不一样，是没有办法直接push到远程仓库的，因为这时候你本地仓库的commit history已经修改了，和远程的会冲突。

解决方式

```
$ git push origin dev -f // 使用--force来强制push，但你要清楚这可能会导致你的一些commit记录的丢失，所以请仅在个人分支进行该操作
```