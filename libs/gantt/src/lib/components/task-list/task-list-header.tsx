import React from 'react'
import styles from './task-list-header.module.css'
import Option from '../Option'
import { ReactComponent as ShowList } from '../../../assets/icons/show_list.svg'

export const TaskListHeaderDefault: React.FC<{
  headerHeight: number
  rowWidth: string
  fontFamily: string
  fontSize: string
  isChecked: boolean
  setIsChecked: (data: boolean) => void
}> = ({
  headerHeight,
  fontFamily,
  fontSize,
  rowWidth,
  setIsChecked,
  isChecked
}) => {
  return (
    <>
      <div className={styles.options}>
        <Option />
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
              minWidth: 186,
              paddingLeft: 16
            }}
          >
            名称
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
            开始时间
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
            截止时间
          </div>
        </div>
      </div>
    </>
  )
}
