import React, { useMemo, FC } from 'react'
import dayjs from 'dayjs'
import cs from 'classnames'
import { useEnterprise } from '@flyele-nx/utils'
import style from './index.module.scss'

export const EnterpriseCard: FC = () => {
  const { enterprise, isEnterprisePaid, isEnterpriseTrial } = useEnterprise()
  const { expired_time } = enterprise

  const expiredInfo = useMemo(() => {
    const expiredDay = dayjs.unix(expired_time)
    const text = expiredDay.format('YYYY年MM月DD日到期')
    const isExpired = expired_time - dayjs().unix() < 0
    let tag = ''

    if (isExpired) {
      tag = '已过期'
    } else {
      const diffDays = expiredDay.diff(dayjs(), 'days')

      if (isEnterpriseTrial) {
        if (diffDays <= 7) {
          tag = `${diffDays}天后过期`
        }
      } else if (isEnterprisePaid) {
        tag = `${diffDays}天后过期`
      }
    }

    return { text, isExpired, tag }
  }, [expired_time, isEnterprisePaid, isEnterpriseTrial])

  const info = useMemo(() => {
    let title = ''
    let footerText = ''

    if (isEnterpriseTrial) {
      title = '企业微信体验版'
      footerText = '可到企业微信 应用市场 升级'
    } else if (isEnterprisePaid) {
      title = '企业微信专业版'
      footerText = '可到企业微信 应用市场 续费'
    }

    return { title, footerText }
  }, [isEnterprisePaid, isEnterpriseTrial])

  const onClickDetail = () => {
    console.log('onClickDetail')
  }

  const onClickUpgrade = () => {
    window.open('https://www.feixiang.cn/')
  }

  return (
    <div
      className={cs(
        style.wrap,
        isEnterpriseTrial && style.wrap_exp,
        isEnterprisePaid && style.wrap_pro
      )}
    >
      {expiredInfo.tag.length > 0 && (
        <div className={style.tag}>{expiredInfo.tag}</div>
      )}
      <div className={style.title}>{info.title}</div>
      <div className={style.expired}>{expiredInfo.text}</div>
      <div className={style.footer}>
        <div className={style.footer_btn} onClick={onClickDetail}>
          查看详情
        </div>
        <div className={style.footer_text} onClick={onClickUpgrade}>
          {info.footerText}
        </div>
      </div>
    </div>
  )
}
