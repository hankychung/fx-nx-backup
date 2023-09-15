import { I18N } from '@flyele-nx/i18n'
import React, { useState, useMemo } from 'react'
import checkIcon from '../../../../assets/icons/check.png'
import style from './index.module.scss'
import { FullViewGroupByEnum } from '@flyele-nx/constant'

interface IProps {
  handleSelect: (key: FullViewGroupByEnum) => void
}

const arr = [
  { txt: I18N.common.date, key: FullViewGroupByEnum.time },
  { txt: I18N.common.board_section, key: FullViewGroupByEnum.group },
  { txt: I18N.common.project_partition, key: FullViewGroupByEnum.project },
  { txt: I18N.common.not_partitioned, key: FullViewGroupByEnum.default }
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
