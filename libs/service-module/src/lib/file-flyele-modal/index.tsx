import { Modal } from 'antd'
import { FileFlyeleModal } from './file-flyele-modal'
import style from './file-flyele-modal.module.scss'
import { FlyDoc } from '@flyele-nx/types'

class FileFlyeleModalHandler {
  private modal: ReturnType<typeof Modal.info> | null = null

  open(options: { onConfirm?: (result: FlyDoc[]) => void }) {
    this.modal?.destroy()

    this.modal = Modal.info({
      width: 640,
      footer: null,
      icon: null,
      maskClosable: true,
      wrapClassName: style['modal-wrapper'],
      content: (
        <FileFlyeleModal
          close={() => this.close()}
          onConfirm={options.onConfirm}
        />
      )
    })
  }

  close() {
    this.modal?.destroy()
    this.modal = null
  }
}

export const flyeleFileModal = new FileFlyeleModalHandler()
