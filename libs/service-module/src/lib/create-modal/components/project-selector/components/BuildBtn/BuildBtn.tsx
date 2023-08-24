import React, { FC, PropsWithChildren, useMemo, useRef } from 'react'
import { useHover } from 'ahooks'
import styles from './index.module.scss'
import { FlyTooltip } from '@flyele/flyele-components'
import cs from 'classnames'

/**
 author: william   email:362661044@qq.com
 create_at:2022/8/24 11:12
 **/
type IBuildBtn = {
  text: string
  visible: boolean
  disable?: boolean
  onClick?: () => void
  className?: string
}

const _BuildBtn: FC<React.PropsWithChildren<PropsWithChildren<IBuildBtn>>> = (
  props
) => {
  const { text, visible, children, onClick, disable, className } = props

  const domRef = useRef<HTMLDivElement>(null)

  const hover = useHover(domRef)

  const _text = useMemo(() => {
    if (text.length > 6) {
      return `${text.slice(0, 6)}...`
    }
    return text
  }, [text])

  const show = useMemo(() => {
    if (disable) return false
    return visible || hover
  }, [disable, hover, visible])

  return (
    <div className={cs(styles.btn, className)} ref={domRef}>
      <FlyTooltip strategy="fixed" text={text} disable={text.length <= 6}>
        <span onClick={onClick}>{_text}</span>
      </FlyTooltip>
      {show && children}
    </div>
  )
}

export const BuildBtn = React.memo(_BuildBtn)
