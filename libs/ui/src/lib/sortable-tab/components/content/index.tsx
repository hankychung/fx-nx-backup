import React from 'react'
// import style from './index.scss'

interface Props {
  children: React.ReactNode
  className?: string
  length: number
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>
}

const ITEM_HEIGHT = 60

const Content = ({ children, className, length, setShowMore }: Props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '0 8px 8px 8px',
        overflowX: 'hidden'
      }}
      className={className}
      // renderThumbVertical={renderThumb} //传入函数，设置滚动条样式
      // autoHide
      onScroll={(...args) => {
        if (
          ITEM_HEIGHT * length - (args[0].target as HTMLDivElement).scrollTop <
          272
        ) {
          setShowMore(false)
        } else {
          setShowMore(true)
        }
      }}
    >
      {children}
    </div>
  )
}

export default Content
