import React, { useState, useMemo } from 'react'
import checkIcon from '../../../../assets/icons/check.png'
import style from './index.module.scss'
import { FullViewGroupByEnum } from '@flyele-nx/constant'

interface IProps {
  handleSelect: (key: FullViewGroupByEnum) => void
}

const arr = [
  { txt: '按事项时间分区', key: FullViewGroupByEnum.time },
  { txt: '按分组分区', key: FullViewGroupByEnum.group },
  { txt: '按项目分区', key: FullViewGroupByEnum.project },
  { txt: '不分区', key: FullViewGroupByEnum.default }
]

const _GroupSelector: React.FC<IProps> = ({ handleSelect }) => {
  const [activeKey, setActiveKey] = useState(FullViewGroupByEnum.default)
  const selectors = useMemo(() => {
    return [arr[3]]
  }, [])

  return (
    <div className={style.wrapper}>
      {selectors.map(({ txt, key }) => (
        <div
          className={style.item}
          key={key}
          onClick={() => {
            setActiveKey(key)
            handleSelect(key)
          }}
        >
          <span>{txt}</span>
          {activeKey === key && <img src={checkIcon} alt="" width={20} />}
        </div>
      ))}
    </div>
  )
}

export const GroupSelector = React.memo(_GroupSelector)
