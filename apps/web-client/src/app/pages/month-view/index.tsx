import React, { useMemo } from 'react'
import { generateMonthArr } from './utils/generateMonthArr'
import style from './index.module.scss'
import dayjs from 'dayjs'
import classNames from 'classnames'

const MonthView: React.FC = () => {
  const monthArr = useMemo(() => {
    return generateMonthArr(dayjs())
  }, [])

  return (
    <div className={style.calendar}>
      {monthArr.map((row, index) => (
        <div key={index} className={style.row}>
          {row.map((cell) => {
            const date = cell.format('YYYY-MM-DD')

            return (
              <div
                key={date}
                className={classNames(style.cell, 'dropzone')}
                draggable
                onDragStart={(event) => {
                  // 用于去除拖拽时箭头上的加号图标
                  event.dataTransfer.effectAllowed = 'move'
                  event.dataTransfer.dropEffect = 'move'

                  // 创建并配置 Canvas 元素
                  const canvas: HTMLCanvasElement =
                    document.createElement('canvas')
                  canvas.width = 100
                  canvas.height = 100

                  // 在 Canvas 上绘制正方形
                  const ctx: CanvasRenderingContext2D | null =
                    canvas.getContext('2d')
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
                onDragEnter={(event) => {
                  event.preventDefault()
                  console.log('drag enter', event)
                  // highlight potential drop target when the draggable element enters it
                  if ((event.target as any).classList.contains('dropzone')) {
                    ;(event.target as any).classList.add(style.dragover)
                  }
                }}
                onDragLeave={(event) => {
                  event.preventDefault()
                  // reset background of potential drop target when the draggable element leaves it
                  if ((event.target as any).classList.contains('dropzone')) {
                    ;(event.target as any).classList.remove(style.dragover)
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  ;(e.target as any).classList.remove(style.dragover)
                }}
                onDragOver={(e) => {
                  // 防止默认行为以允许放置
                  e.preventDefault()
                }}
              >
                {date}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export { MonthView }
