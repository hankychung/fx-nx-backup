import React from 'react'
import styles from './index.module.scss'
import { StarIcon } from '@flyele-nx/icon'

interface IPROPFollow {
  isFollow?: boolean
}

const _Follow: React.FC<IPROPFollow> = ({ isFollow }) => {
  // 团队日程/项目日程不显示关注
  // if (
  //   location.href.includes('space/team') ||
  //   location.href.includes('project/detail')
  // ) {
  //   return null
  // }

  if (!isFollow) {
    return null
  }

  return (
    <div className={styles.focus}>
      <StarIcon width={10} height={10} />
    </div>
  )
}

export const Follow = React.memo(_Follow)
