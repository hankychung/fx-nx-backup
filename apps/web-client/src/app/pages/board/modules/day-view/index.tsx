import { FC } from 'react'
import style from './index.module.scss'
import { Schedule } from './components/schedule'
import { Mood } from './components/mood'
import { TaskCreator } from './components/task-creator'

export const DayView: FC = () => {
  return (
    <div className={style.dayview}>
      {/* left */}
      <div className={style.lft}>
        <Mood />
        <TaskCreator />
        <Schedule />
      </div>

      {/* right */}
      <div>rgt</div>
    </div>
  )
}
