import classNames from 'classnames'
import React from 'react'
import style from './index.module.scss'
import { Task } from '../task'

const DROP_ZONE = 'DROP_ZONE'

function findDropZone(dom: HTMLDivElement): HTMLDivElement | null {
  if (dom.classList.contains(DROP_ZONE)) {
    return dom
  }

  const parent = dom.parentNode as HTMLDivElement

  if (parent.classList.contains('calendar-wrapper')) return null

  return findDropZone(parent)
}

function clearHover() {
  document.querySelectorAll(`.${DROP_ZONE}`).forEach((i) => {
    i.classList.remove(style.dragover)
  })
}

function handleDragOverStyle(
  event: React.DragEvent<HTMLDivElement>,
  type: 'add' | 'remove'
) {
  event.preventDefault()
  const dom = findDropZone(event.target as HTMLDivElement)

  console.log('dom ?', dom, event.target, type)

  if (!dom) return

  if (type === 'add') {
    clearHover()
    dom.classList.add(style.dragover)
  }
}

const Cell: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div
      key={date}
      className={classNames(style.cell, DROP_ZONE)}
      onDragEnter={(event) => {
        console.log('check event', event)
        handleDragOverStyle(event, 'add')
      }}
      onDragLeave={(event) => {
        handleDragOverStyle(event, 'remove')
      }}
      onDrop={(e) => {
        handleDragOverStyle(e, 'remove')
        clearHover()
      }}
      onDragOver={(e) => {
        // 防止默认行为以允许放置
        e.preventDefault()
      }}
    >
      {date}

      <div>
        {['aksdjh', 'oaejdlakd', 'elkjfalekfj'].map((i) => {
          return <Task title={i} key={i} />
        })}
      </div>
    </div>
  )
}

export { Cell }
