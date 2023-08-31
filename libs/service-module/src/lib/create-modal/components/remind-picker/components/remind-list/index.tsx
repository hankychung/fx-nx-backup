import React, { useRef, useState } from 'react'
import styles from './index.module.scss'
import {
  defaultSelector,
  ValidRuleType,
  RemindDataType,
  DEFAULT_CUSTOM_REMIND_TOTAL,
  RemindType
} from '@flyele-nx/constant'
import { RemindItem } from '../remind-item'
import { useMemoizedFn } from 'ahooks'
import { Dayjs } from 'dayjs'
import { ICustomRemind } from '../../index'

interface IProps {
  remindData: [string[], string[]]
  ruleList: Array<ValidRuleType<'all'>>
  setRemindData: React.Dispatch<React.SetStateAction<[string[], string[]]>>
  setCustomRemindData: React.Dispatch<
    React.SetStateAction<ICustomRemind | undefined>
  >
}

// 自定义 时间出入参
export type CustomDataTime<
  T extends 'out' | 'in',
  Time extends Dayjs | number = Dayjs
> = {
  remindList: [T] extends ['out']
    ? { time: Time; timeTxt?: string }[]
    : { time: Time }[]
  total: number
}

export type ChangeData<T extends RemindType = 'all'> = {
  presetData: RemindDataType<T>
  customData?: CustomDataTime<'out'>
}

const _RemindList = ({
  remindData,
  ruleList,
  setRemindData,
  setCustomRemindData
}: IProps) => {
  const [customList, setCustomList] = useState<
    { time: Dayjs; timeTxt: string }[]
  >([])

  const maxCustomRemindTotal = useRef(DEFAULT_CUSTOM_REMIND_TOTAL)

  const selectRemind = (data: string[], key: string) => {
    const index = data.findIndex((t) => t === key)

    if (index !== -1) {
      data.splice(index, 1)
    } else {
      // 选择了其他提醒时间把不提醒删除掉
      const _index = data.findIndex((t) =>
        ['start_no_remind', 'end_no_remind'].includes(t)
      )

      _index !== -1 && data.splice(_index, 1)

      data.push(key)
    }

    return data
  }

  const generatorChangeData = (
    remindData: RemindDataType<'all'>,
    customList: { time: Dayjs; timeTxt: string }[]
  ) => {
    const data: ChangeData<'all'> = {
      presetData: [...remindData],
      customData: {
        remindList: [...customList],
        total: maxCustomRemindTotal.current
      }
    }

    return data
  }

  /** 设置 preset 和 custom 的提醒数据 */
  const onRemindChange = useMemoizedFn(
    ({ presetData, customData }: ChangeData) => {
      setRemindData(presetData)

      if (customData) {
        setCustomRemindData(customData)
      }
    }
  )

  const onChange = useMemoizedFn((key: string, type: 'start' | 'end') => {
    const [start, end] = remindData

    const _remindData: RemindDataType<'all'> = [
      type === 'start' ? selectRemind([...start], key) : start,
      type === 'end' ? selectRemind([...end], key) : end
    ]

    const isDeleteEnd =
      (defaultSelector.endRemind ?? []).filter(
        (i) => ruleList.includes(i.validRule) && i.show !== false
      ).length === 0

    if (isDeleteEnd && _remindData[1].length > 0) _remindData[1].length = 0

    const data = generatorChangeData(_remindData, customList)

    onRemindChange(data)
  })

  return (
    <div className={styles.remindListRoot}>
      <div className={styles.content}>
        <div className={styles.itemBox}>
          {defaultSelector.startRemind.map((item) => {
            if (
              !ruleList.includes(item.validRule) ||
              (typeof item.show === 'boolean' && !item.show)
            )
              return null
            const checked = !!remindData[0].find((t) => t === item.key)

            return (
              <RemindItem
                key={item.key}
                title={item.CName}
                checked={checked}
                onClick={() => onChange(item.key, 'start')}
              />
            )
          })}
        </div>
        <div className={styles.itemBox}>
          {defaultSelector.endRemind?.map((item) => {
            if (
              !ruleList.includes(item.validRule) ||
              (typeof item.show === 'boolean' && !item.show)
            )
              return null
            const checked = !!remindData[1].find((t) => t === item.key)

            return (
              <RemindItem
                key={item.key}
                title={item.CName}
                checked={checked}
                onClick={() => onChange(item.key, 'end')}
              />
            )
          })}
        </div>
        <div className={styles.itemBox}>{/*  TODO 自定义提醒 */}</div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}

export const RemindList = React.memo(_RemindList)
