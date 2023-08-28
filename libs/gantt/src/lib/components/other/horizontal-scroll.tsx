import React, { SyntheticEvent, useRef, useEffect } from 'react'
import styles from './horizontal-scroll.module.css'

export const HorizontalScroll: React.FC<{
  scroll: number
  svgWidth: number
  taskListWidth: number
  rtl: boolean
  onScroll: (event: SyntheticEvent<HTMLDivElement>) => void
}> = ({ scroll, svgWidth, taskListWidth, rtl, onScroll }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scroll
    }
  }, [scroll])

  return (
    <div
      dir="ltr"
      style={{
        left: taskListWidth
      }}
      className={styles.scrollWrapper}
      onScroll={onScroll}
      ref={scrollRef}
    >
      <div style={{ width: svgWidth }} className={styles.scroll} />
    </div>
  )
}
