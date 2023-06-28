import React, {
  useEffect,
  useRef,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useLayoutEffect,
  CSSProperties
} from 'react'
import cs from 'classnames'
import { getParentNode } from '@flyele-nx/utils'
import style from './index.module.scss'

interface Props {
  shakeDuration?: number // 抖动时长
  onShakeFinish?: () => void // 抖动结束后调用
  enabled: boolean
  showMask?: boolean
  children?: React.ReactNode
  style?: CSSProperties
  extraIgnoreDom?: string[]
}

function shouldShake(el: HTMLElement, domList: (string | HTMLElement)[]) {
  for (const dom of domList) {
    if (getParentNode(el, dom)) {
      return false
    }
  }

  return true
}

const _Shake: ForwardRefRenderFunction<
  { hide: () => void; show: () => void },
  Props
> = (props, ref) => {
  const {
    children,
    shakeDuration = 1000,
    onShakeFinish,
    enabled,
    showMask = true,
    style: innerStyle,
    extraIgnoreDom = []
  } = props
  const divRef = useRef<HTMLDivElement>(null)
  const [showAni, setShowAni] = useState(false)
  const maskRef = useRef(document.createElement('div'))
  const showAniRef = useRef(showAni)

  showAniRef.current = showAni

  const bodyClickHandle = useCallback(
    (e: MouseEvent) => {
      if (!divRef.current || !enabled) return
      if (
        shouldShake(e.target as HTMLElement, [
          divRef.current,
          ...extraIgnoreDom
        ]) &&
        !showAniRef.current
      ) {
        setShowAni(true)

        setTimeout(() => {
          setShowAni(false)
          onShakeFinish && onShakeFinish()
        }, shakeDuration)
      }
    },
    [enabled, extraIgnoreDom, onShakeFinish, shakeDuration]
  )

  useImperativeHandle(
    ref,
    () => {
      return {
        hide() {
          document.body.removeEventListener('click', bodyClickHandle, true)
        },
        show() {
          setTimeout(() => {
            // 在200毫秒后监听，否则窗体一弹出来就会抖动
            document.body.addEventListener('click', bodyClickHandle, true)
          }, 200)
        }
      }
    },
    [bodyClickHandle]
  )

  useEffect(() => {
    // if (enabled) {
    //   setTimeout(() => {
    //     // 在200毫秒后监听，否则窗体一弹出来就会抖动
    //     document.body.addEventListener('click', bodyClickHandle, true)
    //   }, 200)
    // } else {
    //   document.body.removeEventListener('click', bodyClickHandle, true)
    // }
    document.body.addEventListener('click', bodyClickHandle, true)

    return () => {
      document.body.removeEventListener('click', bodyClickHandle, true)
    }
  }, [enabled, bodyClickHandle])

  useLayoutEffect(() => {
    const maskNode = maskRef.current
    if (maskNode && enabled && showMask) {
      maskNode.className = style.mask
      document.body.append(maskNode)
    }

    return () => {
      maskNode.parentNode && document.body.removeChild(maskNode)
    }
  }, [enabled, showMask, maskRef])

  return (
    <div
      id="shake-wrapper"
      style={innerStyle || {}}
      ref={divRef}
      className={cs(style.shake, { [style.shake_ani]: showAni })}
      data-enabled={enabled}
    >
      {children}
    </div>
  )
}

export const Shake = forwardRef(_Shake)
