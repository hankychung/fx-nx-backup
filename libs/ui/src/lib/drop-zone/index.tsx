import React, { useState, useRef } from 'react'

import cs from 'classnames'

import styles from './index.module.scss'
import { useDrop } from 'ahooks'

interface Props {
  disabled?: boolean
  handle?: (e: React.DragEvent) => void
  customZoneCla?: string
  customZoneInnerCla?: string
  zIndex?: number | 'auto'
}

const _DropZone: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const {
    children,
    handle,
    disabled = false,
    customZoneCla,
    customZoneInnerCla,
    zIndex = 997
  } = props

  const [isDragOver, setIsDragOver] = useState(false)
  const dropRef = useRef(null)

  useDrop(dropRef, {
    onFiles: (files, e) => {
      console.log(e, files)
      if (files.length > 0 && e) {
        handle?.(e)
      } else {
        console.error('拖拽文件失败', e, files)
      }
      setIsDragOver(false)
    },
    onDragEnter: () => {
      setIsDragOver(true)
    },
    onDragLeave: () => {
      setIsDragOver(false)
    }
  })

  return (
    <div
      className={styles.zone_wrap}
      style={{ position: 'relative', zIndex }}
      ref={disabled ? null : dropRef}
    >
      {isDragOver ? (
        <div style={{ zIndex }} className={cs(styles.zone, customZoneCla)}>
          <div className={cs(styles.zone__inner, customZoneInnerCla)}>
            拖拽到此处上传
          </div>
        </div>
      ) : null}

      {children}
    </div>
  )
}

export const DropZone = React.memo(_DropZone)
