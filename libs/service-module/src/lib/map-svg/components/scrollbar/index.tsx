import React from 'react'
import {
  hMouseDown,
  hMouseMove,
  hMouseUp,
  hScrollThumbMap,
  vMouseDown,
  vMouseMove,
  vMouseUp,
  vScrollThumbMap
} from '../../d3/scrollBar'
import styles from './index.module.scss'

interface ScrollbarDomProps {
  componentKey: string
}

const ScrollbarDom = (props: ScrollbarDomProps) => {
  const { componentKey } = props

  return (
    <>
      <div className={styles['d3-scroll-vertical']}>
        <div
          className={styles['d3-scroll-vertical-button']}
          ref={(dom) => (vScrollThumbMap[componentKey] = dom)}
          onMouseMove={(e) => vMouseMove(e, componentKey)}
          onMouseUp={() => vMouseUp(componentKey)}
          onMouseDown={(e) => vMouseDown(e, componentKey)}
        ></div>
      </div>
      <div className={styles['d3-scroll-horizontal']}>
        <div
          className={styles['d3-scroll-horizontal-button']}
          ref={(dom) => (hScrollThumbMap[componentKey] = dom)}
          onMouseMove={(e) => hMouseMove(e, componentKey)}
          onMouseUp={() => hMouseUp(componentKey)}
          onMouseDown={(e) => hMouseDown(e, componentKey)}
        ></div>
      </div>
    </>
  )
}

export const Scrollbar = React.memo(ScrollbarDom)
