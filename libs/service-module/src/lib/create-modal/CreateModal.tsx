import React from 'react'
import style from './createModal.module.scss'

interface IProps {
  close: () => void
}

const CreateModal: React.FC<IProps> = ({ close }) => {
  return (
    <div className={style['create-modal']}>
      <div className={style.header}>HEADER</div>
      <div onClick={close}>close</div>
    </div>
  )
}

export { CreateModal }
