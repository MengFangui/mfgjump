# @jumpjs-cli

## 安装

```shell
npm i -g @jumpjs-cli
```

## 创建项目

```shell
jump create my-project
```

如创建的项目不需要支持 h5，选择 `仅小程序` 否则。若需要支持 h5，选择 `小程序和 H5`。

## 开发项目

```shell
jump serve
```

可通过 `-t` 设置编译目标，可选值为 `swan` | `wx` | `h5`，默认 `swan`；

## 构建项目（用于上线）

```shell
jump build
```

可通过 `-t` 设置编译目标，可选值为 `swan` | `wx` | `h5`，默认 `swan`；

## 升级当前项目 Jump 相关依赖库

```shell
jump update
```

相当于 `npm update`。

可指定 `-f` 来升级到最新版本，

```shell
jump update -f
```

相当于 `npm install xxx@latest`。