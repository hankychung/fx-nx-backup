import React, { useLayoutEffect, useMemo, useState } from 'react'
import style from './index.module.scss'
import { CreateType, QuadrantValue } from '@flyele-nx/constant'
import { PrioritySelector } from './components/priority-selector'
import { PriorityIcon } from '@flyele-nx/icon'
import { IScheduleTask } from '@flyele-nx/types'

interface IProps {
  createType?: CreateType
  task?: IScheduleTask
  priority_level?: QuadrantValue
  handlePrioritySelectorChange: (val: QuadrantValue) => void
}

export const PriorityPicker: React.FC<React.PropsWithChildren<IProps>> = (
  props
) => {
  const {
    createType = CreateType.MATTER,
    // task,
    priority_level = QuadrantValue.no_important_no_urgent,
    handlePrioritySelectorChange
  } = props

  // 是否小工具
  const isTool = useMemo(() => {
    return [CreateType.TOOl_MEETING, CreateType.TOOL_TODO].includes(createType)
  }, [createType])

  if (
    (createType !== CreateType.MEETING && !isTool) ||
    createType === CreateType.APP_MATTER
  ) {
    return (
      <PrioritySelector
        defaultValue={priority_level}
        onChange={handlePrioritySelectorChange}
      />
    )
  }
  return (
    <PrioritySelector
      defaultValue={priority_level}
      onChange={handlePrioritySelectorChange}
      content={({ bgColor: backgroundColor, color, text }) => (
        <div className={style.priority} style={{ backgroundColor, color }}>
          <PriorityIcon color={color} />
          <span>{text}</span>
        </div>
      )}
    />
  )
}
