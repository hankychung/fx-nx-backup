/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-08 09:43:55
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-21 16:50:15
 * @FilePath: /electron-client/app/components/PersonPayModal/components/PersonVip/components/RightBlock/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { I18N, isCN } from '@flyele-nx/i18n'
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import cs from 'classnames'
import { ReactComponent as MealTime } from '../../../../../../assets/payImg/meal_time.svg'
import style from './index.module.scss'
import PayButton from '../../../pay-button'
import { SelectMemberContext } from '../../../../context/context'
import { VipPayType } from '../../../controller'
import { IFlyeleAvatarItem } from '../../../../../pay-modal'
import { useCurrentTime } from '../../../../hooks/useCurrentTime'
import { IActiveGoods, ICoupon } from '@flyele-nx/api'
import { paymentApi } from '@flyele-nx/service'
import * as dayjs from 'dayjs'
import { getResidueTime, regFenToYuan } from '../../../../utils'
import { useMemoizedFn } from 'ahooks'

const RightBlock = ({
  vipType,
  mineInfo,
  upSpace,
  goProtocol,
  showMsg,
  orderId
}: {
  vipType: VipPayType
  mineInfo?: IFlyeleAvatarItem
  upSpace?: () => void
  goProtocol: () => void
  showMsg?: () => void
  orderId: string
}) => {
  const service = useContext(SelectMemberContext)
  const [vipMeal, setVipMeal] = useState<IActiveGoods>() // 套餐list
  const [resultArr, setResultArr] = useState<IFlyeleAvatarItem[]>([])
  const { nowScecond } = useCurrentTime()
  const defaultValue = useRef(false)

  useEffect(() => {
    service.addListener((ev) => {
      const { event } = ev

      switch (event) {
        case 'selectMember':
          setResultArr(service.getData('selectMember').list)
          setTimeout(() => {
            defaultValue.current = true
          }, 300)
          break

        default:
      }
    })

    return () => {
      service.dispose()
    }
  }, [service])

  const getItem = (id: number, list: ICoupon[]) => {
    return list.filter((item) => +item.ref_goods_id === id)
  }
  const getMealList = useMemoizedFn(async () => {
    paymentApi.createCoupon({ coupon_id: [1, 2, 3, 4, 5, 6, 7] }).then((_) => {
      paymentApi.getGoodsList({ good_type: 'team' }).then((res) => {
        if (res.code === 0) {
          const new_arr = res.data.map((item) => {
            const arr = getItem(item.id, _.data || [])
            if (arr.length > 0) {
              const num = arr[0].end_at
                ? dayjs.unix(arr[0].end_at).valueOf() / 1000
                : 0 //结束时间
              return {
                ...arr[0],
                ...item,
                active: false,
                price:
                  arr[0].end_at && getResidueTime(num - nowScecond) === '0'
                    ? 0
                    : arr[0].price
              }
            }
            return {
              ...item,
              active: false
            }
          })
          setVipMeal(new_arr[0])
        }
      })
    })
  })
  //获取套餐
  useEffect(() => {
    getMealList()
  }, [getMealList])
  const num = useMemo(() => {
    return dayjs.unix(vipMeal?.end_at || 0).valueOf() / 1000 //结束时间  毫秒数
  }, [vipMeal])
  const payClick = useCallback(
    (options?: { doNotShow?: boolean }) => {
      if (defaultValue.current) {
        if (
          resultArr.length === 0 &&
          VipPayType.UPSPACE === vipType &&
          mineInfo?.isTeamVip
        ) {
          upSpace && upSpace()
          return
        }
        if (
          (resultArr.length === 0 && VipPayType.UPSPACE !== vipType) ||
          (VipPayType.UPSPACE === vipType &&
            !mineInfo?.isTeamVip &&
            resultArr.length === 0)
        ) {
          showMsg && showMsg()
          return
        }
        service.showPay({
          show: !options?.doNotShow,
          payInfo: vipMeal,
          userInfo: resultArr
        })
      }
    },
    [resultArr, vipMeal, mineInfo, service, vipType, upSpace, showMsg]
  )

  useEffect(() => {
    if (isCN) return

    payClick({ doNotShow: true })
  }, [payClick])

  //修改优惠
  useEffect(() => {
    if (
      vipMeal?.end_at &&
      getResidueTime(num - nowScecond) === '0' &&
      vipMeal.price
    ) {
      setVipMeal({ ...vipMeal, price: 0, coupon_id: 0 })
    }
  }, [nowScecond, vipMeal, num, setVipMeal])
  const isOldUser = useMemo(() => {
    const start = dayjs.unix(vipMeal?.create_at || 0).valueOf() / 1000 //结束时间  毫秒数
    const end = dayjs.unix(vipMeal?.end_at || 0).valueOf() / 1000 //结束时间  毫秒数
    const totalSeconds = end - start
    const day = parseInt(`${totalSeconds / 3600 / 24}`)
    return day > 5 ? true : false
  }, [vipMeal])
  return (
    <div className={style.rightBlock}>
      <div>
        <div className={style.lable}>{I18N.common.packageContent}</div>
        <div className={style.mealBlock}>
          <div className={style.vip_title}>{I18N.common.teamPackage}</div>
          <div className={style.mealList}>
            <div
              className={cs(style.mealItem, {
                [style.activeStyle]: true
              })}
              onClick={() => {
                // mealSelect(_)
              }}
            >
              <div className={style.name}>{I18N.common.business}</div>
              <div className={style.price}>
                {vipMeal?.original_price && isCN && (
                  <span>
                    <i>￥</i>
                    <span>{regFenToYuan(vipMeal?.original_price || 0)}</span>
                  </span>
                )}
                <div>
                  <span>{isCN ? '￥' : '$'}</span>
                  {`${regFenToYuan(
                    (vipMeal?.now_price || 0) - (vipMeal?.price || 0) || 0
                  )}${I18N.common.regFe}`}
                </div>
              </div>
              {vipMeal?.end_at && getResidueTime(num - nowScecond) !== '0' && (
                <div className={style.time}>
                  <span>
                    {getResidueTime(
                      num - nowScecond,
                      (
                        (vipMeal?.now_price - (vipMeal.price || 0)) /
                        vipMeal?.original_price
                      ).toFixed(2),
                      isOldUser
                    )}
                  </span>
                  <MealTime className={style.mealTime}></MealTime>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={style.memberList}>
          <div className={style.lable_sum}>
            <div className={style.title}>{I18N.common.numberOfUsersOpened}</div>
            <div className={style.memberSum}>
              <span>{`x ${resultArr.length}${isCN ? '人' : ''}`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 支付按钮 */}
      <div>
        <PayButton
          payClick={payClick}
          resultArr={resultArr}
          activeGood={vipMeal ? [vipMeal] : []}
          vipType={vipType}
          mineInfo={mineInfo}
          goProtocol={goProtocol}
          orderId={orderId}
        />
      </div>
    </div>
  )
}

export default RightBlock
