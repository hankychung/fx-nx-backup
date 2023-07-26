import React from 'react'
import style from './index.module.scss'

interface Props {
  title: string
  subTitle: (() => React.ReactNode) | string
  img: string
}

const CarouselItem: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { title, subTitle, img } = props

  return (
    <div className={style.wrap}>
      <img alt="banner" src={img} />
      <header>
        <h1 className={style.title}>{title}</h1>
        <div className={style.sub_title}>
          {typeof subTitle === 'function' ? subTitle() : subTitle}
        </div>
      </header>
    </div>
  )
}

export default CarouselItem
