import React, { ReactChild, useEffect, useRef, useState } from 'react'
import { addToDate } from '../../helpers/date-helper'
import styles from './grid.module.css'
import { Task } from '@flyele-nx/types'
import { useGanttList } from '../../hooks/useScheduleList'
import cs from 'classnames'
import { useMemoizedFn } from 'ahooks'
import { zustandUtils } from '@flyele-nx/zustand-store'
import dayjs from 'dayjs'
export type GridBodyProps = {
  tasks: Task[]
  dates: Date[]
  svgWidth: number
  rowHeight: number
  columnWidth: number
  todayColor: string
  rtl: boolean
  setTodayLine?: (data: ReactChild[]) => void
}
export const GridBody: React.FC<GridBodyProps> = ({
  tasks,
  dates,
  rowHeight,
  svgWidth,
  columnWidth,
  todayColor,
  rtl,
  setTodayLine
}) => {
  const { hoverId, batchUpdateHoverId } = useGanttList()
  const domRef = useRef<SVGRectElement>(null)
  const [gridRows, setGridRows] = useState<ReactChild[]>([])
  const [rowLines, setRowLines] = useState<ReactChild[]>([])
  const [todayLine, setTodayLines] = useState<ReactChild[]>([])
  const [ticks, setTicks] = useState<ReactChild[]>([])
  const [holidays, setHolidays] = useState<ReactChild[]>([])

  const init = useMemoizedFn(() => {
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

    for (const task of tasks) {
      const id = zustandUtils.getProjectKey(task)
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
    const holidays: ReactChild[] = []
    let today: ReactChild = <rect />
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i]

      if (i !== 0) {
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
          setTodayLines([
            <line
              key={date.getTime()}
              x1={tickX}
              y1={0}
              x2={tickX}
              y2={y}
              className={styles.gridTodayTick}
            />
          ])
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
          <rect
            x={tickX}
            y={0}
            width={columnWidth}
            height={y}
            fill={'rgba(0,0,0,0)'}
          />
        )
      }
      if (getWeek(dates[i])) {
        holidays.push(
          <rect
            key={date.getTime()}
            x={tickX}
            y={0}
            width={columnWidth}
            height={y}
            fill={'#f8f8f8'}
          />
        )
      } else {
        holidays.push(
          <rect
            key={date.getTime()}
            x={tickX}
            y={0}
            width={columnWidth}
            height={y}
            fill={'#fff'}
          />
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

    setGridRows(gridRows)
    setRowLines(rowLines)
    setTicks(ticks)
    setHolidays(holidays)
  })
  useEffect(() => {
    init()
  }, [init, tasks, dates, hoverId])
  useEffect(() => {
    setTodayLine && setTodayLine(todayLine)
  }, [setTodayLine, todayLine, columnWidth])

  const getWeek = useMemoizedFn((date) => {
    const datas = dayjs(date).day()
    // const week = ['日', '一', '二', '三', '四', '五', '六']
    return datas === 0 || datas === 6
  })

  return (
    <g className="gridBody">
      <g>{holidays}</g>
      <g className="rows">{gridRows}</g>
      <g className="rowLines">{rowLines}</g>
      <g className="ticks">{ticks}</g>
    </g>
  )
}
