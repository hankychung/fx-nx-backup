# FlyeleNx

## Nx 文档

Visit the [Nx Documentation](https://nx.dev) to learn more.

## 开发流程

命令启动：`yarn serve`

## 创建新应用

`npx nx g @nrwl/react:app your-app`

## 创建 ui 库

`npx nx g @nrwl/react:lib your-ui-project`

## 在指定 ui 库中创建组件

```
npx nx g @nrwl/react:component banner --project=your-ui-project --export
```

## 创建工具类库

`npx nx g @nrwl/js:lib utils`

## build

```
npx nx build web
```
