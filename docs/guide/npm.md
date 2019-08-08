# npm

## 简介

npm是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：

- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

现行主流版本的nodejs已经集成了npm，nodejs安装成功后，可以通过输入 `npm -v` 来测试是否成功安装。命令如下，出现版本提示表示安装成功

```
$ npm -v

6.7.0
```

由于npm本质也是nodejs的模块，所以如果你安装的是旧版本的 npm，可以很容易得通过 npm 命令来升级，命令如下：
```
$ sudo npm install npm -g   //mac

npm install npm -g  //window
```


## 安装模块

npm 安装 Node.js 模块语法格式如下：

```
$ npm install <Module Name>
```

以下实例，我们使用 npm 命令安装常用的 Node.js web框架模块 egg:


```
$ npm i egg
```

安装好之后，egg 包就放在了工程目录下的 node_modules 目录中，因此在代码中只需要通过 `require('egg')` 的方式就好，无需指定第三方包路径。

```
// app/controller/home.js
const Egg = require('egg');
const Controller = Egg.Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController;
```

### 全局安装与本地安装

npm 的模块/包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有-g而已，比如

```
npm install egg          # 本地安装
npm install egg -g   # 全局安装
```


#### 本地安装

本地安装即局部安装，键入命令：`npm install webpack` 或 `npm install webpack --save-dev` 等，其中参数`--save-dev`的含义是代表把你的安装包信息写入package.json文件的devDependencies字段中，包安装在指定项目的node_modules文件夹下。

特点如下：

- 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
- 可以通过 `require()` 来引入本地安装的包。


#### 全局安装

全局安装方式是键入命令：`npm install egg -g` 或 `npm install egg --global`，其中参数-g的含义是代表安装到全局环境里面，具体可以使用`npm root -g`查看全局安装目录。

特点如下：

- 将安装包放在 /usr/local 下或者你 node 的安装目录。

- 可以直接在命令行里使用，不能通过`require()`来引入。

##### 查看安装信息

可以使用以下命令来查看所有全局安装的模块：

```
$ npm list -g

├─┬ cnpm@4.3.2
│ ├── auto-correct@1.0.0
│ ├── bagpipe@0.3.5
│ ├── colors@1.1.2
│ ├─┬ commander@2.9.0
│ │ └── graceful-readlink@1.0.1
│ ├─┬ cross-spawn@0.2.9
│ │ └── lru-cache@2.7.3
……
```

如果要查看某个模块的版本号，可以使用命令如下：

```
$ npm list grunt

projectName@projectVersion /path/to/project/folder
└── grunt@0.4.1

```


## 卸载模块

我们可以使用以下命令来卸载 Node.js 模块。

```
$ npm uninstall egg
```

卸载后，你可以到 /node_modules/ 目录下查看包是否还存在，或者使用以下命令查看：

```
$ npm ls
```

## 更新模块

我们可以使用以下命令更新模块：

```
$ npm update egg
```

## 搜索模块

使用以下来搜索模块：

```
$ npm search egg
```


## package.json

package.json 位于模块的目录下，用于定义包的属性。接下来让我们来看下 egg 包的 package.json 文件，位于 `node_modules/egg/package.json` 内容

