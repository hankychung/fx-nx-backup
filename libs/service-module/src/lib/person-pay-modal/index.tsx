/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 15:49:02
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-03 11:55:21
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'
// import { UsercApi } from '../../service/index'
// import { service } from '../../service/service'
// import { add } from 'utils'
// import { Button } from 'ui'
import { Modal } from 'antd'
import cs from 'classnames'
import style from './index.module.scss'

import Header from './components/header'
import VipPackage from './components/vip-package'
import { VipMealType } from './components/controller'
import { useEffect } from 'react'
import { useCreation } from 'ahooks'
import { SelectMemberService } from './context/service'
import { SelectMemberContext } from './context/context'
import { IFlyeleAvatarItem } from '../pay-modal'
interface Iprops {
  onClose: () => void
  payType?: VipMealType
  memberList: IFlyeleAvatarItem[]
  mineId: string
  senConfirm?: () => void
}
const PersonPayModal = (props: Iprops) => {
  const { payType, onClose, memberList, mineId, senConfirm } = props
  const [vipMealType, setVipMealType] = useState<VipMealType>(1) // 切换tab
  useEffect(() => {
    if (payType) {
      setVipMealType(payType)
    }
  }, [payType])
  const service = useCreation(() => {
    return new SelectMemberService()
  }, [])

  return (
    <div>
      <Modal
        open
        centered
        footer={null}
        closable={false}
        destroyOnClose
        maskClosable={false}
        width={752}
        wrapClassName={style.custom_modal}
        maskStyle={{ opacity: '0.4', background: '#000000', animation: 'none' }}
      >
        <SelectMemberContext.Provider value={service}>
          <div
            className={cs(style.modal_block, {
              [style.team_block]: vipMealType === VipMealType.TEAM
            })}
          >
            {/* 头部信息 */}
            <div>
              <Header
                onClose={onClose}
                mineId={mineId}
                memberList={memberList}
              />
            </div>
            {/* 套餐包信息 */}
            <VipPackage
              setVipMealType={setVipMealType}
              vipMealType={vipMealType}
              memberList={memberList}
              mineId={mineId}
              senConfirm={senConfirm}
            />
          </div>
        </SelectMemberContext.Provider>
      </Modal>
    </div>
  )
}

export default PersonPayModal
