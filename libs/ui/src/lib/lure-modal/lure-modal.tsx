import styles from './lure-modal.module.scss'
import { Modal } from 'antd'
import { memo } from 'react'
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import { ReactComponent as ConvertIcon } from './img/convert.svg'
import venationImg from './img/venation.png'
import cycleImg from './img/cycle.png'
import applicationImg from './img/application.png'
import classNames from 'classnames'

export interface LureModalProps {
  handleClose: () => void
  highlight?: string
  tip?: string
  handleConfirm: () => void
  open: boolean
  title: string
  freeTxt?: string
  vipTxt?: string
  isEmptyContent?: boolean
  imgType?: 'venation' | 'application' | 'cycle'
}

const dict = {
  venation: venationImg,
  application: applicationImg,
  cycle: cycleImg
}

function _LureModal({
  handleClose,
  tip,
  handleConfirm,
  open,
  title,
  freeTxt,
  vipTxt,
  highlight,
  imgType,
  isEmptyContent
}: LureModalProps) {
  return (
    <Modal
      open={open}
      wrapClassName={styles.wrapper}
      width={imgType ? 452 : 380}
      centered
      closable={false}
      footer={null}
      destroyOnClose
    >
      <div
        className={classNames(styles.title, { [styles['title-img']]: imgType })}
      >
        <div>{isEmptyContent ? '' : title}</div>
        <CloseIcon onClick={handleClose} />
      </div>

      {imgType ? (
        <img src={dict[imgType]} alt="" width={396} />
      ) : isEmptyContent ? (
        <div
          className={classNames(styles.content, {
            [styles['content-notip']]: !tip
          })}
        >
          <div className={styles.lft}>
            <div className={styles.size}>{freeTxt}</div>
            <div className={styles.sub}>免费账户</div>
          </div>
          <ConvertIcon />
          <div className={styles.rgt}>
            <div className={styles.size}>{vipTxt}</div>
            <div className={styles.sub}>个人会员</div>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>仅会员才可使用该功能</div>
      )}

      <div className={styles.footer}>
        <div className={styles.highlight}>{highlight}</div>
        {tip && (
          <div
            className={classNames(styles.tip, {
              [styles['tip-under']]: highlight
            })}
          >
            {tip}
          </div>
        )}
        <div className={classNames(styles.btn)} onClick={handleConfirm}>
          开通会员
        </div>
      </div>
    </Modal>
  )
}

export const LureModal = memo(_LureModal)

export default LureModal
