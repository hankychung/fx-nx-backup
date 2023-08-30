import { Modal } from 'antd'
import { MatterRelatedPlugin } from './plugins/matter-related-plugin'
import { InviteModal, IOuterProps } from './InviteModal'
import style from './inviteModal.module.scss'
import { InteractPlugin } from './plugins/interact-plugin'
import { nxControllerRegister } from '@flyele-nx/global-processor'

const isWebClient = document.querySelector('#web-client')

class InviteModalHandler {
  private modal: ReturnType<typeof Modal.info> | null = null

  open(options: IOuterProps = {}) {
    this.modal?.destroy()

    this.modal = Modal.info({
      width: 640,
      content: <InviteModal close={() => this.close()} {...options} />,
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

export const inviteModal = new InviteModalHandler()

export const invitePlugin = {
  matterRelated: MatterRelatedPlugin,
  interact: InteractPlugin
}

if (isWebClient) {
  nxControllerRegister.handlerTaskAddTakerRegister((res) => {
    console.log('taker info', res)

    inviteModal.open({ defaultTakers: res.defaultTakers })
  })
}
