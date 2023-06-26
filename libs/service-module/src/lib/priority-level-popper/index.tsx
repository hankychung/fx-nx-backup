import React, { useMemo } from 'react'
import { FlyBasePopper } from '@flyele/flyele-components'
import { getQuadrantBeforeIcon } from './hook/useQuadrantBefore'
import { CheckIcon } from '@flyele-nx/icon'
import styles from './index.module.scss'
import { ScheduleTaskConst, TaskApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
import { useMessage } from '@flyele-nx/ui'

interface Props {
  task_id: string
  priority_level: ScheduleTaskConst.QuadrantValue
  matter_type: ScheduleTaskConst.MatterType
  close?: () => void
  onChange?: (level: ScheduleTaskConst.QuadrantValue) => void
}

const QuadrantColor = {
  [ScheduleTaskConst.QuadrantValue.important_urgent]: '#E65454',
  [ScheduleTaskConst.QuadrantValue.important_no_urgent]: '#E69448',
  [ScheduleTaskConst.QuadrantValue.urgent_no_important]: '#7E7FF8',
  [ScheduleTaskConst.QuadrantValue.no_important_no_urgent]: '#989F9F'
}

export const PriorityLevelPopper = (props: Props) => {
  const { task_id, priority_level, matter_type, close, onChange } = props
  const [showMsg] = useMessage()

  const changeLevel = useMemoizedFn(
    (level: ScheduleTaskConst.QuadrantValue) => {
      TaskApi.updateTask(
        { priority_level: level, matter_type: Number(matter_type) },
        task_id
      )
        .then(() => {
          showMsg({ content: '修改成功', msgType: '成功' })
          // PubSub.publish(Pubs.DB_INCREASE_01_READUX_AND_SQLITEDB, {
          //   task_id,
          //   diffObj: {
          //     task: {
          //       priority_level: level
          //     }
          //   },
          //   type: 'updateDetail'
          // })
          onChange?.(level)
        })
        .catch(() => {
          showMsg({ content: '修改失败', msgType: '错误' })
        })
        .finally(() => {
          close?.()
        })
    }
  )

  const PriorityLevelMenu = useMemo(() => {
    return (
      <div className={styles.PriorityLevelPopper}>
        {Object.entries(ScheduleTaskConst.QuadrantText)
          .reverse()
          .map(([key, value]) => {
            const level = Number(key) as ScheduleTaskConst.QuadrantValue

            return (
              <div
                className={styles.item}
                key={key}
                onClick={() => changeLevel(level)}
              >
                <div className={styles.title}>
                  {getQuadrantBeforeIcon({ type: level })}
                  <div
                    className={styles.titleText}
                    style={{ color: QuadrantColor[level] }}
                  >
                    {value}
                  </div>
                </div>
                {priority_level === level ? (
                  <div className={styles.checkIcon}>
                    <CheckIcon width={14} height={14} color="#1DD2C1" />
                  </div>
                ) : (
                  <div />
                )}
              </div>
            )
          })}
      </div>
    )
  }, [changeLevel, priority_level])

  return (
    <FlyBasePopper
      needInheritSize={false}
      trigger="hover"
      placement="right-start"
      showArrow={false}
      content={PriorityLevelMenu}
      zIndex={9999}
    >
      <span>优先级</span>
    </FlyBasePopper>
  )
}
