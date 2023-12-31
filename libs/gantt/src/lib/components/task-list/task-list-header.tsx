import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import styles from './task-list-header.module.css'
import Option from '../Option'
import { ReactComponent as ShowList } from '../../../assets/icons/show_list.svg'
import { FullShowMode } from '@flyele-nx/constant'

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number
  rowWidth: string
  fontFamily: string
  fontSize: string
  isChecked: boolean
  setFullShowMode: (_: FullShowMode) => void
  setIsChecked: (data: boolean) => void
  taskHeaderRef: React.RefObject<HTMLDivElement>
}> = ({
  headerHeight,
  fontFamily,
  fontSize,
  rowWidth,
  setIsChecked,
  isChecked,
  taskHeaderRef,
  setFullShowMode
}) => {
  return (
    <>
      <div className={styles.options} ref={taskHeaderRef}>
        <Option setFullShowMode={setFullShowMode} />
        <div
          style={{ marginRight: '16px' }}
          onClick={() => setIsChecked(!isChecked)}
        >
          <ShowList />
        </div>
      </div>

      <div
        className={styles.ganttTable}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize
        }}
      >
        <div
          className={styles.ganttTable_Header}
          style={{
            height: headerHeight
          }}
        >
          <div
            className={styles.ganttTable_HeaderItem}
            style={{
              minWidth: 240,
              paddingLeft: 16
            }}
          >
            {I18N.common.name_all}
          </div>
          <div
            className={styles.ganttTable_HeaderSeparator}
            style={{
              height: headerHeight
              // marginTop: headerHeight * 0.2
            }}
          />
          <div
            className={styles.ganttTable_HeaderItem}
            style={{
              minWidth: rowWidth,
              paddingLeft: 12
            }}
          >
            {I18N.common.startTime}
          </div>
          <div
            className={styles.ganttTable_HeaderSeparator}
            style={{
              height: headerHeight
              // marginTop: headerHeight * 0.25
            }}
          />
          <div
            className={styles.ganttTable_HeaderItem}
            style={{
              minWidth: rowWidth,
              paddingLeft: 12
            }}
          >
            {I18N.common.deadlineTime}
          </div>
        </div>
      </div>
    </>
  )
}
