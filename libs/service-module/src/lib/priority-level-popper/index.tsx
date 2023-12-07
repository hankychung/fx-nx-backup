import { I18N, isCN } from '@flyele-nx/i18n'
import React, { useMemo } from 'react'
import { FlyBasePopper } from '@flyele/flyele-components'
import { getQuadrantBeforeIcon } from './hook/useQuadrantBefore'
import { CheckIcon, RightArrowIcon } from '@flyele-nx/icon'
import styles from './index.module.scss'
import { TaskApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
import { globalNxController } from '@flyele-nx/global-processor'
import {
  QuadrantValue,
  MatterType,
  QuadrantText,
  Pub
} from '@flyele-nx/constant'

interface Props {
  task_id: string
  priority_level: QuadrantValue
  matter_type: MatterType
  close?: () => void
  onChange?: (level: QuadrantValue) => void
}

const QuadrantColor = {
  [QuadrantValue.important_urgent]: '#E65454',
  [QuadrantValue.important_no_urgent]: '#E69448',
  [QuadrantValue.urgent_no_important]: '#7E7FF8',
  [QuadrantValue.no_important_no_urgent]: '#989F9F'
}

export const PriorityLevelPopper = (props: Props) => {
  const { task_id, priority_level, matter_type, close, onChange } = props

  const changeLevel = useMemoizedFn((level: QuadrantValue) => {
    TaskApi.updateTask(
      { priority_level: level, matter_type: Number(matter_type) },
      task_id
    )
      .then(() => {
        globalNxController.showMsg({
          content: I18N.common.successfullyModified,
          msgType: '成功'
        })
        globalNxController.pubJsPublish(
          Pub.DB_INCREASE_01_READUX_AND_SQLITEDB,
          {
            task_id,
            diffObj: {
              task: {
                priority_level: level
              }
            },
            type: 'updateDetail'
          }
        )
        onChange?.(level)
      })
      .catch(() => {
        globalNxController.showMsg({
          content: I18N.common.modificationFailed,
          msgType: '错误'
        })
      })
      .finally(() => {
        close?.()
      })
  })

  const PriorityLevelMenu = useMemo(() => {
    return (
      <div className={styles.PriorityLevelPopper}>
        {Object.entries(QuadrantText)
          .reverse()
          .map(([key, value]) => {
            const level = Number(key) as QuadrantValue

            return (
              <div
                className={styles.item}
                key={key}
                onClick={() => changeLevel(level)}
                style={{ width: isCN ? '130px' : '200px' }}
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
      <div className={styles.priorityItem}>
        <span>{I18N.common.priority}</span>
        <RightArrowIcon color="#6A6A6A" style={{ marginRight: '8px' }} />
      </div>
    </FlyBasePopper>
  )
}
