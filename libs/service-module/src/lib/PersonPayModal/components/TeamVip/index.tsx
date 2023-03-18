/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:20:24
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-18 14:22:32
 */
import React from 'react'
import { IFlyeleAvatarItem } from '../../../PayModal'
import LeftBlock from './components/LeftBlock'
import RightBlock from './components/RightBlock'

import style from './index.module.scss'

const TeamVip = ({memberList,mineId}:{memberList: IFlyeleAvatarItem[],mineId:string}) => {


  return (
    
      <div className={style.teamVip}>
        <div>
          <LeftBlock memberList={memberList} mineId={mineId}/>
        </div>
        <div>
          <RightBlock />
        </div>
      </div>
  )
}

export default TeamVip
