import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { makeDraggingItem } from '../../utils/makeDraggingItem'

const Task: React.FC<{ title: string }> = ({ title }) => {
  const [draggingImg, setDraggingImg] = useState<HTMLImageElement>()

  useEffect(() => {
    setDraggingImg(makeDraggingItem({ title }))
  }, [title])

  return (
    <div
      className={style['task-item']}
      draggable
      onDragStart={(event) => {
        // 用于去除拖拽时箭头上的加号图标
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.dropEffect = 'move'

        // 设置拖拽时的图像
        draggingImg && event.dataTransfer.setDragImage(draggingImg, 0, 10) // 图像中心作为拖拽点
      }}
    >
      {title}
    </div>
  )
}

export { Task }
