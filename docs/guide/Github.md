# Github 工作流

微软大大在这两年内动作很大，前后收购了 [Github](http://github.com/) 和 [NPM](http://npmjs.com/) 两大与技术人员生活息息相关的应用。并且在收购后做了很多调整，就如同大家  
可以很明显看到的 Github 在视觉设计上的改版，以及 新开辟了 Actions Packages 等新功能。来将之前散落在各个三方服务提供的功能统一收敛到官方实现当中。使得 Github Workflow + NPM Publish 的使用更加的丝滑。

## CI

在 Github Actions 出来之前，比较流行的开源 CI 服务分别是 [CircleCI](https://circleci.com/) 以及 [TravisCI](https://travis-ci.org/)。之前也有一些项目使用过这些第三方服务，但给人的体验都不是很好例如构建缓慢。特别是对于国内用户来说访问它们的资源实在是太慢了。并且它们自身的功能也存在一点缺失。

### Github Actions

接下来让我们看看应用要如何接入 [Github Actions](https://docs.github.com/cn/free-pro-team@latest/actions)
以 [create-ssr-app](https://github.com/zhangyuang/create-ssr-app) 为例

#### 创建配置文件

```bash
$ mkdir -p .github/workflows
$ touch .github/workflows/CI.yaml
```

#### 添加构建环境

这里推荐使用 build matix 来确保我们的应用可以在多个操作系统，多个语言版本中成功构建

```yml
strategy:
    matrix:
      os: [ubuntu-latest, macos-latest, windows-latest]
      node: ["12", "13", "14"]
name: install - ${{ matrix.os }} - ${{ matrix.node }}
runs-on: ${{ matrix.os }}
```

... 待续