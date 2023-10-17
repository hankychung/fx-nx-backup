import React from 'react'
import styles from './index.module.scss'
import { IEqualComparison } from '@flyele-nx/constant'
import { DescTooltip } from './components/desc-tool-tip'
import cs from 'classnames'
import { ReactComponent as SelectIcon } from '../../../../assets/introduction/select.svg'
import { ReactComponent as CloseIcon } from '../../../../assets/introduction/close.svg'
import equityComparison from '../../../../assets/introduction/equityComparison.png'
import { isCN } from '@flyele-nx/i18n'

import { Modal } from 'antd'

interface IProps {
  title?: string
  header: string[]
  isSpace?: boolean
  desc?: string[]
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
        {data.includes('团队会员') ? (
          <span>
            无限，仅<span style={{ color: '#514ED4' }}>团队会员</span>可加入
          </span>
        ) : (
          <span>{data}</span>
        )}
        {desc && <DescTooltip text={desc} />}
      </div>
    )
  }
}

export const EqualComparison = ({
  title,
  header,
  isSpace,
  listObj
}: IProps) => {
  return (
    <div className={styles.equalComparisonRoot}>
      {title && <div className={styles.rootTitle}>{title}</div>}
      <div className={styles.tableRoot}>
        <div className={cs(styles.tableRow, styles.tableHeader)}>
          {header.map((h, idx) => {
            return (
              <div
                key={idx}
                className={cs(styles.tableItem, {
                  [styles.tableItemHeader]: idx === 0
                })}
                style={{ fontWeight: 600, fontSize: 16, color: 'black' }}
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
                    {!isSpace ? (
                      <TableData data={item.personal} />
                    ) : (
                      <TableData data={''} />
                    )}
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

export const SpaceComparison = ({ title, header, desc, listObj }: IProps) => {
  return (
    <div className={styles.equalComparisonRoot}>
      {title && <div className={styles.rootTitle}>{title}</div>}
      <div className={styles.tableRoot}>
        <div
          className={cs(
            styles.tableRowSpace,
            styles.tableHeader,
            styles.tableHeaderSpace,
            {
              [styles.tableRowSpaceEN]: !isCN
            }
          )}
        >
          {header.map((h, idx) => {
            console.log('h:', h, 'idx:', idx)
            return (
              <div
                key={idx}
                className={cs(
                  styles.tableItem,
                  {
                    [styles.tableTittle]: idx !== 0
                  },
                  {
                    [styles.tableItemHeader]: idx === 0
                  }
                )}
                style={{ fontWeight: 600, fontSize: 16, color: 'black' }}
              >
                {h}
                {desc && <div className={styles.tableDesc}>{desc[idx]}</div>}
              </div>
            )
          })}
        </div>
        <div style={{ height: 12 }}></div>
        {Object.keys(listObj).map((obj, index) => {
          return (
            <div key={index}>
              {listObj[obj].title && (
                <div className={cs(styles.tableRowHeader)}>
                  {listObj[obj].title}
                </div>
              )}
              {listObj[obj].data.map((item, index) => {
                return (
                  <div
                    key={item.key}
                    className={cs(styles.tableRowSpace, {
                      [styles.tableRowSpaceEN]: !isCN
                    })}
                    style={{ backgroundColor: item.onclick ? '#F2F6FD' : '' }}
                  >
                    <div
                      className={cs(styles.tableItem, styles.tableItemHeader)}
                    >
                      {item.onclick ? (
                        <span
                          onClick={() => {
                            Modal.confirm({
                              closable: true,
                              title: null,
                              icon: null,
                              width: 620,
                              okButtonProps: { style: { display: 'none' } },
                              cancelButtonProps: { style: { display: 'none' } },
                              maskClosable: true,
                              content: (
                                <img
                                  src={equityComparison}
                                  style={{ marginTop: 10, width: 574 }}
                                ></img>
                              )
                            })
                          }}
                          className={styles.tableItemMember}
                        >
                          {item.title}
                        </span>
                      ) : (
                        <span>{item.title}</span>
                      )}
                      {item.desc && <DescTooltip text={item.desc} />}
                    </div>
                    <TableData data={item.free} />
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
