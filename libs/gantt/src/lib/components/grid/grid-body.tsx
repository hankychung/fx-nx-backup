import React, { ReactChild, useRef } from 'react'
import { addToDate } from '../../helpers/date-helper'
import styles from './grid.module.css'
import { Task } from '@flyele-nx/types'
import { useGanttList } from '../../hooks/useScheduleList'
import { getId } from '../../utils'
import cs from 'classnames'
export type GridBodyProps = {
  tasks: Task[]
  dates: Date[]
  svgWidth: number
  rowHeight: number
  columnWidth: number
  todayColor: string
  rtl: boolean
}
export const GridBody: React.FC<GridBodyProps> = ({
  tasks,
  dates,
  rowHeight,
  svgWidth,
  columnWidth,
  todayColor,
  rtl
}) => {
  const { hoverId, batchUpdateHoverId } = useGanttList()
  let y = 0
  const gridRows: ReactChild[] = []
  const rowLines: ReactChild[] = [
    <line
      key="RowLineFirst"
      x="0"
      y1={0}
      x2={svgWidth}
      y2={0}
      className={styles.gridRowLine}
    />
  ]
  const domRef = useRef<SVGRectElement>(null)
  for (const task of tasks) {
    const id = getId(task)
    gridRows.push(
      <rect
        onMouseEnter={() => {
          batchUpdateHoverId(id)
        }}
        ref={domRef}
        key={'Row' + task.id}
        x="0"
        y={y}
        width={svgWidth}
        height={rowHeight}
        className={cs(styles.gridRow, {
          [styles.gridHoverRow]: id === hoverId
        })}
      />
    )
    rowLines.push(
      <line
        key={'RowLine' + task.id}
        x="0"
        y1={y + rowHeight}
        x2={svgWidth}
        y2={y + rowHeight}
        className={styles.gridRowLine}
      />
    )
    y += rowHeight
  }

  const now = new Date()
  let tickX = 0
  const ticks: ReactChild[] = []
  let today: ReactChild = <rect />
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]

    if (i !== 0) {
      console.log(
        i + 1 !== dates.length &&
          date.getTime() < now.getTime() &&
          dates[i + 1].getTime() >= now.getTime()
      )

      if (
        (i + 1 !== dates.length &&
          date.getTime() > now.getTime() &&
          dates[i - 1].getTime() <= now.getTime()) ||
        // if current date is last
        (i !== 0 &&
          i + 1 === dates.length &&
          date.getTime() < now.getTime() &&
          addToDate(
            date,
            date.getTime() - dates[i - 1].getTime(),
            'millisecond'
          ).getTime() >= now.getTime())
      ) {
        ticks.push(
          <line
            key={date.getTime()}
            x1={tickX}
            y1={0}
            x2={tickX}
            y2={y}
            className={styles.gridTodayTick}
          />
        )
        // return
      } else {
        ticks.push(
          <line
            key={date.getTime()}
            x1={tickX}
            y1={0}
            x2={tickX}
            y2={y}
            className={styles.gridTick}
          />
        )
      }
    }
    if (
      (i + 1 !== dates.length &&
        date.getTime() < now.getTime() &&
        dates[i + 1].getTime() >= now.getTime()) ||
      // if current date is last
      (i !== 0 &&
        i + 1 === dates.length &&
        date.getTime() < now.getTime() &&
        addToDate(
          date,
          date.getTime() - dates[i - 1].getTime(),
          'millisecond'
        ).getTime() >= now.getTime())
    ) {
      today = (
        <rect x={tickX} y={0} width={columnWidth} height={y} fill={'#fff'} />
      )
    }
    // rtl for today
    if (
      rtl &&
      i + 1 !== dates.length &&
      date.getTime() >= now.getTime() &&
      dates[i + 1].getTime() < now.getTime()
    ) {
      today = (
        <rect
          x={tickX + columnWidth}
          y={0}
          width={columnWidth}
          height={y}
          fill={todayColor}
        />
      )
    }
    tickX += columnWidth
  }
  return (
    <g className="gridBody">
      <g className="rows">{gridRows}</g>
      <g className="rowLines">{rowLines}</g>
      <g className="ticks">{ticks}</g>
      <g className="today">{today}</g>
    </g>
  )
}
