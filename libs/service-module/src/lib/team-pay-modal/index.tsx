/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-13 17:54:22
 * @FilePath: /electron-client/app/components/TeamPayModal/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Modal } from 'antd'
import cs from 'classnames'
import style from './index.module.scss'

import Header from './components/header'
import VipPackage from './components/vip-package'
import { VipPayType } from './components/controller'
import { IFlyeleAvatarItem } from '../pay-modal'

interface Iprops {
  vipType: VipPayType
  memberList: IFlyeleAvatarItem[]
  mineId: string
  isPaySuccess: boolean
  spaceId?: string
  onClose: () => void
  upSpace?: () => void
  senConfirm?: () => void
  goProtocol: () => void
  showMsg?: () => void
}
const TeamPayModal = (props: Iprops) => {
  const {
    vipType,
    onClose,
    memberList,
    mineId,
    spaceId,
    upSpace,
    senConfirm,
    isPaySuccess,
    goProtocol,
    showMsg
  } = props

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
        <div className={cs(style.team_block)}>
          {/* 头部信息 */}
          <div>
            <Header vipType={vipType} onClose={onClose} />
          </div>
          {/* 套餐包信息 */}
          <VipPackage
            isPaySuccess={isPaySuccess}
            onClose={onClose}
            vipType={vipType}
            memberList={memberList}
            mineId={mineId}
            spaceId={spaceId}
            upSpace={upSpace}
            senConfirm={senConfirm}
            goProtocol={goProtocol}
            showMsg={showMsg}
          />
        </div>
      </Modal>
    </div>
  )
}

export default TeamPayModal
