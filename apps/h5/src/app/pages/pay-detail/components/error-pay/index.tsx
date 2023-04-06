/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-04-04 15:34:13
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-04 15:57:02
 * @FilePath: /fx-nx/apps/h5/src/app/pages/pay-detail/components/error-pay/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react'
import style from './index.module.scss'
import { Modal } from 'antd'
import { ReactComponent as Close } from '../../../../../assets/payImg/close.svg'

const ErrorPay = ({ onClose }: { onClose: () => void }) => {
  return (
    <div>
      <Modal
        open
        centered
        footer={null}
        closable={false}
        destroyOnClose
        maskClosable={false}
        width={280}
        wrapClassName={style.custom_modal}
        maskStyle={{ opacity: '0.4', background: '#000000', animation: 'none' }}
      >
        <div className={style.modal_block}>
          <div className={style.close}>
            <Close
              onClick={() => {
                onClose()
              }}
            ></Close>
          </div>
          <div className={style.content}>
            尚未查询到支付成功，
            <p>请确认后重试</p>
          </div>
          <div className={style.confim_block}>
            <div className={style.confim}>确认</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ErrorPay
