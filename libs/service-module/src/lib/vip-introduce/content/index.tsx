import React, { useCallback } from 'react'
import { ReactComponent as VectorIcon } from '../../../assets/vip-introduce/vector.svg'
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
    isVip,
    isTeamVip
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
      // 是团队会员，并且当前是个人会员列
      if (isTeamVip && item.key === 'personal') {
        return ''
      }

      // 已经开通了团队会员或者个人会员
      if (
        (item.key === 'personal' && isVip) ||
        (item.key === 'team' && isTeamVip)
      ) {
        return '续费使用'
      }
      return item.btnText
    },
    [isVip, isTeamVip]
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
                  <VectorIcon />
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
                  <span>{item.desc}</span>
                </div>
              </div>
              <div className={css.content}>
                {item.powerList.map((power) => (
                  <p key={power.title}>{power.title}</p>
                ))}
              </div>
              <div className={css.footer}>
                <p>
                  <span className={css.small}>¥</span>
                  <span>{item.money}</span>
                  <span className={css.small}>{item.unit}</span>
                  <span className={classNames(css.gray, css.small)}>
                    {item.oldPrice}
                  </span>
                </p>
                {btnText && (
                  <Button
                    style={{ background: item.btnBgColor }}
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
