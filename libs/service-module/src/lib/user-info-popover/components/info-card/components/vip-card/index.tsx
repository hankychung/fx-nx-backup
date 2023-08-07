/**
 author: william   email:362661044@qq.com
 create_at:2022/4/18 下午 5:13
 **/

import React, { useCallback, useMemo } from 'react'
import { TeamVipIcon, PersonVipIcon } from '@flyele-nx/icon'
import classnames from 'classnames'
// import { Scaffold } from '@/global/scaffold/service'
// import { usePayModal } from '@/hooks/usePayModal'
import dayjs from 'dayjs'
// import { SEN__touch_to_pay_rule } from '@/sensor/actions/clickPageElement'
import css from './index.module.scss'
import { useCheckVip } from '@flyele-nx/utils'

type IProps = {
  cb?: () => void
}

const normalCard =
  'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/vip/bgNormal.png'
const vipPersonCard =
  'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/vip/bgVipPerson.png'
const vipTeamCard =
  'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/vip/bgVipTeam.png'

export const VipCard = (props: IProps) => {
  const { cb } = props

  const {
    isTeamVip: isUsedToTeamVip,
    isVip: isUsedToVip,
    vip,
    isForeverVip,
    isExpiredVip,
    isPoor
  } = useCheckVip()

  // 开通过团队会员，并且没有过期
  const isTeamVip = useMemo(() => {
    return isUsedToTeamVip && !isExpiredVip
  }, [isUsedToTeamVip, isExpiredVip])

  // 开通过个人会员，并且没有过期
  const isVip = useMemo(() => {
    return isUsedToVip && !isExpiredVip
  }, [isUsedToVip, isExpiredVip])

  // const { showPayModal } = usePayModal({
  //   modalType: 'person',
  // })

  const showVipSetMeal = useCallback(() => {
    // Scaffold.of.vsController.showVipSetMeal()
    cb && cb()
  }, [cb])

  const expiredTip = useMemo(() => {
    if (isPoor || isForeverVip) return ''

    const endDay = dayjs.unix(vip.deadline).format('YYYY-MM-DD')
    const now = dayjs().format('YYYY-MM-DD')
    const between = dayjs(endDay).diff(now, 'day') + 1

    if (between <= 3) return `${between}天后到期`
    return ''
  }, [isForeverVip, isPoor, vip.deadline])

  // 团队会员
  if (isTeamVip) {
    return (
      <div>
        <div
          onClick={showVipSetMeal}
          className={classnames([css['vip-card']])}
          style={{
            backgroundImage: `url(${vipTeamCard})`,
            backgroundColor: '#A771FF'
          }}
        >
          {expiredTip && (
            <span className={css['vip-expired-tip']}>{expiredTip}</span>
          )}
          <div>
            <h1
              style={{
                color: '#fff'
              }}
            >
              团队会员
            </h1>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)'
              }}
            >
              享受个人专属权益和专业团队空间能力
            </p>
          </div>
          <footer>
            <div
              className={css.btn}
              onClick={(e) => {
                e.stopPropagation()
                // showPayModal(2)
                cb && cb()
                // SEN__touch_to_pay_rule({
                //   touch_rule: '个人-团队会员续费会员',
                //   page_name: '主导航栏-角色卡片',
                //   click_page_elements: '续费',
                // })
              }}
            >
              续费
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>
              {dayjs.unix(vip.deadline).format('YYYY年MM月DD日')}
              到期
            </p>
          </footer>
        </div>
        {vip.next_end_time && (
          <div className={css.tips}>
            <PersonVipIcon
              height={20}
              width={20}
              style={{ marginRight: '6px' }}
            />
            {isForeverVip ? (
              <span>原终身个人会员将在团队会员结束后恢复</span>
            ) : (
              <span>
                原个人会员已为你延期到
                {dayjs.unix(vip.next_end_time).format('YYYY年MM月DD日')}
                到期
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
  // 个人会员
  if (isVip) {
    return (
      <div>
        <div
          onClick={showVipSetMeal}
          className={classnames([css['vip-card']])}
          style={{
            backgroundImage: `url(${vipPersonCard})`,
            backgroundColor: '#FFCE70'
          }}
        >
          {expiredTip && (
            <span className={css['vip-expired-tip']}>{expiredTip}</span>
          )}
          <div>
            <h1
              style={{
                color: '#734C24'
              }}
            >
              个人会员
            </h1>
            <p
              style={{
                color: '#734C24'
              }}
            >
              享受个人专属权益
            </p>
          </div>
          <footer>
            {!isForeverVip && (
              <div
                className={css.btn}
                style={{ color: '#734C24' }}
                onClick={(e) => {
                  e.stopPropagation()
                  // showPayModal(1)
                  cb && cb()
                  // SEN__touch_to_pay_rule({
                  //   touch_rule: '个人-个人会员续费会员',
                  //   page_name: '主导航栏-角色卡片',
                  //   click_page_elements: '续费',
                  // })
                }}
              >
                续费
              </div>
            )}
            <div
              style={{
                color: isForeverVip ? '#734C24' : '#FFFFFF',
                backgroundColor: isForeverVip ? '#fff' : 'transparent'
              }}
              className={css.btn}
              onClick={(e) => {
                e.stopPropagation()
                // showPayModal(2)
                cb && cb()
                // SEN__touch_to_pay_rule({
                //   touch_rule: '个人-个人会员升级会员',
                //   page_name: '主导航栏-角色卡片',
                //   click_page_elements: '升级',
                // })
              }}
            >
              升级
            </div>
            <p style={{ color: '#734C24' }}>
              {isForeverVip
                ? '终身会员 永不过期'
                : `${dayjs.unix(vip.deadline).format('YYYY年MM月DD日')}到期`}
            </p>
          </footer>
        </div>
        <div className={css.tips}>
          <TeamVipIcon height={20} width={20} style={{ marginRight: '6px' }} />
          <span>升级团队会员，立享专业团队空间，</span>
          <span
            style={{ color: '#755EEF', cursor: 'pointer' }}
            onClick={showVipSetMeal}
          >
            立即查看
          </span>
        </div>
      </div>
    )
  }
  // 普通用户
  return (
    <div
      onClick={showVipSetMeal}
      className={classnames([css['vip-card']])}
      style={{
        backgroundImage: `url(${normalCard})`,
        backgroundColor: '#B5C4E1'
      }}
    >
      <div>
        <h1
          style={{
            color: '#324A7D'
          }}
        >
          开通会员
        </h1>
        <p
          style={{
            color: '#324A7D'
          }}
        >
          开通后立即享受超过25项特权
        </p>
      </div>
      <footer>
        <div
          className={css.btn}
          onClick={(e) => {
            e.stopPropagation()
            // showPayModal(1)
            cb && cb()
            // SEN__touch_to_pay_rule({
            //   touch_rule: '个人-免费账号开通会员',
            //   page_name: '主导航栏-角色卡片',
            //   click_page_elements: '开通',
            // })
          }}
        >
          开通
        </div>
        <p>你当前尚未开通</p>
      </footer>
    </div>
  )
}