```
{
  "name": "egg",
  "version": "2.23.0",
  "description": "A web framework's framework for Node.js",
  "keywords": [
    "web",
    "app",
    "http",
    "application",
    "framework",
    "middleware",
    "koa",
    "egg"
  ],
  "dependencies": {
    "@types/accepts": "^1.3.5",
    "@types/koa": "^2.0.48",
    "@types/koa-router": "^7.0.40",
    "accepts": "^1.3.5",
    "agentkeepalive": "^4.0.2",
    "cache-content-type": "^1.0.1",
    "circular-json-for-egg": "^1.0.0",
    "cluster-client": "^3.0.1",
    "debug": "^4.1.1",
    "delegates": "^1.0.0",
    "egg-cluster": "^1.23.0",
    "egg-cookies": "^2.2.6",
    "egg-core": "^4.16.1",
    "egg-development": "^2.4.2",
    "egg-i18n": "^2.0.0",
    "egg-jsonp": "^2.0.0",
    "egg-logger": "^2.3.2",
    "egg-logrotator": "^3.0.5",
    "egg-multipart": "^2.4.0",
    "egg-onerror": "^2.1.0",
    "egg-schedule": "^3.6.0",
    "egg-security": "^2.4.3",
    "egg-session": "^3.1.0",
    "egg-static": "^2.2.0",
    "egg-view": "^2.1.2",
    "egg-watcher": "^3.1.0",
    "extend2": "^1.0.0",
    "graceful": "^1.0.2",
    "humanize-ms": "^1.2.1",
    "is-type-of": "^1.2.1",
    "koa-bodyparser": "^4.2.1",
    "koa-is-json": "^1.0.0",
    "koa-override": "^3.0.0",
    "ms": "^2.1.1",
    "mz": "^2.7.0",
    "on-finished": "^2.3.0",
    "sendmessage": "^1.1.0",
    "urllib": "^2.33.0",
    "utility": "^1.15.0",
    "ylru": "^1.2.1"
  },
  "devDependencies": {
    "address": "^1.0.3",
    "assert-extends": "^1.0.1",
    "autod": "^3.0.1",
    "autod-egg": "^1.1.0",
    "coffee": "^5.2.1",
    "egg-alinode": "^1.0.3",
    "egg-bin": "^4.12.3",
    "egg-doctools": "^2.8.3",
    "egg-mock": "^3.21.0",
    "egg-plugin-puml": "^2.4.0",
    "egg-tracer": "^1.1.0",
    "egg-view-nunjucks": "^2.2.0",
    "eslint": "^5.15.1",
    "eslint-config-egg": "^7.1.0",
    "findlinks": "^2.1.0",
    "formstream": "^1.1.0",
    "glob": "^7.1.3",
    "koa-static": "^3.0.0",
    "mz": "^2.7.0",
    "mz-modules": "^2.1.0",
    "pedding": "^1.1.0",
    "runscript": "^1.3.0",
    "spy": "^1.0.0",
    "supertest": "^3.4.2",
    "ts-node": "^8.0.3",
    "typescript": "^3.3.3333",
    "webstorm-disable-index": "^1.1.2"
  },
  "main": "index.js",
  "types": "index.d.ts",
  "files": [
    "index.js",
    "lib",
    "app",
    "config",
    "agent.js",
    "index.d.ts"
  ],
  "scripts": {
    "lint": "eslint app config lib test *.js",
    "test": "npm run lint -- --fix && egg-bin pkgfiles && npm run test-local",
    "test-local": "egg-bin test",
    "test-local-changed": "egg-bin test --changed",
    "cov": "egg-bin cov --timeout 100000",
    "ci": "npm run lint && egg-bin pkgfiles --check && npm run cov",
    "doc-server": "doctools server",
    "doc-build": "doctools build",
    "doc-deploy": "doctools deploy",
    "autod": "autod",
    "puml": "puml . --dest ./docs",
    "commits": "./scripts/commits.sh"
  },
  "homepage": "https://github.com/eggjs/egg",
  "repository": {
    "type": "git",
    "url": "https://github.com/eggjs/egg.git"
  },
  "engines": {
    "node": ">= 8.0.0"
  },
  "license": "MIT",
  "__npminstall_done": "Thu Aug 01 2019 15:44:49 GMT+0800 (GMT+08:00)",
  "_from": "egg@2.23.0",
  "_resolved": "https://registry.npm.alibaba-inc.com/egg/download/egg-2.23.0.tgz"
}
```

### Package.json 属性说明

- name - 包名，name和version是package.json中最重要的两个字段，也是发布到NPM平台上的唯一标识，如果没有正确设置这两个字段，包就不能发布和被下载。

- version - 包的版本号。

- description - 包的描述信息，将会在npm search的返回结果中显示，以帮助用户选择合适的包。

- keywords - 包的关键词信息，是一个字符串数组，同上也将显示在npm search的结果中。

- homepage - 包的官网 url 。

- author - 包的作者姓名。

- main - main 字段指定了程序的主入口文件，`require('moduleName')` 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。

- scripts - 通过设置这个可以使NPM调用一些命令脚本，封装一些功能。

- bugs - 包的bug跟踪主页地址。

- contributors - 包的其他贡献者姓名。

- dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。

