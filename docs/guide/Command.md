---
sidebarDepth: 3
---

# Shell命令

熟练使用*nix系统的第一步便是熟练它的常用命令，大部分服务器的使用的Linux环境是没有GUI的，我们只能够通过命令来操控系统。对于前端开发来说，我们无需掌握大部分的高难度命令，只需掌握工作开发中常用的命令即可。如果不知道某个命令怎么用，最开始的时候是可以通过网络搜索来解决，稍微熟悉之后，就可以通过`man xxx`来查阅命令的手册来学习命令的各种参数。

## 文件相关命令

熟练使用*nix系统下的复制 移动命令可以帮助我们写一些小的自动化shell脚本。例如在前端构建完毕后，将构建产物移动到指定目录或者重命名

```bash
$ cp ./a.txt ../b.txt # 将当前目录下的a.txt文件复制到上级目录并更名
$ mv ./a.txt ../b.txt # 将当前目录下的a.txt文件移动到上级目录并更名
$ mv ./a.txt ./b.txt # 重命名当前目录下的a.txt文件
```

### find

使用 `find` 命令可以帮助我们查找符合要求的文件

```bash
$ find ./ -iname "*.js" # 查找当前目录下的所有js文件, 忽略大小写
$ find ./ -size +25k  # 查找当前目录下文件大小大于25kb的文件
```

### ack

find的功能是比较弱的，对全文检索有心无力，ack是更好的搜索代码神器

安装

```bash
$ brew install ack 
```

然后，通过ack加关键字搜索即可。

```bash
$ ack targetCode
$ ack -i "ICE BUILD" ./node_modules
```

### grep

使用 `grep` 命令可以帮助我们筛选符合要求的内容

```bash
$ grep "browserRouter" -i ./src/entry.tsx # 在当前src目录下的entry.tsx文件中查找browserRouter关键字忽略大小写
```

### awk 

通过awk命令我们可以筛选出符合要求的行或者列数据  

以:为分隔符，将password分为多列，并且提取出第一列的内容

```bash
$ cat /etc/passwd |awk -F ':' '{print $1}'
```


### tar

通过tar命令可以将文件打包并压缩，也可以解包和解压缩，配合别的命令可以写成简单的发布脚本。比如下面的命令就是一个打包压缩和解压缩的例子，将当前文件夹下的所有文件打包并gzip压缩，然后再来一遍解压缩

```bash
tar -zcvf build.zip ./*
mkdir test
tar -xvf build.zip -C ./test
```

### scp

打包好的文件可以通过scp来跨机器拷贝到集成调试服务器上面，比如我们本地打包好的文件是build.zip，需要拷贝到服务器上面/usr/share/nginx/html/，服务器ip是10.20.30.40，用户名是fe-deploy，就可以通过如下命令完成：
```bash
scp ./build.zip fe-deploy@10.20.30.40:/usr/share/nginx/html/build.zip
```

### rsync

如果只是把打包好的文件推送到服务器上面，rsync会比上面先压缩再scp，再解压要简单很多。rsync就是用来同步两个目录，可以跨越网络。比如还是上面发布的例子，我们可以直接用下面的命令。`-r`是递归。`-v`是回显，都同步了哪些文件。`-z`是压缩。`--delete`是在目的目录删掉我们原目录不存在的文件。

```bash
rsync -rvz ./ fe-deploy@10.20.30.40:/usr/share/nginx/html --delete
```

## 进程相关命令

```bash
$ lsof -i:8000 # 查看端口占用情况
$ ps # 查看当前正在运行的进程，ps命令选项众多这里不一一介绍
$ kill -9 pid # 根据进程pid来将进程强制退出
```

## 管道

管道可以将上一个命令的stdout输出，作为下一个命令的stdin输入。通过管道符我们可以实现一些稍微复杂的自动化的脚本功能

比如，查找当前正在运行的Node进程并提取出pid传给kill命令来退出进程。

```bash
$ ps | grep -i "node" | awk '{print $2}' | xargs kill -9 
```

## tree

大部分框架的文档都是使用tree命令来列出目录结构示例,更多功能查看[文档](https://wangchujiang.com/linux-command/c/tree.html)

```bash
$ tree -L 2 -I 'node_modules' # 目录结构层级为2，忽略node_modules
├── app.js
├── dist
├── f.yml
├── package.json
└── src
    ├── detail
    ├── index
    └── layout
    
```

## time

time命令用于统计给定命令所花费的总时间。更多信息查看[文档](https://man.linuxde.net/time)

```bash
$ time ls
```

## ssh

有时候我们也需要登录到服务器上面，就可以通过`ssh`来登录。也可以通过配置把本地的公钥加到服务器上面，来省略输入密码的过程，详细的步骤可以搜索下，这里就不详细说了。
```bash
$ ssh fe-deploy@10.20.30.40
```
