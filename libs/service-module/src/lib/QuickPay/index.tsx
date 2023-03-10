import React, { useState } from 'react'
// import { UsercApi } from '../../service/index'
// import { service } from '../../service/service'
// import { add } from 'utils'
// import { Button } from 'ui'
import { Modal } from 'antd'
import cs from 'classnames'
import style from './index.module.scss'

import Header from './components/Header'
import MemberInfo from './components/MemberInfo'
import PayQrCode from './components/PayQrCode'
interface Iprops {
  onClose: () => void
}
const QuickPay = (props: Iprops) => {
  const { onClose } = props
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  return (
    <div>
      <Modal
        open
        centered
        footer={null}
        closable={false}
        destroyOnClose
        maskClosable={false}
        width={360}
        wrapClassName={style.custom_modal}
        maskStyle={{ opacity: '0.4', background: '#000000', animation: 'none' }}
      >
        <div className={cs(style.modal_block)}>
          {/* 头部信息 */}
          <div className={style.topBlock}>
            <Header onClose={onClose} />
            {!showSuccess && <MemberInfo />}
          </div>
          <div>
            <PayQrCode
              setShowSuccess={setShowSuccess}
              showSuccess={showSuccess}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export { QuickPay }
