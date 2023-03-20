/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-20 10:58:28
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { ReactComponent as PaySuccess } from '../../../../../../assets/payImg/pay_success.svg'
import style from './index.module.scss'

const SuccessPay = () => {
  const [time, setTime] = useState<number>(5)

  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 1) {
        return
      }
      setTime(time - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [time])

  return (
    <div className={style.successPay}>
      <div style={{ width: '100%' }}>
        <div className={style.info}>
          <PaySuccess className={style.close}></PaySuccess>
          <span>支付成功</span>
          <div>您已成功开通会员，感谢您的支持~</div>
        </div>
      </div>
      <div className={style.closeBtn}>{`自动关闭（${time}s）`}</div>
    </div>
  )
}

export default SuccessPay