- repository - 包代码存放的地方的类型及地址，可以是 git 或 svn，git 可在 Github 上 `{"type": "git",  "url": "xxxx/es6-react.git"}`。

- files(较少用) - 包所包含的所有文件，可以取值为文件夹。通常我们还是用.npmignore来去除不想包含到包里的文件。

- config - 添加一些设置，可以供scripts读取用，同时这里的值也会被添加到系统的环境变量中。`{"port": "8080"}`。

- bin(较少用) - 如果你的包里包含可执行文件，通过设置这个字段可以将它们包含到系统的PATH中，这样直接就可以运行，很方便。

- license - 包的开源协议名称。


## 版本号

使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码，这里简单介绍一下。

语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

- 如果只是修复bug，需要更新Z位。
- 如果是新增了功能，但是向下兼容，需要更新Y位。
- 如果有大变动，向下不兼容，需要更新X位。
- 版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。

## NPM 常用命令

除了以上介绍的部分外，NPM还提供了很多功能，package.json里也有很多其它有用的字段。除了可以在npmjs.org/doc/查看官方文档外，这里再介绍一些NPM常用命令。

- `npm help`

  NPM提供了很多命令，例如install和publish，使用`npm help`可查看所有命令。

  npm ls

- `npm login`

  登陆npm，或者使用npm adduser添加新用户

  ```
  $ npm login
  
  Username: userName
  Password:
  Email: (this IS public)
  Email: (this IS public) Email@qq.com
  Logged in as userName on http://registry.npmjs.org/.
  ```

- `npm ls`

  查看当前目录下安装了哪些node包

- `npm help <command>`

  可查看某条命令的详细帮助，例如`npm help install`。

- `npm install . -g`

  在package.json所在目录下使用`npm install . -g`可先在本地安装当前命令行程序，可用于发布前的本地测试。

- `npm update <package>`  `npm update <package> -g`

  使用`npm update <package>`可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。

  使用`npm update <package> -g`可以把全局安装的对应命令行程序更新至最新版。

- `npm cache clear`

  可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。

- `npm unpublish <package>@<version>`

  使用`npm unpublish <package>@<version>`可以撤销发布自己发布过的某个版本代码。

- `npm install <pkg> -save` 

  安装包并保存到package.json文件，即把依赖包名称添加到 package.json 文件 dependencies 键下

- `npm link`

  在本地开发npm模块的时候，我们可以使用npm link命令，将npm 模块链接到对应的运行项目中去，方便地对模块进行调试和测试。创建了一个全局链接，然后讲该全局安装的target链接到自己项目里的node_modules文件夹，避免每次都publish npm包，然后安装调试。

tips：`dependencies`是运行时依赖，`devDependencies`是开发时的依赖。即`devDependencies`下列出的模块，是我们开发时用的；
  正常使用`npm install`时，会下载`dependencies`和`devDependencies`中的模块，当使用`npm install –production`或者注明`NODE_ENV`变量值为`production`时，只会下载`dependencies`中的模块。


### 等效用命令

```
npm install <pkg> //安装包命令
npm install <pkg>    =   npm i <pkg>

npm install <pkg> -g //全局安装包命令
npm install <pkg> -g = npm install <pkg> -global


npm install -save = npm i -S
npm install -save-dev = npm i -D
```


## NPM 镜像

众所周知国内直接使用 npm 的官方镜像是非常慢的，这里推荐使用淘宝 NPM 镜像。

淘宝 npm 镜像是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。

你可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

这样就可以使用 cnpm 命令来安装模块了：

```
$ cnpm install [name]
```

## 模块开发

### 操作流程

- 1、在npm的官网上注册一个账号，https://www.npmjs.com/

- 2、用npm命令登录npm账号

  ```
  npm login
  or
  npm adduser
  ```

- 3、npm模块逻辑开发

  - 创建模块目录，执行cd进入该目录
  - 执行`npm init`，初始化模块相关配置
  - 初始化期间，重点注意main文件及version
  - 另外需要注意，包名”name“不能有大写字母/空格/下滑线!
  - 模块业务开发 

- 4、发布包

  - package.json更改一下自己的版本号，一般默认1.0.0，当然可以自行修改，比如：0.0.1
  - 发布前需要在检查”main文件“，将想要导出的内容全部导出（`export xxx`  或者 `module.export=xxx`）
  - 执行`npm publish`发布模块
  - 如以上操作无误，且模块名未被占用，则此npm包可成功发布
  - 随着package.json中version版本递增，可多次发布，发布后，各版本无覆盖关系，互不影响



