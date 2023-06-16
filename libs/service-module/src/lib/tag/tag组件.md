### TagAddButton

只是一个普通的 “+” 按钮

---

### TagWidget

只有一个普通的标签

---

### TagWidgetBar

集成了 标签组合 “+” 按钮 可以调节间距

---

### TagMatterBar

创建事项专用组件

---

### TagNotEditBar

会议、待办 专用组件用于跳去子窗口（事项详情）修改标签

---

### TagInput

只是一个添加标签的输入框

---

### TagEditArea

整个选择标签的模态框，进去默认请求已有的标签，能够选择标签，通过 onSure 获取选择数据

```tsx
import { TagEditAreaController } from './controller'
import TagEditArea from './index'
// 控制器外部定义或者包裹在 ref
const controller = new TagEditAreaController()

const render = () => {
  useEffect(() => {
    return () => {
      // 必须！ 防止内存泄漏
      controller.dispose()
    }
  }, [])

  return <TagEditArea controller={controller} />
}
```

---

### TagBindEditArea

整体使用与 TagEditArea 相同，内置的 onSure 用于绑定标签。

---

### TagCombined

一套组合，TagWidgetBar & TagBindEditArea 用于事项详情编辑标签。

---

### TagUtils

一些和标签相关的通用工具方法

## TagSizer

标签筛选器
