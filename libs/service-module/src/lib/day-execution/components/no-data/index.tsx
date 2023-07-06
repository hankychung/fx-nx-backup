import React from 'react'
import styles from './index.module.scss'
import { FinishAllIcon, NoTaskIcon } from '@flyele-nx/icon'

export const Nodata = ({ total }: { total: number }) => {
  return (
    <div className={styles.noDataRoot}>
      <div className={styles.icon}>
        {total ? (
          <FinishAllIcon width={148} height={106} />
        ) : (
          <NoTaskIcon width={148} height={106} />
        )}
      </div>
      <p>{total ? '当日事项已全部完成' : '暂无当日事项'}</p>
      <p>
        {total
          ? '太棒了！明天继续坚持噢'
          : '此处为你展示当天有具体时间刻度的事项'}
      </p>
    </div>
  )
}
