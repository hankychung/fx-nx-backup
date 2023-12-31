import React, { useCallback } from 'react'
import { ReactComponent as VectorIcon } from '../../../assets/vip-introduce/vector.svg'
import { ReactComponent as ArrowIcon } from '../../../assets/vip-introduce/arrow.svg'
import { ReactComponent as SelectIcon } from '../../../assets/introduction/select.svg'
import { ReactComponent as FreeSpace } from '../../../assets/introduction/free_space.svg'
import { ReactComponent as FreeSpaceEN } from '../../../assets/introduction/free_space_EN.svg'
import { ReactComponent as ProfessionalSpace } from '../../../assets/introduction/professional_space.svg'
import { ReactComponent as ProfessionalSpaceEN } from '../../../assets/introduction/professional_space_EN.svg'
import divisionIcon from '../../../assets/introduction/division.svg'

import { Button } from 'antd'
import css from './index.module.scss'
import {
  memberPowerStaticData,
  memberPowerStaticDataEN
} from './packages_const'
import { IInfoType, IPower, VipIntroduceContentProps } from '../types'
import { FlyTooltip } from '@flyele/flyele-components'
import { I18N, isCN } from '@flyele-nx/i18n'

export const VipIntroduceContent = (props: VipIntroduceContentProps) => {
  const {
    personVipBtnClick,
    teamVipBtnClick,
    customBtnClick,
    descBtnClick,
    equitySpaceClick,
    isVip,
    isTeamVip,
    isForeverVip
  } = props

  const isProfessionnalCapacity = (item: IPower) => {
    if (!item.isSpace) return
    return item.isSpace === 'professional_space' ? (
      <div className={css.space_division}>
        <div className={css.professionnal_capacity}>
          <span>{I18N.common.proTeamspaceFeatures}</span>
        </div>
        <img src={divisionIcon} alt="" />
      </div>
    ) : (
      ''
    )
  }

  const dataList = isCN ? memberPowerStaticData : memberPowerStaticDataEN

  const isSpace = (item: IPower) => {
    if (!item) return
    switch (item.isSpace) {
      case 'free_space':
        return (
          <div className={css.space_free_professional}>
            {isCN ? (
              <FreeSpace onClick={equitySpaceClick} />
            ) : (
              <FreeSpaceEN onClick={equitySpaceClick} />
            )}
          </div>
        )
      case 'professional_space':
        return (
          <div className={css.space_free_professional}>
            {isCN ? (
              <ProfessionalSpace onClick={equitySpaceClick} />
            ) : (
              <ProfessionalSpaceEN onClick={equitySpaceClick} />
            )}
          </div>
        )
      default:
        return
    }
  }

  const handleBtnClick = (item: IInfoType) => {
    switch (item.key) {
      case 'free':
        break
      case 'personal':
        personVipBtnClick?.(item)
        break
      case 'team':
        teamVipBtnClick?.(item)
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
      if (item.key === 'personal' && isVip) return I18N.common.renewal
      if (item.key === 'team' && isVip) return I18N.common.upgradeToUse
      if (item.key === 'team' && isTeamVip) return I18N.common.renewal
      return item.btnText
    },
    [isVip, isTeamVip, isForeverVip]
  )

  return (
    <div className={css.container}>
      {dataList.map((item) => {
        const btnText = fillterBtnText(item)
        return (
          <div className={css.card} key={item.key}>
            <div className={css.top} style={{ backgroundColor: item.bgColor }}>
              {item.topText && (
                <>
                  <VectorIcon style={{ marginRight: 2 }} />
                  {I18N.common.popular}
                </>
              )}
            </div>
            <div
              className={css.body}
              style={{ border: `1px solid ${item.borderColor}` }}
            >
              <div
                className={css.header}
                style={{ borderBottom: `1px dashed ${item.borderColor}` }}
              >
                <div className={css.title}>
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
                {item.key !== 'custom' && (
                  <div className={css.priceBox}>
                    <span className={css.smallText}>
                      {I18N.common.moneyUnit}
                    </span>
                    {item.money}
                    {item.unit && (
                      <span className={css.smallText}>{` / ${item.unit}`}</span>
                    )}
                    {!isCN && item.key === 'team' && (
                      <div className={css.priceBoxBottom}>per member</div>
                    )}
                  </div>
                )}
              </div>
              <div className={css.content}>
                {item.key === 'personal' && (
                  <div className={css.personTask} style={{ width: '192px' }}>
                    {isCN ? '仅针对 个人任务' : 'For personal tasks'}
                  </div>
                )}
                {item.powerList.map((power, index) => (
                  <>
                    <div key={index} className={css.contentItem}>
                      {power.active && (
                        <SelectIcon color="#1DD2C1" width={14} height={14} />
                      )}
                      <div
                        key={power.title}
                        style={{
                          marginLeft: 5,
                          marginRight: 4,
                          color: '#535353',
                          fontWeight: 'normal'
                        }}
                      >
                        {power.title}
                      </div>
                      <FlyTooltip
                        text={I18N.common.checkSpaceRightsByClick}
                        trigger="hover"
                        zIndex={1003}
                      >
                        {isSpace(power)}
                      </FlyTooltip>
                    </div>
                    {isProfessionnalCapacity(power)}
                  </>
                ))}
              </div>
              <div className={css.footer}>
                {/* <p>
                  {!['custom'].includes(item.key) && (
                    <span className={css.small}>¥</span>
                  )}
                  <span>{item.money}</span>
                  <span className={css.small}>
                    {['personal', 'team'].includes(item.key) && '/'}
                    {item.unit}
                  </span>
                  <span
                    className={classNames(css.gray, css.small)}
                    style={{ marginLeft: 8, fontWeight: 'normal' }}
                  >
                    {item.oldPrice}
                  </span>
                </p> */}
                {item.key === 'custom' && isCN && (
                  <div className={css.priceConsultation}>价格咨询</div>
                )}
                {btnText && (
                  <Button
                    style={{ background: item.btnBgColor, height: 36 }}
                    onClick={() => handleBtnClick({ ...item, btnText })}
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
