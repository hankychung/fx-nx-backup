import React, { useEffect, useMemo, useState } from 'react'
import cs from 'classnames'
import styles from './index.module.scss'
import { getRepeatTxt } from '../../../../utils'
import { useScheduleStore } from '../../../../../store/useScheduleStore'
import { useMemoizedFn } from 'ahooks'
import { RepeatIcon, WorkflowBlueIcon } from '@flyele-nx/icon'

interface IPROPWorkflow {
  taskId: string
  isDarkMode?: boolean
  opacity?: boolean
}

export const Workflow: React.FC<IPROPWorkflow> = ({
  taskId,
  isDarkMode = false,
  opacity
}) => {
  const task = useScheduleStore((state) => state.taskDict[taskId])
  const [objTxt, setObjTxt] = useState<{ t_l: string; t_r: string }>({
    t_l: '',
    t_r: ''
  })

  // 需要显示的字段
  const getShowObjTxt = useMemoizedFn(async () => {
    let obj = {
      t_l: '',
      t_r: ''
    }

    if (!task) {
      setObjTxt(obj)
      return
    }
    const { application_name, flow_step_name, complete_at } = task

    if (isFlow && application_name) {
      obj.t_l = application_name
      obj.t_r = flow_step_name
        ? complete_at
          ? '工作流已完成'
          : `当前步骤：${flow_step_name}`
        : ''
    } else if (isRepeat) {
      obj = await getRepeatTxt(task)
    }
    setObjTxt(obj)
  })

  // 是否工作流类型
  const isFlow = useMemo(
    () => task?.application_name || task?.flow_step_name,
    [task]
  )

  // 是否循环类型
  const isRepeat = useMemo(() => !!task?.repeat_type, [task])

  // 需要显示的字段
  useEffect(() => {
    getShowObjTxt()
  }, [getShowObjTxt, isFlow, isRepeat, task])

  if (!isFlow && !isRepeat) {
    return null
  }

  return (
    <div
      className={cs(styles.workflow, { [styles.darkMode]: isDarkMode })}
      style={{
        backgroundColor: opacity ? 'unset' : isDarkMode ? '#383B48' : '#fafafa'
      }}
    >
      {isFlow && (
        <div className={cs(styles.icon)}>
          <WorkflowBlueIcon width={16} height={16} />
        </div>
      )}
      {isRepeat && (
        <div className={cs(styles.repeat_icon)}>
          <RepeatIcon width={16} height={16} />
        </div>
      )}
      <span
        className={styles.appName}
        style={{
          color: opacity
            ? isDarkMode
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(51, 51, 51, 0.6)'
            : isDarkMode
            ? '#92929d'
            : '#8f8f8f'
        }}
      >
        {objTxt.t_l}
      </span>
      <strong className={cs(styles.currentStep, { [styles.blue]: isFlow })}>
        {objTxt.t_r}
      </strong>
    </div>
  )
}
