# TypeScript

TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程

## 如何编译ts文件

我们可以直接使用ts-node来执行ts文件，或者使用tsc来将ts文件编译成js文件后在执行

### ts-node

```bash
$ npm i -g ts-node
$ npm install -g typescript
$ ts-node foo.ts
```

### tsc

```bash
$ npm i --save-dev typescript
$ npx tsc -p ./tsconfig.json
```

## 如何调试ts文件

本章介绍使用如何vscode来调试ts文件

```json
// launch.json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Current TS File",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/node_modules/ts-node/dist/bin.js",
            "args": [
                "${relativeFile}"
            ],
            "cwd": "${workspaceRoot}",
            "protocol": "inspector",
            "env": { "TS_NODE_PROJECT": "tsconfig.base.json" } // 使用该环境变量指定具体的tsconfig文件，默认为tsconfig.json
        }
    ]
  }
```
