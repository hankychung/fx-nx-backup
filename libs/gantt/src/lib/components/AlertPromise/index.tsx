/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-07-20 16:17:54
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-20 16:41:03
 * @FilePath: /fx-nx/libs/service-module/src/lib/gantt/components/AlertPromise/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Modal, ModalFuncProps } from 'antd'
import cs from 'classnames'
import React, { ReactNode } from 'react'
import styles from './index.module.scss'

export type IRenderProps = {
  destroy: () => void
  resolve: (res?: any) => void
  reject: () => void
}

export interface AlertProps extends ModalFuncProps {
  width?: number
  reModalRender?: (args: IRenderProps) => ReactNode
  cancelStyle?: React.CSSProperties
  okStyle?: React.CSSProperties
}

/**
 * 全局第三版弹窗确认组件
 * @param props 打开提示窗的数据信息
 * @returns 返回modal实例, 可以在开启时进行更新或手动卸载
 *
 * @example
 * const AlertInfo = Alert({
 *  title: '确认解散项目',
 *  content: '解散后将无法恢复',
 *
 *  // 点击确认
 *  onOk(){
 *    // 返回promise时将会在esolve时关闭弹窗
 *    return Api.request(***)
 *  }
 *
 *  // 点击取消
 *  onCancel(){
 *    // 返回promise时将会在resolve时关闭弹窗
 *    return Api.request(***)
 *  }
 *
 * })
 *
 *
 * AlertInfo.destroy() // 手动关闭弹窗
 *
 * AlertInfo.update() // 手动更新弹窗
 *
 */
const AlertPromise = (props: AlertProps) => {
  const {
    className,
    cancelStyle,
    width,
    reModalRender,
    okStyle,
    cancelButtonProps,
    okButtonProps,
    ...deepProps
  } = props

  return new Promise((resolve, reject) => {
    const modal = Modal.confirm({
      wrapClassName: cs(styles.mask),
      className: cs(styles.alertContainer, className),
      width: width ?? 420,
      modalRender: reModalRender
        ? () => {
            return reModalRender({ resolve, reject, destroy: modal.destroy })
          }
        : undefined,
      icon: null,
      centered: true,
      cancelButtonProps: {
        type: 'text',
        style: cancelStyle,
        ...cancelButtonProps,
        className: cs(cancelButtonProps?.className, styles.cancel)
      },
      okButtonProps: {
        style: okStyle,
        ...okButtonProps,
        className: cs(okButtonProps?.className, styles.ok)
      },
      ...deepProps,
      onOk: (arg) => {
        modal.destroy()
        resolve(arg)
      },
      onCancel: (arg) => {
        modal.destroy()
        reject(arg)
      }
    })
  })
}

export default AlertPromise
