import React, {
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
  ForwardRefRenderFunction
} from 'react'
import { useClickAway, useMemoizedFn } from 'ahooks'
import styles from './index.module.scss'
import cs from 'classnames'
import { IAction, IContextMenuRef, IShowMenuOptions } from './types'

const _ContextMenu: ForwardRefRenderFunction<IContextMenuRef> = (
  props,
  ref
) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [actions, setActions] = useState<IAction[]>([])
  const closeFunc = useRef<() => void>()

  const onClose = () => {
    closeFunc.current && closeFunc.current()
    setVisible(false)
  }

  /**
   * 用于判断是否会超出显示范围
   */
  const checkPosition = useMemoizedFn(
    (x: number, y: number, itemNum: number) => {
      const padding = 12
      const itemHeight = 38
      const divWidth = 120
      const divHeight = itemHeight * itemNum + padding
      const engagedWidth = divWidth + x
      const engagedHeight = divHeight + y
      let resX = x
      let resY = y

      if (engagedWidth > window.innerWidth) {
        resX = resX - divWidth
      }

      if (engagedHeight > window.innerHeight) {
        resY = resY - divHeight
      }
      return [resX, resY]
    }
  )

  useClickAway(() => {
    onClose()
  }, menuRef)

  useImperativeHandle(ref, () => ({
    show: (options: IShowMenuOptions) => {
      const { x, y, action, onClose } = options
      const [resX, resY] = checkPosition(x, y, action.length)

      setX(resX)
      setY(resY)
      setActions(action)

      if (onClose) {
        closeFunc.current = onClose
      } else {
        closeFunc.current = () => {
          // console.log('关闭')
        }
      }

      setVisible(true)
    },
    close: () => {
      onClose()
    },
    getVisible: () => {
      return visible
    }
  }))

  const menuPosition = useMemo(() => {
    return {
      left: x + 10,
      top: y + 10
    }
  }, [x, y])

  if (!visible) return null

  return (
    <div
      id="fx-contextMenu"
      ref={menuRef}
      className={cs(styles.menuRoot)}
      style={menuPosition}
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

export const ContextMenu = React.forwardRef(_ContextMenu)
