import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import cs from 'classnames'
import { IScheduleTask } from '@flyele-nx/types'
import styles from './index.module.scss'
import { useScheduleStore } from '@flyele-nx/global-processor'
import { MatterType } from '@flyele-nx/constant'

interface IPROPParentInfo {
  taskId: string
  isDarkMode?: boolean
  opacity?: boolean
}

function getType(task?: IScheduleTask) {
  if (!task) {
    return {}
  }

  let _type = ''
  let _name = ''

  if (task.project_name) {
    _type = I18N.common.project
    _name = task.project_name
    //2.1 PC-4731 日视图里子孙事项有所属项目时，上级结构优先显示项目，其次再是顶级父事项
  } else if (
    task.parent_name &&
    task.matter_type &&
    [MatterType.meeting, MatterType.todo, MatterType.matter].includes(
      task.matter_type
    )
  ) {
    _type = I18N.common.task
    _name = task.parent_name
  }

  return {
    type: _type,
    name: _name
  }
}

const _ParentInfo: React.FC<IPROPParentInfo> = ({
  taskId,
  isDarkMode,
  opacity
}) => {
  const task = useScheduleStore((state) => state.taskDict[taskId])
  const { type, name } = getType(task)

  // const groupId = useContext(GroupIdCtx)

  // 如果存在 项目分组里面 存在id，不显示项目title
  // if (type === '项目' && groupId) {
  //   return null
  // }

  if (!type || !name) {
    return null
  }
  return (
    <div
      className={cs(styles.parentInfo)}
      style={{
        color: opacity
          ? isDarkMode
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(51, 51, 51, 0.8)'
          : isDarkMode
          ? '#92929d'
          : '#6a6a6a'
      }}
    >
      {`${type}：${name}`}
    </div>
  )
}

export const ParentInfo = React.memo(_ParentInfo)
