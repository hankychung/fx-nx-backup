import React, { useEffect, useMemo, useState } from 'react'
import { message, Modal } from 'antd'
import styles from './index.module.scss'
import {
  OrderSystemApi,
  OrderSystemConst,
  OrderSystemType
} from '@flyele-nx/service'
import dayjs from 'dayjs'
import cs from 'classnames'
import { useMemoizedFn } from 'ahooks'

interface listData {
  key: string
  title: string
  value: string
}

export const OrderDetailModal = ({
  open,
  data,
  onClickName,
  onClose
}: {
  open: boolean
  data: OrderSystemType.IIndentList | null
  onClickName: () => void
  onClose: () => void
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [indentDetail, setIndentDetail] =
    useState<OrderSystemType.IIndentDetails | null>(null)

  /**
   * 获取订单详情
   */
  const getOrderDetails = useMemoizedFn(async (id: string) => {
    try {
      const { code, data } = await OrderSystemApi.getIndentDetail(id)

      if (code === 0) {
        setIndentDetail(data)
      }
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: '获取订单详情失败'
      })
    }
  })

  const formList: Array<{
    key: string
    title: string
    haveBorder: boolean
    data: listData[]
    tableHeader?: {
      userInfo: string
      beforePayEndAt: string
      afterPayEndAt: string
    }
    tableData?: Array<
      OrderSystemType.IIndentDetailsUser & {
        beforePayEndAt: string
        afterPayEndAt: string
      }
    >
  }> = useMemo(() => {
    if (!indentDetail) return []

    const memberTypeLabel = {
      [OrderSystemConst.IndentListMemberType.PERSONAL]: '个人会员',
      [OrderSystemConst.IndentListMemberType.TEAM]: '团队会员',
      [OrderSystemConst.IndentListMemberType.CORP]: '企业版'
    }

    const getDateLabel = (date: number) =>
      dayjs.unix(date).format('YYYY年M月D日')

    const personalState = {
      key: 'personalState',
      title: '会员状态变化',
      haveBorder: true,
      data: [
        {
          key: 'before_pay_end_at',
          title: '支付前到期时间',
          value: `${memberTypeLabel[indentDetail.indent_member_type]}·${
            indentDetail.users[0]
              ? getDateLabel(indentDetail.users[0].before_pay_end_at)
              : ''
          }`
        },
        {
          key: 'after_pay_end_at',
          title: '支付后到期时间',
          value: `${memberTypeLabel[indentDetail.indent_member_type]}·${
            indentDetail.users[0]
              ? getDateLabel(indentDetail.users[0].after_pay_end_at)
              : ''
          }`
        }
      ]
    }

    const corpState = {
      key: 'corpState',
      title: '企业状态变化',
      haveBorder: true,
      data: [
        {
          key: 'before_pay_end_at',
          title: '支付前',
          value: `${memberTypeLabel[indentDetail.indent_member_type]}·${
            indentDetail.corporation &&
            indentDetail.corporation.before_pay_end_at
              ? getDateLabel(indentDetail.corporation.before_pay_end_at)
              : ''
          }`
        },
        {
          key: 'after_pay_end_at',
          title: '支付后',
          value: `${memberTypeLabel[indentDetail.indent_member_type]}·${
            indentDetail.corporation &&
            indentDetail.corporation.after_pay_end_at
              ? getDateLabel(indentDetail.corporation.after_pay_end_at)
              : ''
          }`
        }
      ]
    }

    const teamState = {
      key: 'teamState',
      title: '会员状态变化',
      haveBorder: true,
      tableHeader: {
        userInfo: '开通对象',
        beforePayEndAt: '支付前到期时间',
        afterPayEndAt: '支付后到期时间'
      },
      tableData: indentDetail.users.map((item) => {
        return {
          ...item,
          beforePayEndAt: item.before_pay_end_at
            ? dayjs.unix(item.before_pay_end_at).format('YYYY年M月D日')
            : '未开通',
          afterPayEndAt: item.after_pay_end_at
            ? dayjs.unix(item.after_pay_end_at).format('YYYY年M月D日')
            : '未开通'
        }
      }),
      data: []
    }

    const corpInfo = {
      key: 'corpInfo',
      title: '企业信息',
      haveBorder: true,
      data: [
        {
          key: 'info',
          title: '',
          value: `${indentDetail?.corporation?.corporation_name}（来自${indentDetail?.origin_route}）`
        },
        {
          key: 'corpId',
          title: indentDetail?.corporation?.corporation_id || '',
          value: ''
        }
      ]
    }

    // 订单相关 开始
    let orderData = [
      {
        key: 'indent_num',
        title: '订单ID',
        value: indentDetail.indent_num
      },
      {
        key: 'indent_member_attr',
        title: '订单类型',
        value:
          OrderSystemConst.IndentMemberAttrLabel[
            indentDetail.indent_member_attr
          ]
      },
      {
        key: 'origin_route',
        title: '订单渠道',
        value: indentDetail.origin_route
      }
    ]

    if (
      indentDetail.indent_member_type ===
      OrderSystemConst.IndentListMemberType.TEAM
    ) {
      orderData = orderData.filter((data) => data.key !== 'indent_member_attr')
      orderData.push({
        key: 'workspace',
        title: '关联空间',
        value: '无'
      })
    }

    const orderInfo = {
      key: 'orderInfo',
      title: '订单相关',
      haveBorder: true,
      data: orderData
    }
    // 订单相关 结束

    // 支付相关 开始
    let payInfoData: listData[] = []

    if (indentDetail.state === OrderSystemConst.IndentState.SUCCESS) {
      payInfoData = [
        {
          key: 'total_price',
          title: '支付金额',
          value: `¥${indentDetail.total_price} （原价¥${indentDetail.should_price}）`
        },
        {
          key: 'price',
          title: '使用折扣',
          value: `共减去¥${
            indentDetail.should_price - indentDetail.total_price
          }`
        },
        {
          key: 'order_method',
          title: '支付方式',
          value: OrderSystemConst.OrderMethodLabel[indentDetail.order_method]
        },
        {
          key: 'transaction_id',
          title: '支付ID',
          value: indentDetail.transaction_id
        },
        {
          key: 'payment_at',
          title: '支付时间',
          value: dayjs
            .unix(indentDetail.payment_at)
            .format('YYYY年M月D日 hh:mm:ss')
        }
      ]
    }

    const payInfo = {
      key: 'payInfo',
      title: '支付相关',
      haveBorder: false,
      data: [
        {
          key: 'state',
          title: '支付状态',
          value: OrderSystemConst.IndentStateLabel[indentDetail.state]
        },
        ...payInfoData
      ]
    }
    // 支付相关 结束

    const resArray = []

    switch (indentDetail.indent_member_type) {
      case OrderSystemConst.IndentListMemberType.PERSONAL:
        resArray.push(personalState, orderInfo, payInfo)
        break
      case OrderSystemConst.IndentListMemberType.TEAM:
        resArray.push(teamState, orderInfo, payInfo)
        break
      case OrderSystemConst.IndentListMemberType.CORP:
        resArray.push(corpInfo, corpState, payInfo)
        break
      default:
        console.log('订单属性匹配不上')
        break
    }

    return resArray
  }, [indentDetail])

  useEffect(() => {
    if (data && open) {
      const { id } = data
      getOrderDetails(id)
    }
  }, [open, data, getOrderDetails])

  return (
    <Modal
      open={open}
      width={534}
      centered
      destroyOnClose
      footer={null}
      onCancel={onClose}
    >
      <>
        {contextHolder}
        {indentDetail ? (
          <div className={styles.modalRoot}>
            <div className={styles.topBox}>
              <div className={styles.topRow}>
                <div className={styles.nameBox}>
                  <span className={styles.name} onClick={() => onClickName()}>
                    {indentDetail.creator.user_name}
                  </span>
                  <span>的订单</span>
                </div>
                <div
                  className={styles.orderNo}
                >{`订单号：${indentDetail.indent_num}`}</div>
              </div>
              <div className={styles.topRow}>
                <div
                  className={styles.memberState}
                >{`${indentDetail.indent_content}`}</div>
                <div className={styles.moneyBox}>
                  <span className={styles.moneyUnit}>¥</span>
                  <span>{indentDetail.total_price}</span>
                </div>
              </div>
            </div>
            <div className={styles.contentBox}>
              {formList.map((form) => {
                return (
                  <div
                    key={form.key}
                    className={cs(styles.content, {
                      [styles.contentBorder]: form.haveBorder
                    })}
                  >
                    <div className={styles.contentLeft}>{form.title}</div>
                    <div className={styles.contentRight}>
                      {form.key === 'teamState' ? (
                        <div className={styles.table}>
                          <div
                            className={cs(styles.tableHeader, styles.tableRow)}
                          >
                            <div className={styles.tableItem}>
                              {form.tableHeader && form.tableHeader.userInfo}
                            </div>
                            <div className={styles.tableItem}>
                              {form.tableHeader &&
                                form.tableHeader.beforePayEndAt}
                            </div>
                            <div className={styles.tableItem}>
                              {form.tableHeader &&
                                form.tableHeader.afterPayEndAt}
                            </div>
                          </div>
                          <div className={styles.tableContent}>
                            {form.tableData &&
                              form.tableData.map((td, idx) => {
                                return (
                                  <div
                                    key={`${td.user_id}-${idx}`}
                                    className={styles.tableRow}
                                  >
                                    <div>
                                      <div>{td.user_name}</div>
                                      <div className={styles.greyText}>
                                        {td.telephone}
                                      </div>
                                    </div>
                                    <div>{td.beforePayEndAt}</div>
                                    <div>{td.afterPayEndAt}</div>
                                  </div>
                                )
                              })}
                          </div>
                        </div>
                      ) : (
                        form.data.map((item) => {
                          return (
                            <div
                              key={item.key}
                              className={styles.normalItemRow}
                            >
                              {item.title && (
                                <div className={styles.itemTitle}>
                                  {item.title}
                                </div>
                              )}
                              {item.value && (
                                <div className={styles.itemValue}>
                                  {item.value}
                                </div>
                              )}
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </>
    </Modal>
  )
}
