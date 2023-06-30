import { ErrorPage } from './components/error-page'
import { ListAllFinished } from './components/all-finished'
import ReallyEmpty from './components/really-empty'
import styles from './index.module.scss'
import relaxBg from '../../../../assets/schedule/relax.png'

interface IProps {
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
}

export const EmptyData = (props: IProps) => {
  const { isError, allFinished, isBoard, listType, noTask } = props
  // 网络错误
  if (isError) return <ErrorPage />

  if (listType === 'NORMAL') {
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
            <div>暂无事项安排</div>
          </div>
        </div>
      )
    }
    return <div className={styles['null-tip']}>这天好像没做什么事呢~</div>
  }

  return null
}
