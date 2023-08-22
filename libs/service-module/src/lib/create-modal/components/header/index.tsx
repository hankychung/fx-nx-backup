import { Close } from '@flyele-nx/icon'
import style from './index.module.scss'

interface IProps {
  close: () => void
}

export const ModalHeader = ({ close }: IProps) => {
  return (
    <div className={style.header}>
      <div className={style.title}>模版：事项</div>
      <Close className={style.close} onClick={close} />
    </div>
  )
}
