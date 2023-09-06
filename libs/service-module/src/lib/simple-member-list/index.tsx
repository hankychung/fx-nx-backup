import { I18N } from '@flyele-nx/i18n'
import React, { MouseEvent, useMemo } from 'react'
import addIcon from '../../assets/schedule/iconAdd.png' // figma导出svg图标失败，用png顶着
import addDisabledIcon from '../../assets/schedule/add_disabled_3x.png' // figma导出svg图标失败，用png顶着
import removeIcon from '../../assets/schedule/iconRemove.png' // figma导出svg图标失败，用png顶着
import { FlyAvatar } from '@flyele/flyele-components'
import cs from 'classnames'
import styles from './index.module.scss'
import { useMemoizedFn } from 'ahooks'
import { useContactStore, useUserInfoStore } from '@flyele-nx/global-processor'
import { UserInfoUtils } from '@flyele-nx/utils'

export type ISimpleMember = {
  userId: string
  dispatchId: string
  isCreator?: boolean
  isFinished?: boolean
  isView?: boolean
}

type IProps = {
  list: ISimpleMember[]
  canNotAdd: boolean
  onClickAdd?: (e: MouseEvent<HTMLDivElement>) => void
  onClickRemove: (taker: ISimpleMember) => void
  isWorkFlow?: boolean //默认 是否工作流
  isView?: boolean //默认 是否置灰
}

const SimpleMemberList = (props: IProps) => {
  const {
    list,
    canNotAdd,
    onClickAdd,
    onClickRemove,
    isWorkFlow = false,
    isView = false
  } = props

  const { contactDict, interacts } = useContactStore()

  const {
    isEnterprise,
    userInfo: { user_id: myId }
  } = useUserInfoStore()

  const getVipInfo = useMemoizedFn((id: string) => {
    if (myId === id && isEnterprise) {
      return {
        isTeamVip: true,
        isVip: true
      }
    }

    const item = interacts.find((i) => i.user_id === id)

    if (item) {
      const { isTeamVip, isVip } = UserInfoUtils.checkVipType(item)
      return {
        isVip,
        isTeamVip
      }
    }

    return {
      isVip: false,
      isTeamVip: false
    }
  })

  const takerList = useMemo(() => {
    if (!list) return []

    return list.map((item) => {
      const data = contactDict[item.userId]

      return {
        ...item,
        nick_name: data?.nick_name,
        userId: item.userId,
        avatar: data?.avatar
      }
    })
  }, [contactDict, list])

  return (
    <div className={styles.MemberListRoot}>
      <div className={styles.ListTitleBox}>
        <div className={styles.title}>{I18N.common.assignee}</div>
        <div
          style={{ pointerEvents: canNotAdd ? 'none' : 'auto' }}
          className={styles.addIcon}
          onClick={onClickAdd}
        >
          <img src={canNotAdd ? addDisabledIcon : addIcon} alt="" />
        </div>
      </div>
      <div className={styles.listRoot}>
        {takerList.map((item) => {
          const { isVip, isTeamVip } = getVipInfo(item.userId)

          return (
            <div key={item.userId} className={styles.listItem}>
              <div className={styles.listLeft}>
                <FlyAvatar
                  src={item.avatar}
                  size={28}
                  status={
                    item.isFinished && !isWorkFlow ? 'finished' : undefined
                  }
                  overlayClassName={cs(
                    {
                      [styles.isView]: !item.isView && isView
                    },
                    isTeamVip
                      ? 'global-style-team-vip'
                      : isVip
                      ? 'global-style-person-vip'
                      : ''
                  )}
                />
                <div className={styles.name}>{item.nick_name}</div>
              </div>
              <div
                className={styles.listRight}
                onClick={() => onClickRemove(item)}
              >
                <img src={removeIcon} alt="" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(SimpleMemberList)
