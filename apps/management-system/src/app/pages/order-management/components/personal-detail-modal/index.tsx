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

  /**
   * 是否企业微信用户
   */
  const isCorpUser = useMemo(() => {
    return userInfo && userInfo?.user_type === OrderSystemConst.UserType.CORP
  }, [userInfo])

  /**
   * 是否企业
   * 注意区分上面的 是否企业微信用户
   * 上面的企业微信用户 显示界面的优先级 高于 此是否企业
   */
  const isShowCorpMode = useMemo(() => {
    const isCorp =
      data &&
      data.indent_member_type === OrderSystemConst.IndentListMemberType.CORP
    return isCorp && !isCorpUser && userId === ''
  }, [data, isCorpUser, userId])

  const formData: Array<{
    key: string
    title: string
    value: string
    extendCls?: string
    extendRowCls?: string
  }> = useMemo(() => {
    const normal = [
      {
        key: 'personalState',
        title: '个人会员状态',
        value: `${
          userInfo?.personal_end_at
            ? `已开通 · 有效期至${dayjs
                .unix(userInfo?.personal_end_at)
                .format('YYYY年M月D日')}`
            : '未开通'
        }`,
        extendCls: userInfo?.personal_end_at ? undefined : styles.greyText
      },
      {
        key: 'teamState',
        title: '团队会员状态',
        value: userInfo?.team_end_at
          ? `已开通 · 有效期至${dayjs
              .unix(userInfo?.team_end_at)
              .format('YYYY年M月D日')}`
          : '未开通',
        extendCls: userInfo?.team_end_at ? undefined : styles.greyText
      },
      {
        key: 'telephone',
        title: '手机号',
        value: userInfo?.telephone || ''
      }
    ]
    const corp = [
      {
        key: 'appStatus',
        title: '企业版本状态',
        value: data?.corporation?.app_status || ''
      }
    ]
    const corpUser = [
      {
        key: 'personalState',
        title: '飞项状态',
        value: `${userInfo?.unregister ? '未注册' : '已注册'}，${
          userInfo?.user_corp_detail.is_join ? '已加入席位' : '未加入席位'
        }`
      },
      {
        key: 'telephone',
        title: '手机号',
        value: userInfo?.telephone || ''
      },
      {
        key: 'corpInfoName',
        title: '企业信息',
        value:
          `${userInfo?.user_corp_detail.corp_name}（来自${data?.origin_route}）` ||
          '',
        extendRowCls: styles.mb4
      },
      {
        key: 'corpInfoId',
        title: '',
        value: userInfo?.user_corp_detail.corp_id || '',
        extendCls: styles.greyText
      },
      {
        key: 'appStatus',
        title: '企业版本状态',
        value: userInfo?.user_corp_detail.app_status || ''
      }
    ]

    return isCorpUser ? corpUser : isShowCorpMode ? corp : normal
  }, [data, isShowCorpMode, userInfo, isCorpUser])

  useEffect(() => {
    if (open && userId && data) {
      fetchUsersInfo(userId)
    } else {
      setUserInfo(null)
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
            {isShowCorpMode
              ? `${data?.corporation?.corporation_name}（来自${data?.origin_route}）`
              : `${userInfo?.user_name}${isCorpUser ? '（企业用户）' : ''}`}
          </div>
          <div className={styles.descBox}>
            <div>
              {isShowCorpMode
                ? data?.corporation?.corporation_id
                : userInfo?.user_id}
            </div>
            {!isShowCorpMode && (
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
              <div key={item.key} className={cs(styles.row, item.extendRowCls)}>
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
            {isShowCorpMode ? '查看企业订单' : '查看TA的订单'}
          </FlyButton>
        </div>
      </div>
    </Modal>
  )
}
