import React, { useState } from 'react'
import { Popover, PopoverProps } from 'antd'

import styles from './index.module.scss'
import { flyeleFileModal } from '../file-flyele-modal'

export interface Props extends Pick<PopoverProps, 'placement'> {
  onVisibleChange?: (v: boolean) => void // 监听显隐变化
  onLocalDoc?: (files: File[]) => void
}

const FilePopover: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  onVisibleChange,
  onLocalDoc,
  placement = 'bottom'
}) => {
  const [visible, setVisible] = useState(false)

  const handleLocalDocClick = () => {
    setVisible(false)
    // 选择本地文件
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true // 允许多个文件选择
    input.click()
    input.onchange = () => {
      if (input.files?.length) {
        const files = input.files
        // Now you have the file object
        console.log(files)
        onLocalDoc?.(Array.from(files ?? []))
      }
    }
  }

  const actions = [
    {
      key: 'flyeleDoc',
      txt: '飞项文档',
      onClick: () => {
        console.log('打开飞项文档')
        setVisible(false)
        flyeleFileModal.open({
          onConfirm: (files) => {
            console.log('files', files)
            flyeleFileModal.close()
          }
        })
      },
      show: true
    },
    {
      key: 'localDoc',
      txt: '本地文档',
      onClick: handleLocalDocClick,
      show: true
    }
  ]

  const renderContent = () => {
    return (
      <div className={styles.content_wrap}>
        {actions.map((item) => {
          if (!item.show) return null
          return (
            <div className={styles.item} key={item.key} onClick={item.onClick}>
              {item.txt}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Popover
      open={visible}
      trigger="click"
      onOpenChange={(v) => {
        setVisible(v)
        onVisibleChange?.(v)
      }}
      placement={placement}
      content={renderContent}
      overlayClassName={styles.custom_popover}
    >
      {children}
    </Popover>
  )
}

export default FilePopover
