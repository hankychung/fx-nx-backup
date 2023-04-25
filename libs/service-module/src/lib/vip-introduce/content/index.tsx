import React, { useCallback } from 'react'
import { ReactComponent as VectorIcon } from '../../../assets/vip-introduce/vector.svg'
import { ReactComponent as ArrowIcon } from '../../../assets/vip-introduce/arrow.svg'
import { Button } from 'antd'
import classNames from 'classnames'
import css from './index.module.scss'
import { memberPowerStaticData } from './packages_const'
import { IInfoType, VipIntroduceContentProps } from '../types'

export const VipIntroduceContent = (props: VipIntroduceContentProps) => {
  const {
    personVipBtnClick,
    teamVipBtnClick,
    customBtnClick,
    descBtnClick,
    isVip,
    isTeamVip,
    isForeverVip
  } = props

  const handleBtnClick = (key: string) => {
    switch (key) {
      case 'free':
        break
      case 'personal':
        personVipBtnClick?.(isVip)
        break
      case 'team':
        teamVipBtnClick?.(isTeamVip)
        break
      case 'custom':
        customBtnClick?.()
        break
    }
  }

  const fillterBtnText = useCallback(
    (item: IInfoType) => {
      // 是团队会员或者个人永久会员，并且当前是个人会员列
      if ((isTeamVip || isForeverVip) && item.key === 'personal') {
        return ''
      }

      // 已经开通了团队会员或者个人会员
      if (item.key === 'personal' && isVip) return '续费使用'
      if (item.key === 'team' && isVip) return '升级使用'
      if (item.key === 'team' && isTeamVip) return '续费使用'
      return item.btnText
    },
    [isVip, isTeamVip, isForeverVip]
  )

  return (
    <div className={css.container}>
      {memberPowerStaticData.map((item) => {
        const btnText = fillterBtnText(item)
        return (
          <div className={css.card} key={item.key}>
            <div className={css.top} style={{ backgroundColor: item.bgColor }}>
              {item.topText && (
                <>
                  <VectorIcon style={{ marginRight: 2 }} />
                  热门推荐
                </>
              )}
            </div>
            <div
              className={css.body}
              style={{ border: `1px solid ${item.borderColor}` }}
            >
              <div className={css.header}>
                <div
                  className={css.title}
                  style={{ borderBottom: `1px dashed ${item.borderColor}` }}
                >
                  <h1>{item.title}</h1>
                  {item.desc && (
                    <span className={css.desc} onClick={descBtnClick}>
                      <a
                      // target="_blank"
                      // href="https://official-website-test.flyele.vip/interests-introduction"
                      >
                        {item.desc}
                      </a>
                      {/* <i>&gt;</i> */}
                      <ArrowIcon
                        style={{ marginLeft: 4, width: 6, height: 8 }}
                      />
                    </span>
                  )}
                </div>
              </div>
              <div className={css.content}>
                {item.powerList.map((power) => (
                  <div key={power.title}>{power.title}</div>
                ))}
              </div>
              <div className={css.footer}>
                <p>
                  {!['custom'].includes(item.key) && (
                    <span className={css.small}>¥</span>
                  )}
                  <span>{item.money}</span>
                  <span className={css.small}>
                    {['personal', 'team'].includes(item.key) && '/'}
                    {item.unit}
                  </span>
                  <span className={classNames(css.gray, css.small)} style={{ marginLeft: 8, fontWeight: 'normal' }}>
                    {item.oldPrice}
                  </span>
                </p>
                {btnText && (
                  <Button
                    style={{ background: item.btnBgColor, height: 36 }}
                    onClick={() => handleBtnClick(item.key)}
                  >
                    {btnText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
