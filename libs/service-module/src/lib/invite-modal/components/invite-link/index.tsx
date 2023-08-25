import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss'
import { IInviteParams } from '@flyele-nx/types'
import { message } from 'antd'
import { inviteLinkLongUrl } from '@flyele-nx/utils'
import { EmptyApi, envStore } from '@flyele-nx/service'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { PromotionsCard } from '@flyele-nx/ui'

interface IProps {
  inviteParams: IInviteParams
  style?: React.CSSProperties
}

export function InviteLink(props: IProps) {
  const { inviteParams, style } = props
  const { taskId, matterType, isExternal, title, corpId } = inviteParams
  const [shortUrl, setShortUrl] = useState('')
  const { user_id: userId, nick_name } = useUserInfoStore(
    (state) => state.userInfo
  )

  useEffect(() => {
    const { url } = inviteLinkLongUrl({
      id: taskId,
      userId,
      matterType,
      isExternal,
      corpId,
      h5Url: envStore.getH5Url()
    })

    EmptyApi.getShortUrl(url)
      .then((res) => {
        setShortUrl(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [taskId, matterType, userId, isExternal, corpId])

  const copyToClickBoard = () => {
    // 复制到剪切板
    navigator.clipboard.writeText(
      `【飞项】${nick_name} 邀请你加入“${title}”，快点击接受邀请吧！${shortUrl}`
    )

    message.success('复制成功')
  }

  /**
   * 企业微信的情况下
   * 在邀请空间内部成员、空间项目内部成员、个人项目成员、空间目标执行人时，标题与提示信息需改为
   */
  const isCorpMode: boolean = useMemo(() => {
    return corpId ? !isExternal : false
  }, [corpId, isExternal])

  return (
    <div className={styles['modalInvite-url']} style={style}>
      <div className={styles['modalInvite-url__header']}>
        {isCorpMode ? '复制链接分享给同事' : '复制链接分享给好友'}
      </div>
      <div className={styles['modalInvite-url__footer']}>
        {isCorpMode
          ? '仅支持公司同事加入'
          : '好友接受后将添加到 TA 的日程/事项列表中'}
      </div>
      <div className={styles['modalInvite-url__content']}>
        <div className={styles['modalInvite-url__content__left']}>
          {/* <input type="text" value={shortUrl} /> */}
          {shortUrl || '加载中...'}
        </div>
        <div className={styles['modalInvite-url__content__right']}>
          <button type="button" onClick={copyToClickBoard}>
            复制链接
          </button>
        </div>
      </div>
      <PromotionsCard
        width="407px"
        title="限时活动：每邀请1个新用户注册，免费得5天团队会员"
        style={{ marginTop: 224 }}
      />
    </div>
  )
}
