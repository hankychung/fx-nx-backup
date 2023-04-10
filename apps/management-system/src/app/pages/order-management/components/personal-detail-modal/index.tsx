import React, { useEffect, useMemo, useState } from 'react'
import { message, Modal } from 'antd'
import styles from './index.module.scss'
import { FlyButton } from '@flyele/flyele-components'
import cs from 'classnames'
import {
  OrderSystemType,
  OrderSystemApi,
  OrderSystemConst
} from '@flyele-nx/service'
import dayjs from 'dayjs'
import { useMemoizedFn } from 'ahooks'

export const PersonalDetailModal = ({
  open,
  data,
  userId,
  onClose,
  showOrder
}: {
  open: boolean
  userId: string
  data: OrderSystemType.IIndentList | null
  onClose: () => void
  showOrder: (data: OrderSystemType.IIndentList | null) => void
}) => {
  const [isCorp, setIsCorp] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const [userInfo, setUserInfo] = useState<OrderSystemType.IUserInfo | null>(
    null
  )

  /**
   * 请求用户信息
   */
  const fetchUsersInfo = useMemoizedFn(async (userId: string) => {
    try {
      const { data } = await OrderSystemApi.getUserInfo(userId)
      setUserInfo(data)
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: '请求用户信息失败'
      })
    }
  })

  const formData = useMemo(() => {
    return isCorp
      ? [
          {
            key: 'appStatus',
            title: '企业版本状态',
            value: data && data.corporation ? data.corporation.app_status : ''
          }
        ]
      : [
          {
            key: 'personalState',
            title: '个人会员状态',
            value: `${
              userInfo?.personal_end_at
                ? `已开通 · 有效期至${dayjs
                    .unix(userInfo?.personal_end_at)
                    .format('YYYY年M月D日')}`
                : '未开通'
            }`
          },
          {
            key: 'teamState',
            title: '团队会员状态',
            value: userInfo?.team_end_at
              ? `已开通 · 有效期至${dayjs
                  .unix(userInfo?.team_end_at)
                  .format('YYYY年M月D日')}`
              : '未开通',
            extendCls: styles.greyText
          },
          {
            key: 'telephone',
            title: '手机号',
            value: userInfo?.telephone
          }
        ]
  }, [data, isCorp, userInfo])

  useEffect(() => {
    if (open && userId && data) {
      if (
        data.indent_member_type === OrderSystemConst.IndentListMemberType.CORP
      ) {
        setIsCorp(true)
      } else {
        setIsCorp(false)
        fetchUsersInfo(userId)
      }
    }
  }, [open, userId, fetchUsersInfo, data])

  return (
    <Modal
      open={open}
      width={400}
      centered
      destroyOnClose
      footer={null}
      onCancel={onClose}
    >
      <div className={styles.modalRoot}>
        {contextHolder}
        <div className={styles.topBox}>
          <div className={styles.userName}>
            {isCorp
              ? `${data?.corporation?.corporation_name}（来自${data?.origin_route}）`
              : userInfo?.user_name}
          </div>
          <div className={styles.descBox}>
            <div>
              {isCorp ? data?.corporation?.corporation_id : userInfo?.user_id}
            </div>
            {!isCorp && (
              <div className={styles.time}>{`于${
                userInfo?.create_at
                  ? dayjs.unix(userInfo.create_at).format('YYYY年M月D日')
                  : ''
              }注册`}</div>
            )}
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.content}>
          {formData.map((item) => {
            return (
              <div key={item.key} className={styles.row}>
                <div className={styles.rowLeft}>{item.title}</div>
                <div className={cs(styles.rowRight, item.extendCls)}>
                  {item.value}
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.footer}>
          <FlyButton theme="primary" onClick={() => showOrder(data)}>
            {isCorp ? '查看企业订单' : '查看TA的订单'}
          </FlyButton>
        </div>
      </div>
    </Modal>
  )
}
