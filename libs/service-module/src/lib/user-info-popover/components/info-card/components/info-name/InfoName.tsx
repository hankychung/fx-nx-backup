import styles from './index.module.scss'
import { Avatar } from '../../../avatar'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
// import { FlyTextTooltip } from '@flyele/flyele-components'

export const InfoName = () => {
  const userInfo = useUserInfoStore((state) => state.userInfo)
  // const [userName, setUserName] = useState('')

  return (
    <div className={styles.infoNameRoot}>
      <Avatar size={44} />
      <div className={styles.infoName}>
        {/*<div className={styles.infoTop}>*/}
        {/*  <Input*/}
        {/*    className={classNames(styles.name, !isEdit && styles.hidden)}*/}
        {/*    type="text"*/}
        {/*    value={userName}*/}
        {/*    ref={inputRef}*/}
        {/*    defaultValue={userInfo.nick_name}*/}
        {/*    onBlur={onSave}*/}
        {/*    onInput={(e) => {*/}
        {/*      verifyName(e.currentTarget.value)*/}
        {/*    }}*/}
        {/*    onPressEnter={(e) => {*/}
        {/*      e.currentTarget.blur()*/}
        {/*    }}*/}
        {/*    // autoFocus*/}
        {/*  />*/}
        {/*  {!isEdit && (*/}
        {/*    <>*/}
        {/*      <span*/}
        {/*        className={styles.name}*/}
        {/*        onClick={() => {*/}
        {/*          if (domainHost.isPrivateProject) return*/}
        {/*          setEdit(true)*/}
        {/*          inputRef.current?.focus()*/}
        {/*          inputRef.current?.setSelectionRange(0, userName.length)*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        {userName}*/}
        {/*      </span>*/}
        {/*      <div className={css['info-diamond']}>*/}
        {/*        {isVip &&*/}
        {/*          !isTeamVip &&*/}
        {/*          !isExpiredVip &&*/}
        {/*          !domainHost.isPrivateProject && <Diamond type="vip" />}*/}
        {/*        {isTeamVip && !isExpiredVip && !domainHost.isPrivateProject && (*/}
        {/*          <TeamIcon width={20} height={20} />*/}
        {/*        )}*/}
        {/*      </div>*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*</div>*/}

        {!userInfo.corpid && (
          <p className={styles.infoBottom}>{userInfo.telephone}</p>
        )}
      </div>
    </div>
  )
}
