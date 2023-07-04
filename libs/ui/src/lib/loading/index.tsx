import React, { CSSProperties } from 'react'
import cs from 'classnames'
import LoadingIcon from '../../assets/icons/loading.gif'
import styles from './index.module.scss'

interface Props {
  text?: string
  top?: number
}

export const Loading: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { text, top = 150 } = props

  const rootStyle: CSSProperties = {
    transform: `translateY(${top}px)`
  }

  return (
    <div className={cs(styles.wrap)} style={rootStyle}>
      <img alt="" src={LoadingIcon} />
      <span>{text}</span>
    </div>
  )
}
