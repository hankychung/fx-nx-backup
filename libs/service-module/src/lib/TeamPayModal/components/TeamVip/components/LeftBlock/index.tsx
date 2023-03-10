/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-07 20:52:57
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-09 14:03:09
 * @FilePath: /electron-client/app/components/PersonPayModal/components/TeamVip/components/LeftBlock/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useRef, useState } from 'react'

import { useClickAway } from 'ahooks'
import { FlyAvatar } from '@flyele/flyele-components'
import style from './index.module.scss'

import MemberList from './components/MemberList'
import { SelectMemberContext } from '../../../../context/context'
import { SingleCheckItemRow } from '../../../CheckItem/SingleCheckItemRow'
import {
  CheckBoxState,
  CheckColorType,
} from '../../../CheckItem/SingleCircleCheckBox'
import { VipPayType } from '../../../controller'

interface Iprops {
  vipType: VipPayType
}

const LeftBlock = (props: Iprops) => {
  const { vipType } = props
  const service = useContext(SelectMemberContext)
  // 打开添加协作人
  const [openAddModal, setOpenAddModal] = useState(false)
  const createRef = useRef<HTMLDivElement>(null)
  const [resultArr, setResultArr] = useState<any[]>([])

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev

      switch (event) {
        case 'show':
          console.log(999)

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

    return () => {
      service.dispose()
    }
  }, [service])
  useClickAway(() => {
    if (openAddModal) {
      service.close()
    }
  }, [
    createRef,
    document.getElementById('invite_member'),
    document.getElementById('member_info'),
  ])

  return (
    <div className={style.leftBlock}>
      <div className={style.lableClear}>
        <div className={style.lableSum}>
          {`开通对象（${resultArr.length}）`}
          {vipType === VipPayType.NOVIPCREATE && (
            <div className={style.tips}>同时邀请进入专业空间 </div>
          )}
        </div>
        <div
          className={style.clear}
          onClick={() => {
            service.selectMember({ list: [] })
          }}
        >
          清空选择
        </div>
      </div>
      {vipType === VipPayType.NOVIPCREATE && (
        <div className={style.itemList}>
          {resultArr &&
            resultArr.length > 0 &&
            resultArr.map((_) => {
              return (
                <div key={_.user_id}>
                  <SingleCheckItemRow
                    // key={item.id}
                    data={{}}
                    onClick={() => {
                      service.selectMember({
                        list: resultArr.filter(
                          (item) => item.user_id !== _.user_id
                        ),
                      })
                    }}
                    state={CheckBoxState.checked}
                    className={style.row_name}
                    colorType={CheckColorType.GREEN}
                    // isClickIcon
                  >
                    <div className={style.mem_info}>
                      <FlyAvatar src={_.avatar} size={30} />
                      <div className={style.mem_name}>
                        <div>{_.original_name || _.nick_name}</div>
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
        <MemberList resultArr={resultArr} service={service} vipType={vipType} />
      </div>
    </div>
  )
}

export default LeftBlock
