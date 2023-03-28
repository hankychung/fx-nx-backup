import React, { useEffect, useMemo, useState } from 'react'
import { message, Modal } from 'antd'
import styles from './index.module.scss'
import { FlyButton } from '@flyele/flyele-components'
import cs from 'classnames'
import { OrderSystemType, OrderSystemApi } from '@flyele-nx/service'
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
    return [
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
  }, [userInfo])

  useEffect(() => {
    if (open && userId) {
      fetchUsersInfo(userId)
    }
  }, [open, userId, fetchUsersInfo])

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
          <div className={styles.userName}>{userInfo?.user_name}</div>
          <div className={styles.descBox}>
            <div>{userInfo?.user_id}</div>
            <div className={styles.time}>{`于${
              userInfo?.create_at
                ? dayjs.unix(userInfo.create_at).format('YYYY年M月D日')
                : ''
            }注册`}</div>
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
            查看TA的订单
          </FlyButton>
        </div>
      </div>
    </Modal>
  )
}
