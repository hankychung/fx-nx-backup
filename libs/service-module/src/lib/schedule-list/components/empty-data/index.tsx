import { I18N } from '@flyele-nx/i18n'
import { ErrorPage } from './components/error-page'
import { ListAllFinished } from './components/all-finished'
import ReallyEmpty from './components/really-empty'
import styles from './index.module.scss'
import relaxBg from '../../../../assets/schedule/relax.png'
import LoadingIcon from '../../../../assets/schedule/loading.gif'
import classNames from 'classnames'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(isToday)

interface IProps {
  /**
   * 日期
   */
  date: string
  /**
   * 列表类型
   * NORMAL 未完成
   * COMPLETE 已完成
   */
  listType: 'NORMAL' | 'COMPLETE'

  /**
   * 是否网络错误
   */
  isError?: boolean

  /**
   * 是否全部已完成
   */
  allFinished?: boolean

  /**
   * 是否今日视图
   */
  isBoard: boolean

  /**
   * 无事项 + 无已完成
   */
  noTask?: boolean

  /**
   * loading
   */
  loading?: boolean
}

export const EmptyData = (props: IProps) => {
  const { isError, allFinished, isBoard, listType, noTask, loading, date } =
    props

  const isToday = useMemo(() => dayjs(date).isToday(), [date])

  // console.log('isToday', isToday, allFinished, noTask)

  // loading
  if (loading && !isError)
    return (
      <div className={classNames(styles.loading)}>
        <img alt="" src={LoadingIcon} />
        <span>{I18N.common.loading}</span>
      </div>
    )

  // 网络错误
  if (isError) return <ErrorPage />

  if (listType === 'NORMAL') {
    if (!isToday && !isBoard) return null
    // 有事项（全部完成）
    if (allFinished) return <ListAllFinished isBoard={isBoard} />

    //  无事项 + 无已完成
    if (noTask) return <ReallyEmpty isBoard={isBoard} />
  } else if (listType === 'COMPLETE') {
    // 今日视图
    if (isBoard) {
      return (
        <div className={styles['empty-relax']}>
          <img src={relaxBg} alt="" />
          <div className={styles.txt}>
            <div>{I18N.common.noTaskAtTheMoment}</div>
          </div>
        </div>
      )
    }
    return (
      <div className={styles['null-tip']}>{I18N.common.nothingTodoToday}</div>
    )
  }

  return null
}
