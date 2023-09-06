import { I18N } from '@flyele-nx/i18n'
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
      <p>
        {total
          ? I18N.common.today_task_all_completed
          : I18N.common.no_task_today}
      </p>
      <p>
        {total ? I18N.common.today_keep_it_up : I18N.common.task_appear_hear}
      </p>
    </div>
  )
}
