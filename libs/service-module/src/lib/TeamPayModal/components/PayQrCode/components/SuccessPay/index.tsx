/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 16:50:22
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useState } from 'react'
import close from '../../../../../../assets/payImg/close.svg'
import pay_success from '../../../../../../assets/payImg/pay_success.svg'
import { SelectMemberContext } from '../../../../context/context'
import style from './index.module.scss'

const SuccessPay = () => {
  const service = useContext(SelectMemberContext)
  const [time, setTime] = useState<number>(5)

  useEffect(() => {
    const interval = setInterval(() => {
      if (time === 1) {
        service.showPay({ show: false })
      }
      setTime(time - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [time])

  return (
    <div className={style.successPay}>
      <div style={{ width: '100%' }}>
        <div className={style.close_icon}>
          <img
            alt="close"
            src={close}
            className={style.close}
            onClick={() => {
              service.showPay({ show: false })
            }}
          />
        </div>

        <div className={style.info}>
          <img alt="pay_success" src={pay_success} className={style.close} />
          <span>支付成功</span>
          <div>感谢您的支持～</div>
        </div>
      </div>
      <div className={style.closeBtn}>{`自动关闭（${time}s）`}</div>
    </div>
  )
}

export default SuccessPay
