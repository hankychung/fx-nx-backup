/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 09:43:55
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-13 10:27:45
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PersonVip/components/RightBlock/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { ReactComponent as MealTime } from '../../../../../../assets/payImg/meal_time.svg'
import style from './index.module.scss'
import PayButton from '../../../PayButton'
import { SelectMemberContext } from '../../../../context/context'
import { VipPayType } from '../../../controller'

const RightBlock = ({ vipType }: { vipType: VipPayType }) => {
  const service = useContext(SelectMemberContext)
  const [resultArr, setResultArr] = useState<any[]>([])

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

    return () => {
      service.dispose()
    }
  }, [service])
  return (
    <div className={style.rightBlock}>
      <div>
        <div className={style.lable}>套餐内容</div>
        <div className={style.mealBlock}>
          <div className={style.vip_title}>团队套餐</div>
          <div className={style.mealList}>
            <div
              className={cs(style.mealItem, {
                [style.activeStyle]: true
              })}
              onClick={() => {
                // mealSelect(_)
              }}
            >
              <div className={style.name}>团队会员</div>
              <div className={style.price}>
                <span>
                  <i>￥</i>
                  <span>599</span>
                </span>
                <div>
                  <span>￥</span>
                  298/人/年
                </div>
              </div>
              <div className={style.time}>
                <span> 限时 23:59:00</span>
                <MealTime className={style.mealTime}></MealTime>
              </div>
            </div>
          </div>
        </div>
        <div className={style.memberList}>
          <div className={style.lable_sum}>
            <div className={style.title}>开通人数</div>
            <div className={style.memberSum}>
              <span>{`x ${resultArr.length}人`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 支付按钮 */}
      <div>
        <PayButton vipPayType={vipType} />
      </div>
    </div>
  )
}

export default RightBlock
