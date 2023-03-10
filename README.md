# FlyeleNx

## Nx 文档

Visit the [Nx Documentation](https://nx.dev) to learn more.

## 开发流程

命令启动：`yarn serve`

## 创建新应用

`yarn nx g @nrwl/react:app your-app`

## 创建 ui 库

`yarn nx g @nrwl/react:lib your-ui-project`

## 在指定 ui 库中创建组件

```
yarn nx g @nrwl/react:component banner --project=your-ui-project --export
```

## 创建工具类库

`yarn nx g @nrwl/js:lib utils`

## build

```
yarn nx build web
```

## 注意事项

- 引用的所有图标/图标，都用 svg 文件，并且以 ReactComponent 形式引入(https://www.notion.so/33682717e14847fcb6ffed8ebf4bb89c?pvs=4)

  ```
  import { ReactComponent as TargetIcon } from "./assets/targetIcon.svg";
  ```
