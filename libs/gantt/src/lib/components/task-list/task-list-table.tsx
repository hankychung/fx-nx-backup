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
    return lds
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
        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight }}
            key={`${t.id}row`}
          >
            <Title data={t} userId={userId} />
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth
              }}
            >
              &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth
              }}
            >
              &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
            </div>
          </div>
        )
      })}
    </div>
  )
}