### 疑问项

- 发布撤回

  该种情况适用于，npm包已经发布，但发现重大缺陷，需要紧急修改，此时有两种办法可以补救：

  - 1、重新发布新版；

    我们上文已经提到，可以修改版本号后，重新执行发布

  - 2、发布撤回

    如果版本有明显漏洞，或者携带有敏感信息，需紧急发布撤回，即

    ```
    npm unpublish
    npm unpublish --force
    ```

    当然，这个撤回操作本身是一种不友好操作，且有特定条件限制：

    - 根据规范，只有在发包的24小时内才允许撤销发布的包（ unpublish is only allowed with versions published in the last 24 hours） 

    - 即使撤销了发布的包，发包的时候也不能再和被撤销的包的名称和版本重复了（即不能名称相同，版本相同，因为这两者构成的唯一标识已经被“占用”了）

    

    通常而言，我们需要尽可能避免使用`npm unpublish`这种不友好操作，我们更推荐替代命令：`npm deprecate <pkg>[@<version>] <message>`。 使用这个命令，并不会在社区里撤销已有的包，但会在任何人尝试安装这个包的时候得到警告 例如：`npm deprecate egg '这个包我已经不再维护了哟～'`



- 发布beta版本

  不管是桌面应用，还是其它脚本应用，我们总是希望正式对外的东西，至少是经过测试的无重大缺陷的，因此发布beta版本，供小范围试用，是一种常见办法。那么我们能否可以补发beta版npm包？当然是可以的。

  

  默认情况下 `npm publish` 的时候 npm 会给当前版本打一个 tag 叫做 latest，表示这是最新的，而我们`npm install <pkg>`的时候，则默认拉取该版本。但是我们可以使用 `npm publish --tag <tag-name>` 来改变默认的 tag，使不知情用户无法拉取该版本。而知情用户下载使用该包时，需要指定tag，即`npm install <pkg>@<tag-name>`。

  ```
  npm publish --tag beta //publish
  
  npm install <pkg>@beta
  ```

  

  此外，我们也可以通过使用 `npm dist-tag add <package>@<version> tag` 来给某个已发布版本打 tag。

### 权限

npm允许通过scope组织私有包，通过team细化权限控制，npm官方仓储有两种类型的包，普通包和scope包

- 普通包特征:

只能公有，谁都可以下载使用

仅可以通过所有者(owner)进行权限控制，如果要允许某个用户修改或发布包，必须将该用户添加到包的所有者列表。添加到包所有者列表的用户具备所有的权限.

- scope包特征:

包名有两部组成，@scope/name, @后的为scope名,/后的才是具体的包名

可以控制公有和私有

细化的权限控制，比如可以创建团队,并赋予团队对包只读/修改的权限

#### owner

```
npm owner add <user> [<@scope>/]<pkg> # 将用户添加到包的所有者列表
npm owner rm <user> [<@scope>/]<pkg> # 从包的所有这列表中删除用户
npm owner ls [<@scope>/]<pkg> # 列出包的所有者
成为包的所有者的用户，将能够修改元数据(如标记弃用)，发布新版本,添加其他用户到包的所有者列表
```

#### t/team

```
npm team create <scope:team> # 创建团队
npm team destroy <scope:team> # 删除团队

npm team add <scope:team> <user> # 添加用户到团队
npm team rm <scope:team> <user> # 从团队中移除用户 

npm team ls <scope>|<scope:team> 列出团队/成员

npm team edit <scope:team>  用编辑器编辑团队信息
```

#### access

```
npm access public [<package>]  # 设置包开放
npm access restricted [<package>] # 设置包私有

npm access grant <read-only|read-write> <scope:team> [<package>] # 设置团队对包可以只读/允许修改
npm access revoke <scope:team> [<package>] # 从团队中收回包权限

npm access ls-packages [<user>|<scope>|<scope:team>]  # 列出用户/域/团队能够访问的包
npm access ls-collaborators [<package> [<user>]] # 列出包的权限信息
npm access edit [<package>] # 用编辑器编辑包权限
```
