/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 17:46:20
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-30 18:03:09
 * @FilePath: /electron-client/app/components/PersonPayModal/components/VipPackage/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import style from './index.module.scss'
import { tabs, TabType, VipMealType } from '../controller'
import PersonVip from '../person-vip'
import TeamVip from '../team-vip'
import { SelectMemberContext } from '../../context/context'
import PayQrCode from '../pay-qr-code'
import { IActiveGoods } from '@flyele-nx/api'
import { IFlyeleAvatarItem } from '../../../pay-modal'
import { useMemoizedFn } from '@flyele/flyele-components'
const url = `https://cdn.flyele.net/resources/PC/`
interface Iprops {
  memberList: IFlyeleAvatarItem[]
  mineId: string
  vipMealType: VipMealType
  setVipMealType: (_: VipMealType) => void
}

const VipPackage = (props: Iprops) => {
  const { vipMealType, setVipMealType, memberList, mineId } = props
  const [tabsList, setTabs] = useState<TabType[]>(tabs()) // 切换tab
  const [showPay, setShowPay] = useState<boolean>(false)
  const [payInfo, setPayInfo] = useState<IActiveGoods>()
  const [userInfo, setUserInfo] = useState<IFlyeleAvatarItem[]>()
  const service = useContext(SelectMemberContext)

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev

      switch (event) {
        case 'showPay':
          setShowPay(service.getData('showPay').show)
          setPayInfo(service.getData('showPay').payInfo)
          setUserInfo(service.getData('showPay').userInfo)
          break

        default:
      }
    })

    return () => {
      service.dispose()
    }
  }, [service])

  //判断会员类型
  const vipTypeFun = useMemoizedFn(() => {
    const newTab = tabsList.map((item) => {
      if (item.type === vipMealType) {
        return {
          ...item,
          active: true
        }
      }
      return {
        ...item,
        active: false
      }
    })

    setTabs(newTab)
  })
  //进入判断会员类型
  useEffect(() => {
    if (vipMealType) {
      vipTypeFun()
    }
  }, [vipMealType, vipTypeFun])
  // 背景图
  const bgUrl =
    vipMealType === VipMealType.PERSON
      ? `${url}person_package_bg.png`
      : `${url}team_package_bg.png`

  return (
    <div
      className={style.vipPackage}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className={style.tabs}>
        {tabsList.map((_) => {
          return (
            <div
              key={_.type}
              className={cs(style.tabs_item, { [style.active]: _.active })}
              onClick={() => {
                setVipMealType(_.type)
              }}
            >
              {_.active && (
                <div className={style.active_vip_content}>
                  <img src={_.icon} alt="tabs" />
                  <span>{_.h1}</span>
                </div>
              )}
              {!_.active && (
                <div
                  className={cs(style.vip_content, {
                    [style.un_active]: _.type === VipMealType.PERSON
                  })}
                >
                  <span>{_.h1}</span>
                  <span className={style.desc}>{_.tab}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div
        style={{
          display: vipMealType === VipMealType.PERSON ? 'block' : 'none'
        }}
      >
        <PersonVip />
      </div>
      <div
        style={{ display: vipMealType === VipMealType.TEAM ? 'block' : 'none' }}
      >
        <TeamVip
          memberList={memberList}
          mineId={mineId}
          vipMealType={vipMealType}
        />
      </div>
      {/* 支付弹窗 */}
      {showPay && (
        <PayQrCode
          payInfo={payInfo}
          vipMealType={vipMealType}
          userInfo={
            userInfo
              ? userInfo
              : memberList.filter((item) => item.userId === mineId)
          }
        />
      )}
    </div>
  )
}

export default VipPackage
