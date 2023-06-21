import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from 'react'
import { createRoot } from 'react-dom/client'
import cs from 'classnames'
import { Modal } from 'antd'
import { Close } from '@flyele-nx/icon'
import styles from './index.module.scss'

type Props = {
  title?: string | ReactNode
  message?: string | ReactNode
  tip?: string | ReactNode
  desc?: string | undefined
  onOk: () => void
  onCancel?: () => void
  visible: boolean | undefined
  closable?: boolean | undefined
  width?: string | number
  confirmTxt?: string
  cancelTxt?: string
  showCancel?: boolean
  okBtn?: string
  cancelStyle?: React.CSSProperties
  okStyle?: React.CSSProperties
  className?: string
  color?: 'red' | 'yellow'
  messageStyle?: CSSProperties
  descStyle?: CSSProperties
  maskStyle?: CSSProperties
  size?: 'large' | 'small'
  showClose?: boolean // 显示关闭按钮
  onClose?: () => void // 点击关闭按钮的回调
  zIndex?: number
}

export const AlertWithOkAndCancel = ({
  title,
  message,
  messageStyle = { color: 'rgba(6,6,6,.87)', fontSize: 14 },
  tip,
  desc = undefined,
  descStyle = { color: 'rgba(6,6,6,.87)', fontSize: 14 },
  onOk,
  onCancel,
  visible = false,
  closable = false,
  width = '420px',
  confirmTxt,
  showCancel = true,
  cancelTxt,
  okBtn,
  cancelStyle,
  okStyle,
  color,
  className,
  maskStyle,
  size = 'large',
  showClose,
  onClose,
  zIndex
}: Props) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible !== show) {
      setShow(visible)
    }
  }, [show, visible])

  const funList = useMemo(
    () => ({
      onOk() {
        // setShow(false)
        onOk && onOk()
      },
      onCancel() {
        setShow(false)
        onCancel && onCancel()
      }
    }),
    [onCancel, onOk]
  )

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <Modal
        maskStyle={maskStyle}
        open={show}
        closable={closable}
        footer={null}
        width={width}
        destroyOnClose // 关闭时销毁
        // 关闭动画
        transitionName=""
        maskTransitionName=""
        centered
        zIndex={zIndex}
      >
        <div className={cs(styles['modal-alert-with-ok'], className)}>
          {title && (
            <div className={styles['modal-alert-with-ok__alertTitle']}>
              {title}
            </div>
          )}
          {showClose && (
            <div
              className={cs(styles['modal-alert-with-ok__close'], {
                [styles['modal-alert-with-ok__alertTitle__close']]: !!title
              })}
              onClick={onClose}
            >
              <Close width={16} height={16} color="#939393" />
            </div>
          )}
          <div
            style={messageStyle}
            className={cs(styles['modal-alert-with-ok__title'], {
              [styles['modal-alert-with-ok__title__withTitle']]: !!title
            })}
          >
            {message}
          </div>
          {desc && (
            <div
              style={descStyle}
              className={styles['modal-alert-with-ok__desc']}
            >
              {desc}
            </div>
          )}
          <div
            className={cs(styles['modal-alert-with-ok__btn-group'], {
              [styles['modal-alert-with-ok__withTip']]: !!tip
            })}
            style={{
              paddingRight: size === 'small' ? 16 : 24
            }}
          >
            {tip && (
              <div className={styles['modal-alert-with-ok__tip']}>{tip}</div>
            )}
            {showCancel && (
              <div className={styles['modal-alert-with-ok__buttonCancel']}>
                <button
                  style={cancelStyle}
                  type="button"
                  onClick={funList.onCancel}
                >
                  {cancelTxt || '不保存'}
                </button>
              </div>
            )}
            <div
              className={
                cs(styles['modal-alert-with-ok__buttonOk'], {
                  [styles['modal-alert-with-ok__buttonOkRed']]: color === 'red',
                  [styles['modal-alert-with-ok__buttonOkYellow']]:
                    color === 'yellow'
                })
                // color === 'red'
                //   ? styles['modal-alert-with-ok__buttonOkRed']
                //   : styles['modal-alert-with-ok__buttonOk']
              }
            >
              <button
                type="button"
                style={okStyle}
                className={okBtn}
                onClick={funList.onOk}
              >
                {confirmTxt || '保存'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

type AlertProps = Pick<Props, Exclude<keyof Props, 'visible'>>

/**
 * 使用时请注意回调产生的闭包问题
 * @param props
 */
//TODO render问题： 对render渲染和dom操作的质疑
const div = document.createElement('div')

div.setAttribute('id', 'AlertWithOkAndCancel_call_alert')
const root = createRoot(div)

AlertWithOkAndCancel.root = root
AlertWithOkAndCancel.alert = (props: AlertProps) => {
  const { onOk, onCancel, onClose } = props
  const removeEle = () => {
    root.render(null)
    document.body.removeChild(div)
  }
  const ele = document.getElementById('AlertWithOkAndCancel_call_alert')

  if (ele) {
    // 已经弹出先移除上次
    removeEle()
  }
  props.onOk = () => {
    removeEle()
    onOk()
  }

  props.onCancel = () => {
    removeEle()
    onCancel && onCancel()
  }

  props.onClose = () => {
    removeEle()
    onClose && onClose()
  }

  document.body.appendChild(div)

  return root.render(<AlertWithOkAndCancel {...props} visible />)
}

export default AlertWithOkAndCancel
