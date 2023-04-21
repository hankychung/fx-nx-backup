/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-21 14:49:40
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-20 12:01:41
 * @FilePath: /fx-nx/libs/service-module/src/lib/person-pay-modal/components/team-vip/components/left-block/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useRef, useState } from 'react'

// import arrow_right from '../../../../../../../assets/payImg/arrow_right.svg'
import { ReactComponent as ArrowRight } from '../../../../../../assets/payImg/arrow_right.svg'
import { useClickAway, useMemoizedFn } from 'ahooks'
import style from './index.module.scss'
import { createVipMealText, SectionType } from '../../../controller'
import MemberList from './components/MemberList'
import { SelectMemberContext } from '../../../../context/context'
import { IFlyeleAvatarItem } from '../../../../../pay-modal'

const LeftBlock = ({
  memberList,
  mineId
}: {
  memberList: IFlyeleAvatarItem[]
  mineId: string
}) => {
  const obj: SectionType = createVipMealText().team
  const service = useContext(SelectMemberContext)
  // 打开添加协作人
  const [openAddModal, setOpenAddModal] = useState(false)
  const createRef = useRef<HTMLDivElement>(null)
  const [resultArr, setResultArr] = useState<IFlyeleAvatarItem[]>(
    memberList.filter((item) => item.userId === mineId)
  )
  const setMemberSet = useMemoizedFn(() => {
    setTimeout(() => {
      service.selectMember({
        list: memberList.filter((item) => item.userId === mineId)
      })
    }, 100)
  })
  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev

      switch (event) {
        case 'show':
          setOpenAddModal(true)

          break
        case 'close':
          setOpenAddModal(false)

          break
        case 'selectMember':
          setResultArr(service.getData('selectMember').list)
          break

        default:
      }
    })
    setMemberSet()
    return () => {
      service.dispose()
    }
  }, [service, setMemberSet])
  useClickAway(
    () => {
      if (openAddModal) {
        service.close()
      }
    },
    [
      createRef,
      document.getElementById('invite_member'),
      document.getElementById('member_info'),
      // document.getElementById('check_box'),
      // document.getElementById('search_block'),
      // document.getElementById('circleCheckBox')
    ],
  )
  return (
    <div className={style.leftBlock}>
      <div className={style.person_desc}>{obj.desc}</div>
      <div className={style.interests}>
        <span>查看完整权益</span>
        <ArrowRight color="#6A67F4" />
        {/* // <img src={arrow_right} alt="tabs" /> */}
      </div>
      <div className={style.interests_list}>
        {obj.list.map((_) => {
          return (
            <div className={style.interests_item} key={_.title}>
              <img src={_.icon} alt="tabs" />
              <div className={style.interests_info}>
                <span>{_.title}</span>
                <div>{_.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div ref={createRef}>
        {
         openAddModal&& <div
            className={style.member_list}
          >
            <MemberList
              resultArr={resultArr}
              service={service}
              memberList={memberList}
              mineId={mineId}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default LeftBlock
