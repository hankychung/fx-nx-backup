import { Modal } from 'antd'
import { MatterRelatedPlugin } from './plugins/matter-related-plugin'
import { InviteModal } from './InviteModal'
import style from './index.module.scss'
import { InteractPlugin } from './plugins/interact-plugin'

class InviteModalHandler {
  private modal: ReturnType<typeof Modal.info> | null = null

  open() {
    this.modal?.destroy()

    this.modal = Modal.info({
      width: 640,
      content: <InviteModal close={() => this.close()} />,
      footer: null,
      icon: null,
      wrapClassName: style['modal-wrapper'],
      closeIcon: true,
      maskClosable: true
    })
  }

  close() {
    this.modal?.destroy()
    this.modal = null
  }
}

export const inviteModal = new InviteModalHandler()

export const invitePlugin = {
  matterRelated: MatterRelatedPlugin,
  interact: InteractPlugin
}
