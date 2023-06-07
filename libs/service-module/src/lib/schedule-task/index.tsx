import { FC, memo } from 'react'
import { IScheduleTask } from '@flyele-nx/service'
import style from './index.module.scss'

interface IProps {
  data: IScheduleTask
  date: string
}

const _ScheduleTask: FC<IProps> = ({ data, date }) => {
  return (
    <div className={style['schedule-task']}>
      <div className={style.title}>
        <div>{data.title}</div>
        {data.has_child && <div>open</div>}
      </div>
    </div>
  )
}

export const ScheduleTask = memo(_ScheduleTask)
