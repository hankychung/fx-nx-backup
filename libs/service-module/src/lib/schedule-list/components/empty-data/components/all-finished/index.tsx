import { I18N } from '@flyele-nx/i18n'
import styles from './index.module.scss'
import completeNullIcon from '../../../../../../assets/schedule/null-complete.png'

export const ListAllFinished = (props: { isBoard: boolean }) => {
  const { isBoard } = props

  if (isBoard) {
    return (
      <div className={styles.board_complete}>
        <img src={completeNullIcon} alt="" />
        <div>{I18N.common.yourTaskHasBeenResolved}</div>
      </div>
    )
  }

  return (
    <div className={styles.board}>
      <img src={completeNullIcon} alt="" className={styles.icon} />
      <div>{I18N.common.yourTaskHasBeenResolved}</div>
    </div>
  )
}
