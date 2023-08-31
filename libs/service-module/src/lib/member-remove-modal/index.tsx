import { Modal } from 'antd'
import style from './index.module.scss'
import { MemberRemoveModal } from './member-remove-modal'

interface IMemberRemoveModalProps {
  defaultTakers?: string[]
  onConfirm?: (takers: string[]) => void
}

class MemberRemoveModalHandler {
  private modal: ReturnType<typeof Modal.info> | null = null

  open(options: IMemberRemoveModalProps = {}) {
    this.modal?.destroy()

    this.modal = Modal.info({
      width: 640,
      content: <MemberRemoveModal onClose={() => this.close()} {...options} />,
      footer: null,
      icon: null,
      wrapClassName: style['modal-wrapper'],
      maskClosable: false
    })
  }

  close() {
    this.modal?.destroy()
    this.modal = null
  }
}

export const memberRemoveModal = new MemberRemoveModalHandler()
