/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-07 16:19:26
 * @FilePath: /electron-client/app/components/TeamPayModal/components/Header/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import style from './index.module.scss'

const Protocol = ({ goProtocol }: { goProtocol: () => void }) => {
  return (
    <div className={style.Protocol}>
      支付即视为同意
      <span
        onClick={() => {
          goProtocol()
        }}
      >
        《飞项会员协议》
      </span>
    </div>
  )
}

export default Protocol
