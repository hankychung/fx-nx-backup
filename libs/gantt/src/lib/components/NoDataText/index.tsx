import React, { useState } from 'react'
import cs from 'classnames'
import style from './index.module.scss'

const NoDataText = ({
  text,
  onClick,
  warpClass
}: {
  text: string
  onClick?: () => void
  warpClass?: string
}) => {
  const [show, setShow] = useState(false)

  return (
    <div
      style={{ color: show ? '#8f8f8f' : 'transparent' }}
      className={cs(style.noDataText, warpClass)}
      onClick={onClick}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {text}
    </div>
  )
}

export default NoDataText
