import React from 'react'
import style from './createModal.module.scss'
import { ModalHeader } from './components/header'

interface IProps {
  close: () => void
}

const CreateModal: React.FC<IProps> = ({ close }) => {
  return (
    <div className={style['create-modal']}>
      <ModalHeader close={close} />
      <div className={style.content}>content</div>
      <div className={style.footer}>footer</div>
    </div>
  )
}

export { CreateModal }
