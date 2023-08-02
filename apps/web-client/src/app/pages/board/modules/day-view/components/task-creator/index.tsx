import { FC } from 'react'
import style from './index.module.scss'
import { ReactComponent as CompletionBox } from '../../../../../../../assets/image/create/completionBox.svg'
export const TaskCreator: FC = () => {
  return (
    <div className={style['task-creator']}>
      <div className={style.plaholder}>
        <div className={style.completion_box}>
          <CompletionBox width={14} height={14} />
        </div>
        <div className={style.quick}>快速创建…</div>
      </div>
    </div>
  )
}
