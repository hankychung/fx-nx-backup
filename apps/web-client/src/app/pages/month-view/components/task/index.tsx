import React from 'react'
import style from './index.module.scss'

const Task: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div
      className={style['task-item']}
      draggable
      onDragStart={(event) => {
        // 用于去除拖拽时箭头上的加号图标
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.dropEffect = 'move'

        // 创建并配置 Canvas 元素
        const canvas: HTMLCanvasElement = document.createElement('canvas')
        canvas.width = 100
        canvas.height = 100

        // 在 Canvas 上绘制正方形
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = 'red'
          ctx.fillRect(0, 0, 100, 100)
        }

        // 将 Canvas 的内容转换为图像
        const img: HTMLImageElement = new Image()
        img.src = canvas.toDataURL()

        console.log('check src', img.src)

        // 设置拖拽时的图像
        event.dataTransfer.setDragImage(img, 0, 0) // 图像中心作为拖拽点
      }}
    >
      {title}
    </div>
  )
}

export { Task }
