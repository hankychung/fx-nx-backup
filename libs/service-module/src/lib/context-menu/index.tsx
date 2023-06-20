import React, { useMemo, useRef, CSSProperties } from 'react'
import { useClickAway } from 'ahooks'
import styles from './index.module.scss'
import cs from 'classnames'

export interface IMenuPosition {
  x: number
  y: number
}

export interface IAction {
  txt: string
  callback: () => void
  checkAction: boolean // 为false的时候不显示选项
  reRender?: (close: () => void) => React.ReactNode
  customClass?: string
  getTxtStyle?: CSSProperties
}

interface IProps {
  // parentRef: RefObject<HTMLDivElement>
  x: number
  y: number
  actions: IAction[]
  onClose: () => void
  rootClassName?: string
}

const _ContextMenu = ({ x, y, actions, onClose, rootClassName }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useClickAway(() => {
    onClose()
  }, menuRef)

  const menuStyle = useMemo(() => {
    return {
      left: x + 10,
      top: y + 10
    }
  }, [x, y])

  return (
    <div
      ref={menuRef}
      className={cs(styles.menuRoot, rootClassName)}
      style={menuStyle}
    >
      {actions
        .filter((item) => item.checkAction)
        .map(({ txt, callback, customClass, getTxtStyle, reRender }) => (
          <div
            key={txt}
            onClick={() => {
              callback()
              setTimeout(() => {
                onClose()
              })
            }}
            className={cs({
              [styles.cell]: true,
              [styles.cellVip]: false,
              [customClass as string]: customClass,
              [styles.scheduleCellVip]: false
            })}
            style={getTxtStyle ? getTxtStyle : {}}
          >
            {reRender ? reRender(onClose) : txt}
          </div>
        ))}
    </div>
  )
}

export const ContextMenu = React.memo(_ContextMenu)
