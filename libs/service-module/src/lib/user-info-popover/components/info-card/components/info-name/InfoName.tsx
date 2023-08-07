import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { Avatar } from '../../../avatar'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import cs from 'classnames'
import { Input, InputRef, message } from 'antd'
import { useMemoizedFn } from 'ahooks'
import { InvalidChar } from '@flyele-nx/constant'
import { LocalStore, useCheckVip } from '@flyele-nx/utils'
import { Diamond } from '../diamond'
import { TeamVipIcon } from '@flyele-nx/icon'
import { UsercApi } from '@flyele-nx/service'
import { GlobalInfoHandler } from '@flyele-nx/global-processor'

export const InfoName = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const userInfo = useUserInfoStore((state) => state.userInfo)
  const { isVip, isTeamVip, isExpiredVip } = useCheckVip()

  const [userName, setUserName] = useState('')
  const [isEdit, setEdit] = useState(false)
  const inputRef = useRef<InputRef>(null)

  const verifyName = useMemoizedFn((val: string) => {
    if (val.length > 16) {
      messageApi.open({
        type: 'error',
        content: '最多支持16个字符'
      })
      return
    }

    for (const char of InvalidChar) {
      if (val.includes(char)) {
        messageApi.open({
          type: 'error',
          content: '不支持特殊字符@ # * /  < > ↑↓ → ← '
        })
        return
      }
    }
    setUserName(val)
  })

  const onSave = async () => {
    setEdit(false)
    const val = userName.trim()

    if (!val) {
      setUserName(userInfo.nick_name)
      return
    }
    setUserName(val)
    await UsercApi.updateUser({ nick_name: val })

    GlobalInfoHandler.updateUserInfo({
      ...userInfo,
      Token: LocalStore.getToken(),
      nick_name: val
    })
  }

  useEffect(() => {
    setUserName(userInfo.nick_name)
  }, [userInfo.nick_name])

  return (
    <div className={styles.infoNameRoot}>
      {contextHolder}

      <Avatar size={44} />
      <div className={styles.infoName}>
        <div className={styles.infoTop}>
          <Input
            className={cs(styles.name, !isEdit && styles.hidden)}
            type="text"
            value={userName}
            ref={inputRef}
            defaultValue={userInfo.nick_name}
            onBlur={onSave}
            onInput={(e) => {
              verifyName(e.currentTarget.value)
            }}
            onPressEnter={(e) => {
              e.currentTarget.blur()
            }}
          />
          {!isEdit && (
            <>
              <span
                className={styles.name}
                onClick={() => {
                  setEdit(true)
                  inputRef.current?.focus()
                  inputRef.current?.setSelectionRange(0, userName.length)
                }}
              >
                {userName}
              </span>
              <div className={styles.infoDiamond}>
                {isVip && !isTeamVip && !isExpiredVip && <Diamond type="vip" />}
                {isTeamVip && !isExpiredVip && (
                  <TeamVipIcon width={20} height={20} />
                )}
              </div>
            </>
          )}
        </div>

        {!userInfo.corpid && (
          <p className={styles.infoBottom}>{userInfo.telephone}</p>
        )}
      </div>
    </div>
  )
}
