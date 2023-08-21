import React from 'react'
import style from './createModal.module.scss'
import { ModalHeader } from './components/header'
import { TitleInput } from './components/title-input'
import { DescInput } from './components/desc-input'

interface IProps {
  close: () => void
}

const CreateModal: React.FC<IProps> = ({ close }) => {
  return (
    <div className={style['create-modal']}>
      <ModalHeader close={close} />
      <div className={style.content}>
        <TitleInput placeholder="事项标题" />
        <DescInput placeholder="背景信息/说明（可拖文件到这里）" />
      </div>
      <div className={style.footer}>footer</div>
    </div>
  )
}

export { CreateModal }
