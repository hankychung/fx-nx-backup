import React, { useMemo, useState } from 'react'
import { Tree, Input, Button, message } from 'antd'
import { v4 } from 'uuid'
import { ChildMatterData } from '@flyele-nx/types'
import { findChildMatter, getAllKeys } from './utils'

export const ChildMatter: React.FC = () => {
  const [treeData, setTreeData] = useState<ChildMatterData[]>([
    { key: '1', matterTitle: '根节点', focus: false, level: 0 }
  ])

  // 展开所有
  const expandedKeys = useMemo(() => getAllKeys(treeData, 'key'), [treeData])

  // 给这棵树添加子节点
  function addChild(parentKey: string) {
    const [parent] = findChildMatter(treeData, parentKey)
    if (!parent) {
      message.error('父节点不存在')
      console.error('父节点不存在')
      return
    }
    if (!parent?.children) {
      parent.children = []
    }
    parent.children.push({
      key: v4(),
      matterTitle: '',
      focus: false,
      level: parent.level + 1,
      parent: parent
    })
    setTreeData([...treeData])
  }

  // 添加兄弟节点
  function addSibling(currentKey: string) {
    const [current] = findChildMatter(treeData, currentKey)
    if (!current?.parent) {
      treeData.push({
        key: v4(),
        matterTitle: '',
        focus: false,
        level: 0
      })
    } else {
      current?.parent?.children?.push({
        key: v4(),
        matterTitle: '',
        focus: false,
        level: current.level
      })
    }

    setTreeData([...treeData])
  }

  // 更新任意一个节点的数据
  const updateData = (key: string, newData: Partial<ChildMatterData>) => {
    const [current] = findChildMatter(treeData, key)
    if (!current) {
      message.error('节点不存在')
      console.error('节点不存在')
      return
    }
    Object.assign(current, newData)
    setTreeData([...treeData])
  }

  return (
    <Tree
      treeData={treeData}
      expandedKeys={expandedKeys}
      titleRender={(data) => {
        return (
          <div style={{ display: 'flex' }}>
            <Input
              value={data.matterTitle}
              onChange={(e) =>
                updateData(data.key, { matterTitle: e.target.value })
              }
              onPressEnter={() => addSibling(data.key)}
            />
            <Button onClick={() => addChild(data.key)}>+</Button>
          </div>
        )
      }}
    />
  )
}
