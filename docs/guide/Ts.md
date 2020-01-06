---
sidebarDepth: 3
---

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

## TypeScript 知识点收集

本章介绍一些编写TS代码中比较重要的知识点

### 泛型

个人简单理解泛型就是让我们可以像函数一样接收一个参数来动态的设置类型，本节收集整理在泛型的使用过程中的一些高级用法

#### 泛型约束

使得Foo类型传入的对象必须包含在接口Initial的属性之中

```ts
interface Initial {
    foo:string
}

type Foo <T extends Initial> = {
    [key in keyof T]: T[key]
}

type Bar = Foo<{foo:string}>
```

#### 参数扩展

通过此方式，我们可以设置一些默认的接口参数，然后通过泛型的方式，来让调用者可以扩展默认的接口

```ts
interface Initial {
    foo:string
}

type Foo <T = {}> = T & {
    [key in keyof Initial]: Initial[key]
}

type Bar = Foo<{bar:string}>
```

#### 复合类型转Map

```ts
type Union = 'a' | 'b' | 'c'

type UnionToMap = {
    [key in Union]: string
}
```

#### Map转复合类型

```ts
type MyMap = {
    foo:string
    bar:number
}

type MapToUnion = MyMap[keyof MyMap] // string|number
```

#### 类型转换为Optional

```ts
interface Foo {
    foo:string
    bar:string
}

type Optional <T>= { [key in keyof T]?: T[key] }

type OptionalFoo = Optional<Foo>
```

#### 类型转换为readonly

```ts
interface Foo {
    foo:string
    bar:string
}

type Optional <T>= { readonly [key in keyof T]: T[key] }

type OptionalFoo = Optional<Foo>
```

#### 接收多个参数，Union转Map

```ts
type Foo<T extends keyof any, O> = { [key in T]: O}

type Size = 'small' | 'default' | 'big'

type SizeMap = Foo<Size, number>

```

#### 递归添加readonly

```ts
type DeepReadony<T> = {
    readonly [P in keyof T]: DeepReadony<T[P]>
}

interface SomeObject {
  a: {
    b: {
      c: number;
    };
  };
}

const obj: DeepReadony<SomeObject> = { a: { b: { c: 2 } } };

```