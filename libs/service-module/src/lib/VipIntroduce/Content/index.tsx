import React from 'react'
import { ReactComponent as VectorIcon } from '../../../assets/vip-introduce/vector.svg'
import { Button } from 'antd'
import classNames from 'classnames'
import css from './index.module.scss'
import { memberPowerStaticData } from './packages_const'

export const VipIntroduceContent = () => {
  return (
    <div className={css.container}>
      {memberPowerStaticData.map((item) => {
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
                {item.btnText && (
                  <Button style={{ background: item.btnBgColor }}>
                    {item.btnText}
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
