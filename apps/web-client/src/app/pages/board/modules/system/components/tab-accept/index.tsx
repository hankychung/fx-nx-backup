import React, { FC, useState, useEffect } from 'react'
import CompleteItem from '../CompleteItem'
import style from './index.module.scss'
import { useContactStore } from '@flyele-nx/zustand-store'
import { IDashboardItem } from '@flyele-nx/types'

const creatorCodes = [10801, 10802, 10804, 10806, 10808, 10810, 10811, 10813]

const getAvatarId = (item: IDashboardItem) => {
  for (const taker of item.takers) {
    if (creatorCodes.includes(taker.identity || 0)) {
      return taker.taker_id
    }
  }

  return item.takers[0].taker_id
}

interface Props {
  item: IDashboardItem
  isDone?: boolean
}

export const Item: FC<React.PropsWithChildren<Props>> = ({ item, isDone }) => {
  const [avatar, setAvatar] = useState('')

  const { contactDict } = useContactStore()

  useEffect(() => {
    if (contactDict) {
      setAvatar(
        contactDict[getAvatarId(item)]
          ? contactDict[getAvatarId(item)].avatar
          : ''
      )
    }
  }, [contactDict, item])

  return (
    <CompleteItem
      item={item}
      handleClick={() => {
        // TODO: createToolWin
        console.log('handleClick')
        // createToolWin({
        //   ref_id: item.task_id,
        //   matter_type: item.matter_type,
        //   from: Enter_page.今日看板,
        // })
      }}
    >
      <div
        className={style.avatar}
        style={{
          backgroundImage: `url(${avatar})`,
          opacity: isDone ? 0.5 : 1
        }}
      />
    </CompleteItem>
  )
}
