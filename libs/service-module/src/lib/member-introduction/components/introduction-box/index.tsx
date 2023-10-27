import React from 'react'
import styles from './index.module.scss'
import { IInfoType, IPower } from '@flyele-nx/constant'
import divisionIcon from '../../../../assets/introduction/division.svg'
import { ReactComponent as SelectIcon } from '../../../../assets/introduction/select.svg'
import { ReactComponent as FreeSpace } from '../../../../assets/introduction/free_space.svg'
import { ReactComponent as FreeSpaceEN } from '../../../../assets/introduction/free_space_EN.svg'
import { ReactComponent as ProfessionalSpace } from '../../../../assets/introduction/professional_space.svg'
import { ReactComponent as ProfessionalSpaceEN } from '../../../../assets/introduction/professional_space_EN.svg'
import { isCN, I18N } from '@flyele-nx/i18n'

interface IProps {
  info: IInfoType
  onClickBtn?: () => void
  handleMoreEquitySpace?: () => void
}

export const IntroductionBox = ({
  info,
  onClickBtn,
  handleMoreEquitySpace
}: IProps) => {
  const {
    key,
    title,
    desc,
    bgColor,
    money,
    unit,
    moneyText,
    btnText,
    btnTextColor,
    btnBgColor,
    btnBorderColor,
    powerList
  } = info
  const isSpace = (item: IPower) => {
    if (!item.isDiyRender) return

    switch (item.isDiyRender) {
      case 'free_space':
        return isCN ? <FreeSpace /> : <FreeSpaceEN />
      case 'professional_space':
        return isCN ? <ProfessionalSpace /> : <ProfessionalSpaceEN />
      default:
        return
    }
  }

  const isProfessionnalCapacity = (item: IPower) => {
    if (!item.isDiyRender) return
    return item.isDiyRender === 'professional_space' ? (
      <div className={styles.space_division}>
        <div className={styles.professionnal_capacity}>
          {I18N.common.proTeamspaceFeatures}
        </div>
        <img src={divisionIcon} alt="" />
      </div>
    ) : (
      ''
    )
  }

  const moreEquitySpace = (key: string) => {
    if (key !== 'team') return
    return (
      <span
        className={styles.more_equity_space}
        onClick={handleMoreEquitySpace}
      >
        {I18N.common.moreEquitySpace}
      </span>
    )
  }

  return (
    <div className={styles.IntroductionBox} key={key}>
      <div className={styles.boxTop} style={{ backgroundColor: bgColor }}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
      </div>
      <div className={styles.boxContent}>
        <div className={styles.contentTop}>
          <div className={styles.topBox}>
            {moneyText ? (
              moneyText
            ) : (
              <>
                <span className={styles.smallText}>{isCN ? '¥ ' : '$ '}</span>
                {money}
                {unit && (
                  <span className={styles.smallText}>{` / ${unit}`}</span>
                )}
              </>
            )}
          </div>
          <div
            className={styles.btn}
            style={{
              color: btnTextColor,
              borderColor: btnBorderColor,
              background: btnBgColor
            }}
            onClick={() => onClickBtn && onClickBtn()}
          >
            {btnText}
          </div>
        </div>
        <div className={styles.division}>
          <img src={divisionIcon} alt="" />
        </div>
        {key === 'personal' && (
          <div className={styles.personTask} style={{ width: '192px' }}>
            {isCN ? '仅针对 个人任务' : 'For personal tasks'}
          </div>
        )}
        <div className={styles.listBox}>
          {powerList.map((item, index) => {
            return (
              <div key={index}>
                <div className={styles.listItem}>
                  <div className={styles.status}>
                    {item.active && (
                      <SelectIcon color="#1DD2C1" width={14} height={14} />
                    )}
                  </div>
                  <div className={styles.title}>{item.title}</div>
                  {isSpace(item)}
                </div>
                {isProfessionnalCapacity(item)}
              </div>
            )
          })}
        </div>
        {moreEquitySpace(key)}
      </div>
    </div>
  )
}
