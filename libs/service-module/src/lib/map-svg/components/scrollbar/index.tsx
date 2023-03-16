import React from 'react'
import {
  hMouseDown,
  hMouseMove,
  hMouseUp,
  hScrollThumbRef,
  vMouseDown,
  vMouseMove,
  vMouseUp,
  vScrollThumbRef
} from '../../d3/scrollBar'
import styles from './index.module.scss'

const ScrollbarDom = () => {
  return (
    <>
      <div className={styles['d3-scroll-vertical']}>
        <div
          className={styles['d3-scroll-vertical-button']}
          ref={vScrollThumbRef}
          onMouseMove={vMouseMove}
          onMouseUp={vMouseUp}
          onMouseDown={vMouseDown}
        ></div>
      </div>
      <div className={styles['d3-scroll-horizontal']}>
        <div
          className={styles['d3-scroll-horizontal-button']}
          ref={hScrollThumbRef}
          onMouseMove={hMouseMove}
          onMouseUp={hMouseUp}
          onMouseDown={hMouseDown}
        ></div>
      </div>
    </>
  )
}

export const Scrollbar = React.memo(ScrollbarDom)
