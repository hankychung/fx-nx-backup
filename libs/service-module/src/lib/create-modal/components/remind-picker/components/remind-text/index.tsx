import React, { useMemo, useState, MouseEvent } from 'react'
import styles from './index.module.scss'
import { useAsyncEffect } from 'ahooks'
import { getAllRemindTxt, getMatterPresetRemindTxt } from '@flyele-nx/utils'
import { ICustomRemind } from '../../index'
import cs from 'classnames'
import { CircleArrowUpGrey } from '@flyele-nx/icon'

export const RemindText = ({
  customRemindData,
  remindData
}: {
  customRemindData: ICustomRemind | undefined
  remindData: [string[], string[]]
}) => {
  const [remindTxt, setRemindTxt] = useState('')
  const [showMore, setShowMore] = useState(false)

  const onToggle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setShowMore(!showMore)
  }

  useAsyncEffect(async () => {
    const list = customRemindData?.remindList.map((item) => item.time)
    const presetTxt = getMatterPresetRemindTxt(remindData)
    const txt = await getAllRemindTxt(presetTxt, list)
    setRemindTxt(txt || '添加提醒')
  }, [customRemindData?.remindList, remindData])

  const remindTxtArr = useMemo(() => {
    return remindTxt.split('、')
  }, [remindTxt])

  return (
    <div className={styles.remindTextRoot}>
      <div className={styles.content}>
        {showMore ? (
          <div className={styles.textList}>
            {remindTxtArr.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        ) : (
          <div className={styles.text}>{remindTxt}</div>
        )}
      </div>

      {remindTxtArr.length > 1 && (
        <div
          className={cs(styles.toggleBtn, { [styles.down]: !showMore })}
          onClick={onToggle}
        >
          <CircleArrowUpGrey width="20px" height="20px" />
        </div>
      )}
    </div>
  )
}
