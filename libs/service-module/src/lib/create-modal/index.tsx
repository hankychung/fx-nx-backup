import { Modal } from 'antd'
import { CreateModal } from './CreateModal'
import style from './createModal.module.scss'

class CreateModalHandler {
  private modal: ReturnType<typeof Modal.info> | null = null

  open() {
    this.modal?.destroy()

    this.modal = Modal.info({
      width: 780,
      content: <CreateModal />,
      footer: null,
      icon: null,
      wrapClassName: style['modal-wrapper']
    })
  }

  close() {
    this.modal?.destroy()
  }
}

export const createModal = new CreateModalHandler()

createModal.open()
