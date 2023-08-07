/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-07-20 16:17:54
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-20 17:49:44
 * @FilePath: /fx-nx/libs/service-module/src/lib/gantt/components/task-list/task-list-table.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useMemo } from 'react'
import styles from './task-list-table.module.css'
import { Task } from '@flyele-nx/types'
import { Title } from '../../Row/Title'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import dayjs from 'dayjs'
import { getId, getTimeTxt } from '../../utils'
import { useGanttList } from '../../hooks/useScheduleList'
import cs from 'classnames'
const localeDateStringCache: any = {}
const toLocaleDateStringFactory =
  (locale: string) =>
  (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
    const key = date.toString()
    let lds = localeDateStringCache[key]
    if (!lds) {
      lds = date.toLocaleDateString(locale, dateTimeOptions)
      localeDateStringCache[key] = lds
    }
    const data = dayjs(date).format('YYYY年MM月DD日 HH:mm')

    return data
  }
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

export const TaskListTableDefault: React.FC<{
  rowHeight: number
  rowWidth: string
  fontFamily: string
  fontSize: string
  locale: string
  tasks: Task[]
  selectedTaskId: string
  setSelectedTask: (taskId: string) => void
  onExpanderClick: (task: Task) => void
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick
}) => {
  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    [locale]
  )
  const { batchUpdateHoverId, hoverId, activeCell, batchUpdateActiveCell } =
    useGanttList()
  const userId = useUserInfoStore((state) => state.userInfo.user_id)

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize
      }}
    >
      {tasks.map((t) => {
        const id = getId(t)
        const taskId = t?.task_id + (t?.repeat_id ? t?.repeat_id : '')

        return (
          <div
            className={styles.taskListTableRow}
            style={{
              height: rowHeight,
              background: id === hoverId ? 'rgba(29, 210, 193, 0.05)' : ''
            }}
            key={`${t.id}row`}
            onMouseEnter={() => {
              batchUpdateHoverId(id)
            }}
          >
            <div
              className={cs(styles.taskListCell, {
                [styles.taskListCellactive]: activeCell === `${taskId}-title`
              })}
              style={{
                minWidth: 186,
                maxWidth: 186,
                paddingLeft: 16
              }}
              onClick={() => {
                batchUpdateActiveCell(`${taskId}-title`)
              }}
            >
              <Title data={t} userId={userId} />
            </div>

            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
                paddingLeft: 12
              }}
            >
              {getTimeTxt(t, true)}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
                paddingLeft: 12,
                borderRight: 'none'
              }}
            >
              {getTimeTxt(t, false)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
