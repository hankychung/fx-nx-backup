import React, { useState, useRef, ReactNode } from 'react'
import { Carousel } from 'antd'
import { CarouselRef } from 'antd/lib/carousel'
import classNames from 'classnames'
import CarouselItem from './components/carousel-item'
import style from './index.module.scss'

interface SwiperItem {
  src: string
  key: number
  title: string
  subTitle: () => ReactNode
}

const swiperList: SwiperItem[] = [
  {
    src: 'https://cdn.flyele.net/resources/PC/advertisement/1.png',
    key: 1,
    title: '事项全要素',
    subTitle: () => <span>集合事项5W1H，满足一切复杂事项</span>
  },
  {
    src: 'https://cdn.flyele.net/resources/PC/advertisement/2.png',
    key: 3,
    title: '畅快进程协作',
    subTitle: () => (
      <>
        <span>同步事项进展，还能边聊边创小任务，</span>
        <span>保证每个执行细节</span>
      </>
    )
  },
  {
    src: 'https://cdn.flyele.net/resources/PC/advertisement/3.png',
    key: 0,
    title: '全量统筹所有',
    subTitle: () => <span>沉淀每个真知灼见，在一处管理你的所有要务</span>
  },
  {
    src: 'https://cdn.flyele.net/resources/PC/advertisement/4.png',
    key: 2,
    title: '多种视角项目协作',
    subTitle: () => (
      <>
        <span>将伙伴都加入到一个page里</span>
        <span>项目管理从未如此轻松</span>
      </>
    )
  }
]

const _Advertisement: React.FC<
  React.PropsWithChildren<Record<string, unknown>>
> = () => {
  const [sliderIndex, setSliderIndex] = useState<number>(0)
  const carousel = useRef<CarouselRef>(null)

  const onChange = (index: number) => {
    if (index !== sliderIndex) {
      setSliderIndex(index)
    }
  }
  const handleGoItem = (slideNumber: number) => {
    carousel.current?.goTo(slideNumber)
  }

  return (
    <div className={classNames(style.advertisement_wrap)}>
      <Carousel autoplay afterChange={onChange} dots={false} ref={carousel}>
        {swiperList.map((item: SwiperItem) => (
          <CarouselItem
            key={item.key}
            title={item.title}
            subTitle={item.subTitle}
            img={item.src}
          />
        ))}
      </Carousel>

      {/* 自定义指示点 */}
      <ul className={style.slick_dots}>
        {swiperList.map((item: SwiperItem, index: number) => (
          <li
            key={item.key}
            className={index === sliderIndex ? style.active : ''}
            onClick={() => handleGoItem(index)}
          />
        ))}
      </ul>
    </div>
  )
}

export const Advertisement = React.memo(_Advertisement)
