import styles from './lure-modal.module.scss'
import { Modal } from 'antd'
import { memo } from 'react'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import { ReactComponent as ConvertIcon } from './img/convert.svg'
import classNames from 'classnames'

export interface LureModalProps {
  handleClose: () => void
  needTip?: boolean
  handleConfirm: () => void
  open: boolean
}

function _LureModal({
  handleClose,
  needTip,
  handleConfirm,
  open
}: LureModalProps) {
  return (
    <Modal
      open={open}
      wrapClassName={styles.wrapper}
      width={380}
      centered
      closable={false}
      footer={null}
      destroyOnClose
    >
      <div className={styles.title}>
        <div>增加文件大小</div>
        <CloseIcon onClick={handleClose} />
      </div>

      <div
        className={classNames(styles.content, {
          [styles['content-notip']]: !needTip
        })}
      >
        <div className={styles.lft}>
          <div className={styles.size}>50M</div>
          <div className={styles.sub}>免费账户</div>
        </div>
        <ConvertIcon />
        <div className={styles.rgt}>
          <div className={styles.size}>300M</div>
          <div className={styles.sub}>个人会员</div>
        </div>
      </div>

      <div className={styles.footer}>
        {needTip && <div className={styles.tip}>部分文件超过50M不能上传</div>}

        <div className={styles.btn} onClick={handleConfirm}>
          开通会员
        </div>
      </div>
    </Modal>
  )
}

export const LureModal = memo(_LureModal)

export default LureModal
