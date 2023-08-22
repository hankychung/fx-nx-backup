import React, { useState, useRef, ReactNode } from 'react'
import { useMemoizedFn } from 'ahooks'
import { AlertWithOkAndCancel } from '@flyele-nx/ui'

interface Params {
  message: string | ReactNode
  confirmTxt?: string
  confirmStyle?: React.CSSProperties
  cancelTxt?: string
  cancelStyle?: React.CSSProperties
  desc?: string
  descStyle?: React.CSSProperties
  onConfirm?: ({ resolve }: { resolve: (value: boolean) => void }) => void
  onCancel?: any
  color?: any
  confirmAndClose?: boolean
  showCancel?: boolean
  displayHandler?: (b: boolean) => void
}

const useAlert = ({
  message,
  confirmTxt,
  cancelTxt,
  onConfirm,
  confirmStyle,
  cancelStyle,
  desc,
  descStyle,
  onCancel,
  color,
  confirmAndClose,
  showCancel = true,
  displayHandler
}: Params) => {
  const [visible, _setVisible] = useState(!!displayHandler)
  const executors = useRef<{
    resolve: (_v: any) => void
    reject: () => void
  } | null>(null)

  const setVisible = useMemoizedFn((b: boolean) => {
    _setVisible(b)
    displayHandler && displayHandler(b)
  })

  const onOk = async () => {
    if (onConfirm) {
      const res = await new Promise((resolve) => {
        onConfirm({ resolve })
      })

      setVisible(!res)
    }
  }

  return {
    alertCtx: (
      <AlertWithOkAndCancel
        visible={visible}
        onOk={() => {
          onOk()
          if (confirmAndClose) {
            setVisible(false)
          }
        }}
        desc={desc}
        cancelStyle={cancelStyle}
        okStyle={confirmStyle}
        descStyle={descStyle}
        onCancel={() => {
          setVisible(false)
          onCancel()
        }}
        message={message}
        confirmTxt={confirmTxt}
        cancelTxt={cancelTxt}
        color={color}
        showCancel={showCancel}
      />
    ),
    showAlert: () => {
      setVisible(true)
      return new Promise((resolve, reject) => {
        executors.current = {
          resolve,
          reject
        }
      })
    },
    hideAlert: () => {
      setVisible(false)
    },
    visible
  }
}

export default useAlert
