import React, { useCallback } from 'react'
import { Modal } from 'antd'
import style from './index.module.scss'
import takerRule from '../../../../assets/payImg/taker-rule.png'
import close from '../../../../assets/payImg/close_ff.png'

export const TakerRuleExplain = (props: {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { visible, setVisible } = props
  const handleCancel = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  return (
    <>
      <Modal
        maskStyle={{ background: 'none!important' }}
        title="成员权限说明"
        open={visible}
        onCancel={handleCancel}
        destroyOnClose
        centered
        width={400}
        style={{ height: '600px' }}
        footer={null}
        wrapClassName={style.takerRuleModal}
        closeIcon={<img src={close} alt="close" />}
      >
        <div className={style.modalBodyImg}>
          <img src={takerRule} alt="rule" />
        </div>
      </Modal>
    </>
  )
}
