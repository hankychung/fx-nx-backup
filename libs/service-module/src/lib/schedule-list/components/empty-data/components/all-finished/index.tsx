import styles from './index.module.scss'
import completeNullIcon from '../../../../../../assets/schedule/null-complete.png'

export const ListAllFinished = (props: { isBoard: boolean }) => {
  const { isBoard } = props

  if (isBoard) {
    return (
      <div className={styles.board_complete}>
        <img src={completeNullIcon} alt="" />
        <div>你的事项已全部完成！</div>
      </div>
    )
  }

  return (
    <div className={styles.board}>
      <img src={completeNullIcon} alt="" className={styles.icon} />
      <div>你的事项已全部完成！</div>
    </div>
  )
}
