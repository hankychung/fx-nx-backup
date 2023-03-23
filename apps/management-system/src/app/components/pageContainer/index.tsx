import React, { useMemo, useState } from 'react'
import styles from './index.module.scss'
import { OrderSystemApi, OrderSystemType } from '@flyele-nx/service'
import { useMount } from 'ahooks'
import { message } from 'antd'

export interface IDataShow {
  key: string
  title: string
  value: string | number
  subTitle?: string
  unitType?: 'money' | 'person'
}

interface IProps {
  topHeight?: number // 距离顶部的高度
}

const _PageContainer: React.FC<React.PropsWithChildren<IProps>> = ({
  topHeight = 80,
  children
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [indentAnalysis, setIndentAnalysis] =
    useState<OrderSystemType.IIndentAnalysis>({
      today_indent: {
        amount: 0,
        count: 0
      },
      total_indent: {
        amount: 0,
        count: 0
      },
      month_indent: {
        amount: 0,
        count: 0
      },
      member: {
        personal_count: 0,
        team_count: 0
      }
    })

  /**
   * 请求订单统计数据
   */
  const fetchIndentAnalysis = async () => {
    try {
      const { code, data } = await OrderSystemApi.getIndentAnalysis()
      if (code === 0) {
        setIndentAnalysis(data)
      }
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: '获取订单统计数据失败'
      })
    }
  }

  const dataArray: IDataShow[] = useMemo(() => {
    const { today_indent, month_indent, total_indent, member } = indentAnalysis
    return [
      {
        key: 'today',
        title: '今日订单',
        value: today_indent.amount,
        subTitle: `${today_indent.count}个`,
        unitType: 'money'
      },
      {
        key: 'month',
        title: '本月订单',
        value: month_indent.amount,
        subTitle: `${month_indent.count}个`,
        unitType: 'money'
      },
      {
        key: 'all',
        title: '累计订单',
        value: total_indent.amount,
        subTitle: `${total_indent.count}个`,
        unitType: 'money'
      },
      {
        key: 'personal',
        title: '个人会员数量',
        value: member.personal_count,
        unitType: 'person'
      },
      {
        key: 'team',
        title: '团队会员数量',
        value: member.team_count,
        unitType: 'person'
      }
    ]
  }, [indentAnalysis])

  useMount(async () => {
    await fetchIndentAnalysis()
  })

  return (
    <div
      className={styles.pageContainerRoot}
      style={{ height: `calc(100vh - ${topHeight}px)` }}
    >
      {contextHolder}
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          {dataArray.map((item) => {
            return (
              <div key={item.key} className={styles.dataItem}>
                <div className={styles.dataTitleBox}>
                  <div className={styles.title}>{item.title}</div>
                  {item.subTitle && (
                    <div className={styles.subTitle}>{item.subTitle}</div>
                  )}
                </div>
                <div className={styles.valueBox}>
                  {item.unitType === 'money' && (
                    <span className={styles.money}>¥</span>
                  )}
                  <span>{item.value}</span>
                  {item.unitType === 'person' && (
                    <span className={styles.person}>人</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.contentRight}>{children}</div>
      </div>
      <div className={styles.copyright}>
        Copyright © 2023-2023 Flyele. All Rights Reserved.
      </div>
    </div>
  )
}

export const PageContainer = React.memo(_PageContainer)
