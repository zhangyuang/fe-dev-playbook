# Github 工作流

微软大大在这两年内动作很大，前后收购了 [Github](http://github.com/) 和 [NPM](http://npmjs.com/) 两大与技术人员生活息息相关的应用。并且在收购后做了很多调整，就如同大家  
可以很明显看到的 Github 在视觉设计上的改版，以及 新开辟了 Actions Packages 等新功能。来将之前散落在各个三方服务提供的功能统一收敛到官方实现当中。使得 Github Workflow + NPM Publish 的使用更加的丝滑。

## CI

在 Github Actions 出来之前，比较流行的开源 CI 服务分别是 [CircleCI](https://circleci.com/) 以及 [TravisCI](https://travis-ci.org/)。之前也有一些项目使用过这些第三方服务，但给人的体验都不是很好例如构建缓慢。特别是对于国内用户来说访问它们的资源实在是太慢了, 并且它们自身的功能也存在一点缺失。

### Github Actions

接下来让我们看看应用要如何接入 [Github Actions](https://docs.github.com/cn/free-pro-team@latest/actions)
以 [create-ssr-app](https://github.com/zhangyuang/create-ssr-app) 为例

#### 创建配置文件

```bash
$ mkdir -p .github/workflows
$ touch .github/workflows/CI.yaml
```

#### 监听 Git 命令

在 push 代码 以及 合并 PR 的时候触发 CI 工作

```yml
name: CI

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the dev branch
on:
  push:
    branches: [dev, master]
  pull_request:
    branches: [dev, master]

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

#### 定义job

我们的构建一般都包含多个任务，github 可以并行的执行这些任务来提升构建速度，并且可以指定任务之间的依赖关系

```yml
jobs:
  install: # 定义安装依赖的任务
    if: "!contains(github.event.head_commit.message, 'skip ci') && !contains(github.event.head_commit.message, '.md')" # 如果 commit 信息包含以下关键字则跳过该任务
    strategy: # 分别在三个操作系统的三种 Node.js 环境中运行任务
        matrix:
          os: [ubuntu-latest, macos-latest, windows-latest]
          node: ["12", "13", "14"]
    name: install - ${{ matrix.os }} - ${{ matrix.node }}
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node }}
      - name: restore # 恢复之前缓存的依赖
        uses: actions/cache@v2
        with:
          path: |
            node_modules
            */*/node_modules
          key: ${{ runner.os }}-${{ hashFiles('**/package.json') }} # 依赖缓存的 key 当 package.json 内容变动时丢弃缓存 也可以使用 package-lock.json or yarn.lock
          restore-keys: |
            ${{ runner.os }}-${{ matrix.node-version }}-nodemodules-
      - name: Install dependencies # 安装依赖
        run: |
          yarn
```

测试 和 lint 任务需要依赖 install 任务执行完毕后才可以执行。但这两个任务之间没有依赖关系，可以并行的运行

```yml
test:
    needs: install
    strategy:
        matrix:
          os: [ubuntu-latest, macos-latest, windows-latest]
          node: ["12", "13", "14"]
    name: test - ${{ matrix.os }} - ${{ matrix.node }}
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node }}
      - name: Load node_modules
        uses: actions/cache@v2
        with:
          path: |
            node_modules
            */*/node_modules
          key: ${{ runner.os }}-${{ hashFiles('**/package.json') }}
      - run: yarn test # 执行测试并生成覆盖率，这里一般都是接入 codecov 服务，需要配置 CODECOV_TOKEN 环境变量才能够上传
  lint:
    needs: install
    strategy:
        matrix:
          os: [ubuntu-latest, macos-latest, windows-latest]
          node: ["12", "13", "14"]
    name: lint - ${{ matrix.os }} - ${{ matrix.node }}
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node }}
      - name: Load node_modules
        uses: actions/cache@v2
        with:
          path: |
            node_modules
            */*/node_modules
          key: ${{ runner.os }}-${{ hashFiles('**/package.json') }}
      - run: yarn lint
```

#### 构建产物并上传

我们的应用的运行代码通常是用构建工具 如 tsc|babel|webpack 来生成的。但是我们提交到 github 的只有源代码。在这里我们在 CI 中进行构建任务后，需要将构建的产物上传。否则下一个发布任务将无法获得构建任务生成后的目录文件

```yml
  build:
    needs: [lint, test]
    strategy:
        matrix:
          os: [ubuntu-latest, macos-latest, windows-latest]
          node: ["12", "13", "14"]
    name: build - ${{ matrix.os }} - ${{ matrix.node }}
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node }}
      - name: Load node_modules
        uses: actions/cache@v2
        with:
          path: |
            node_modules
            */*/node_modules
          key: ${{ runner.os }}-${{ hashFiles('**/package.json') }}
      - run: yarn build # 执行构建
      - name: Upload artifact # 上传构建产物，这里我们的源码目录是 src，而实际运行的代码是构建后的 bin 目录
        uses: actions/upload-artifact@v2
        with:
          name: build_output
          path: bin # 上传 bin 目录
```

#### 发布到 NPM

这里不需要使用到 matrix, 我们只需要在一个环境发布即可。发布功能依赖一些环境变量，我们需要创建 NPM_TOKEN 环境变量

```bash
$ npm token create
```

在 github 项目主页添加环境变量

![](https://res.wx.qq.com/op_res/fIHeA-ZVJ229K_xpIR2QiyVyH3ZTwtKqmQzM_e6AVZHXAxRw2q1qlWHrmqJ20xhP)

```yml
publish:
  name: Publish
  runs-on: ubuntu-latest
  needs: [build]
  steps:
    - uses: actions/checkout@v2
    - name: Setup node
      uses: actions/setup-node@v1
      with:
        node-version: 12
    - name: Download artifacts # 下载之前上传的构建产物
      uses: actions/download-artifact@v2
      with:
        name: build_output
        path: bin
    - name: Publish
      run: | # 只有 commit 信息包含版本号的提交才进行发布，否则不需要发布。这里我们可以使用 lerna publish/version 或者 npm version 来进行发布
        if git log -1 --pretty=%B | grep "^[0-9]\+\.[0-9]\+\.[0-9]\+$";
        then
          echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc
          npm publish
        else
          echo "Not a release, skipping publish"
        fi
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

以上的步骤都做完后，当执行 `npm version patch` 命令来生成版本后推送到仓库便会自动帮你执行构建发布流程

![](https://res.wx.qq.com/op_res/A2UVQnCR7s9y5uggqAWM2NK-V6PJOMpSKY7wA7aGKZ2GZUD123KVykc7yk8UGbmo)