import React from 'react'
import styles from './index.module.scss'
import { IEqualComparison } from '@flyele-nx/constant'
import { DescTooltip } from './components/desc-tool-tip'
import cs from 'classnames'
import { ReactComponent as SelectIcon } from '../../../../assets/introduction/select.svg'
import { ReactComponent as CloseIcon } from '../../../../assets/introduction/close.svg'

interface IProps {
  title: string
  header: string[]
  listObj: IEqualComparison
}

export const TableData = ({
  data,
  desc
}: {
  data: string | boolean
  desc?: string
}) => {
  if (typeof data === 'boolean') {
    return (
      <div className={cs(styles.tableItem)}>
        {data ? (
          <SelectIcon color="#1DD2C1" width={14} height={14} />
        ) : (
          <CloseIcon color="#F26B57" width={14} height={14} />
        )}
      </div>
    )
  } else {
    return (
      <div className={styles.tableItem}>
        {data}
        {desc && <DescTooltip text={desc} />}
      </div>
    )
  }
}

export const EqualComparison = ({ title, header, listObj }: IProps) => {
  return (
    <div className={styles.equalComparisonRoot}>
      <div className={styles.rootTitle}>{title}</div>
      <div className={styles.tableRoot}>
        <div className={cs(styles.tableRow, styles.tableHeader)}>
          {header.map((h, idx) => {
            return (
              <div
                key={idx}
                className={cs(styles.tableItem, {
                  [styles.tableItemHeader]: idx === 0
                })}
              >
                {h}
              </div>
            )
          })}
        </div>
        {Object.keys(listObj).map((obj, index) => {
          return (
            <div key={index}>
              {listObj[obj].title && (
                <div className={cs(styles.tableRowHeader)}>
                  {listObj[obj].title}
                </div>
              )}
              {listObj[obj].data.map((item) => {
                return (
                  <div key={item.key} className={styles.tableRow}>
                    <div
                      className={cs(styles.tableItem, styles.tableItemHeader)}
                    >
                      {item.title}
                      {item.desc && <DescTooltip text={item.desc} />}
                    </div>
                    <TableData data={item.free} />
                    <TableData data={item.personal} />
                    <TableData data={item.team} desc={item.teamDesc} />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
