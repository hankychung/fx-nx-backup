import { Close } from '@flyele-nx/icon'
import css from './index.module.scss'

interface IProps {
  onClose?: () => void
  modalTitle?: string
}

export const Header = (props: IProps) => {
  const { onClose, modalTitle } = props

  return (
    <header className={css.header}>
      {/**  标题 **/}
      <div className={css.title}>
        <p>{modalTitle || '邀请协作人'}</p>
      </div>

      {/** 关闭按钮 **/}
      <div className={css.close} onClick={onClose}>
        <Close />
      </div>
    </header>
  )
}
