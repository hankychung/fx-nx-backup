/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-13 17:07:41
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-13 17:09:57
 * @FilePath: /fx-nx/apps/h5/src/app/pages/PayError/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { ReactComponent as Expired } from '../../../assets/payImg/expired.svg'
const PayError = () => {
  useEffect(() => {
    document.title = '飞项'
  }, [])
  const statusText = {
    processing: '处理中',
    expired: '请使用微信扫码支付',
    completed: '处理中'
  }
  return (
    <div className={styles.payDetail}>
      <div className={styles.order_status}>
        <Expired></Expired>
        <div className={styles.text}>{statusText['expired']}</div>
        </div>
    </div>
  )
}

export default PayError
