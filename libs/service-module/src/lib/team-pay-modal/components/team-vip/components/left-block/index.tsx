/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:52:57
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-05-09 14:18:12
 * @FilePath: /electron-client/app/components/PersonPayModal/components/TeamVip/components/LeftBlock/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

import { useMemoizedFn } from 'ahooks'
import { FlyAvatar } from '@flyele/flyele-components'
import style from './index.module.scss'
import { ReactComponent as MemberPersonVip } from '../../../../../../assets/payImg/member_person_vip.svg'
import { ReactComponent as MemberTeamVip } from '../../../../../../assets/payImg/member_team_vip.svg'

import MemberList from './components/member-list'
import { SelectMemberContext } from '../../../../context/context'
import { SingleCheckItemRow } from '../../../check-item/single-check-item-row'
import { VipPayType } from '../../../controller'
import { IFlyeleAvatarItem } from '../../../../../pay-modal'
import cs from 'classnames'
import { sortMap } from '../../../../../person-pay-modal/utils'
import { CheckBoxState, CheckColorType } from '@flyele-nx/constant'

interface Iprops {
  vipType: VipPayType
  memberList: IFlyeleAvatarItem[]
  mineId: string
}

const LeftBlock = (props: Iprops) => {
  const { vipType, memberList, mineId } = props
  const service = useContext(SelectMemberContext)
  // 打开添加协作人
  // const [openAddModal, setOpenAddModal] = useState(false)
  const createRef = useRef<HTMLDivElement>(null)
  const [resultArr, setResultArr] = useState<IFlyeleAvatarItem[]>(
    memberList.filter((item) => item.userId === mineId)
  )
  const setMemberSet = useMemoizedFn(() => {
    if (vipType !== VipPayType.NOVIPCREATE) {
      setResultArr([...memberList])
      setTimeout(() => {
        service.selectMember({ list: [...memberList] })
      }, 100)
    }
    if (vipType === VipPayType.UPSPACE || vipType === VipPayType.RENEWVIP) {
      setResultArr([...memberList].filter((item) => !item.isTeamVip))
      setTimeout(() => {
        service.selectMember({
          list: [...memberList].filter((item) => !item.isTeamVip)
        })
      }, 100)
    }
    if (vipType === VipPayType.NOVIPCREATE) {
      setTimeout(() => {
        service.selectMember({
          list: memberList.filter((item) => item.userId === mineId)
        })
      }, 100)
    }
  })
  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev

      switch (event) {
        case 'selectMember':
          setResultArr(service.getData('selectMember').list)
          break

        default:
      }
    })
    //设置状态
    setMemberSet()
    return () => {
      service.dispose()
    }
  }, [service, setMemberSet])
  //非会员和自己
  const sortMemberList = useMemo((): IFlyeleAvatarItem[] => {
    if (vipType === VipPayType.NOVIPCREATE) {
      return memberList
    }
    // 排序规则
    const noVipList = memberList
      .filter((_) => !_.isTeamVip)
      .map((t) => {
        // 初始化排序
        const item = { ...t, sort: 0 }
        const { pinyin = '' } = item

        // 没有拼音情况下
        if (!item.pinyin) {
          item.sort = sortMap.other
        } else {
          // 拼音首字母排序
          const sort = sortMap[pinyin[0].toLowerCase()]
          item.sort = typeof sort === 'number' ? sort : sortMap.other
        }

        return { ...item }
      })

    noVipList.sort((item1, item2) => {
      return item1.sort - item2.sort
    })
    //会员
    const vipList = memberList
      .filter((_) => _.isTeamVip)
      .map((t) => {
        // 初始化排序
        const item = { ...t, sort: 0 }
        const { pinyin = '' } = item

        // 没有拼音情况下
        if (!item.pinyin) {
          item.sort = sortMap.other
        } else {
          // 拼音首字母排序
          const sort = sortMap[pinyin[0].toLowerCase()]
          item.sort = typeof sort === 'number' ? sort : sortMap.other
        }

        return { ...item }
      })

    vipList.sort((item1, item2) => {
      return item1.sort - item2.sort
    })

    const vip_arr = vipList.filter((item) => item.userId !== mineId)
    const arr = noVipList.filter((item) => item.userId !== mineId)
    const self = memberList.filter((item) => item.userId === mineId)
    if (self[0] && self[0]?.isTeamVip) {
      return [...arr, ...self, ...vip_arr]
    } else {
      return [...self, ...arr, ...vip_arr]
    }
  }, [memberList, mineId, vipType])
  return (
    <div className={style.leftBlock}>
      <div className={style.lableClear}>
        <div className={style.lableSum}>
          {`开通对象（${resultArr.length}）`}
          {vipType === VipPayType.NOVIPCREATE && (
            <div className={style.tips}>同时邀请进入专业空间 </div>
          )}
        </div>
        {resultArr.length > 0 && (
          <div
            className={style.clear}
            onClick={() => {
              if (vipType === VipPayType.NOVIPCREATE) {
                service.selectMember({
                  list: resultArr.filter((item) => item.userId === mineId)
                })
                return
              }
              service.selectMember({
                list: []
              })
            }}
          >
            清空选择
          </div>
        )}
        {!resultArr.length && (
          <div
            className={style.clear}
            onClick={() => {
              service.selectMember({
                list: [...sortMemberList]
              })
            }}
          >
            全选
          </div>
        )}
      </div>
      {vipType === VipPayType.NOVIPCREATE && (
        <div className={style.itemList}>
          {resultArr &&
            resultArr.length > 0 &&
            resultArr.map((_) => {
              return (
                <div key={_.userId}>
                  <SingleCheckItemRow
                    // key={item.id}

                    data={{}}
                    onClick={() => {
                      if (
                        _.userId === mineId &&
                        vipType === VipPayType.NOVIPCREATE
                      ) {
                        return
                      }
                      service.selectMember({
                        list: resultArr.filter(
                          (item) => item.userId !== _.userId
                        )
                      })
                    }}
                    state={
                      _.userId === mineId && vipType === VipPayType.NOVIPCREATE
                        ? CheckBoxState.disable
                        : CheckBoxState.checked
                    }
                    className={style.row_name}
                    colorType={CheckColorType.GREEN}
                    // isClickIcon
                  >
                    <div className={style.mem_info}>
                      <FlyAvatar
                        src={_.avatar}
                        size={30}
                        overlayClassName={cs(
                          _.isTeamVip
                            ? style.global_style_team_vip
                            : _.isVip
                            ? style.global_style_person_vip
                            : ''
                        )}
                      />
                      <div className={style.mem_name}>
                        <div className={style.name_icon}>
                          <div className={style.name}>{_.name}</div>

                          {mineId === _.userId && (
                            <div className={style.mine}>我</div>
                          )}
                          {_.isVip && !_.isTeamVip && (
                            <MemberPersonVip
                              className={style.member_person_vip}
                            ></MemberPersonVip>
                          )}
                          {_.isTeamVip && (
                            <MemberTeamVip
                              className={style.member_team_vip}
                            ></MemberTeamVip>
                          )}
                        </div>
                        <span>{_.telephone}</span>
                      </div>
                    </div>
                  </SingleCheckItemRow>
                </div>
              )
            })}
        </div>
      )}
      <div className={style.member_list} ref={createRef}>
        <MemberList
          resultArr={resultArr}
          service={service}
          vipType={vipType}
          memberList={sortMemberList}
          mineId={mineId}
        />
      </div>
    </div>
  )
}

export default LeftBlock
