import React from 'react'
import cs from 'classnames'
import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import styles from './index.module.scss'
import { useScheduleStore } from '../../../../../store/useScheduleStore'

interface IPROPParentInfo {
  taskId: string
  isDarkMode: boolean
}

function getType(task?: IScheduleTask) {
  if (!task) {
    return {}
  }

  let _type = ''
  let _name = ''

  if (task.project_name) {
    _type = '项目'
    _name = task.project_name
    //2.1 PC-4731 日视图里子孙事项有所属项目时，上级结构优先显示项目，其次再是顶级父事项
  } else if (
    task.parent_name &&
    task.matter_type &&
    [
      ScheduleTaskConst.MatterType.meeting,
      ScheduleTaskConst.MatterType.todo,
      ScheduleTaskConst.MatterType.matter
    ].includes(task.matter_type)
  ) {
    _type = '事项'
    _name = task.parent_name
  }

  return {
    type: _type,
    name: _name
  }
}

const _ParentInfo: React.FC<IPROPParentInfo> = ({ taskId, isDarkMode }) => {
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
      className={cs(styles.parentInfo, {
        [styles.darkMode]: isDarkMode
      })}
    >
      {`${type}：${name}`}
    </div>
  )
}

export const ParentInfo = React.memo(_ParentInfo)
