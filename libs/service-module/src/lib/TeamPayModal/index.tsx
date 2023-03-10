/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-09 09:55:49
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 17:24:20
 * @FilePath: /electron-client/app/components/TeamPayModal/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Modal } from 'antd'
import cs from 'classnames'
import style from './index.module.scss'

import Header from './components/Header'
import VipPackage from './components/VipPackage'
import { VipPayType } from './components/controller'

interface Iprops {
  vipType: VipPayType
  onClose: ()=>void
}
const TeamPayModal = (props: Iprops) => {
  const { vipType,onClose } = props

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
            <Header vipType={vipType} onClose={onClose}/>
          </div>
          {/* 套餐包信息 */}
          <VipPackage vipType={vipType} />
        </div>
      </Modal>
    </div>
  )
}

export default TeamPayModal
