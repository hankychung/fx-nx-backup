/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:18:39
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-08 09:46:58
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PersonVip/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react'
import LeftBlock from './components/LeftBlock'
import RightBlock from './components/RightBlock'

import style from './index.module.scss'

const PersonVip = () => {
  return (
    <div className={style.personVip}>
      <div>
        <LeftBlock />
      </div>
      <div>
        <RightBlock />
      </div>
    </div>
  )
}

export default PersonVip
