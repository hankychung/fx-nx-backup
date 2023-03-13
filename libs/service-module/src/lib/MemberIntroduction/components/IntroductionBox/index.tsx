import React from 'react'
import styles from './index.module.scss'
import { IInfoType } from '@flyele-nx/constant'
import cs from 'classnames'
import divisionIcon from '../../../../assets/introduction/division.svg'

interface IProps {
  info: IInfoType
  onClickBtn?: () => void
}

export const IntroductionBox = ({ info, onClickBtn }: IProps) => {
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
                <span className={styles.smallText}>¥ </span>
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
        <div className={styles.listBox}>
          {powerList.map((item, index) => {
            return (
              <div key={index} className={styles.listItem}>
                <div
                  className={cs(styles.status, {
                    [styles.statusBg]: item.active
                  })}
                />
                <div className={styles.title}>{item.title}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
