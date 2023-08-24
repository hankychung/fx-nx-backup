import React from 'react'
import { Button } from 'antd'
import cs from 'classnames'
import styles from './index.module.scss'

interface IProps {
  onClear: () => void
  onCancel: () => void
  onConfirm: () => void
  confirmBtnIsLoading?: boolean // 确定是否在loading
  bottomBtnBarCla?: string
  /** 是否显示 放入待安排 */
  isInTheArranged?: boolean
  createType?: string
}

const _BottomBar = ({
  onConfirm,
  onCancel,
  onClear,
  confirmBtnIsLoading,
  bottomBtnBarCla
}: IProps) => {
  return (
    <div className={cs(styles.bar_wrap, bottomBtnBarCla)}>
      <div
        onClick={() => {
          onClear()
        }}
        className={styles.clear_btn}
      >
        清空
      </div>
      <div className={styles.right_btn_box}>
        <Button onClick={onCancel} className={styles.cancel_btn}>
          取消
        </Button>
        <Button
          onClick={onConfirm}
          className={styles.confirm_btn}
          loading={confirmBtnIsLoading}
        >
          确定
        </Button>
      </div>
    </div>
  )
}

export const BottomBar = React.memo(_BottomBar)
