/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:20:24
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-08 16:37:05
 */
import { useCreation } from 'ahooks'
import React from 'react'
import { SelectMemberContext } from '../../context/context'
import { SelectMemberService } from '../../context/service'
import LeftBlock from './components/LeftBlock'
import RightBlock from './components/RightBlock'

import style from './index.module.scss'

const TeamVip = () => {
  const service = useCreation(() => {
    return new SelectMemberService()
  }, [])

  return (
    <SelectMemberContext.Provider value={service}>
      <div className={style.teamVip}>
        <div>
          <LeftBlock />
        </div>
        <div>
          <RightBlock />
        </div>
      </div>
    </SelectMemberContext.Provider>
  )
}

export default TeamVip
