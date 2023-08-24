import React, { useLayoutEffect, useState } from 'react'
import checkedImg from '../../../../../../assets/schedule/selected.png'
import { Popover } from 'antd'

import {
  ImportantUrgent,
  ImportantNoUrgent,
  UrgentNoImportant,
  NoImportantNoUrgent,
  PriorityIcon
} from '@flyele-nx/icon'
import cs from 'classnames'
import style from './index.module.scss'
import { QuadrantValue } from '@flyele-nx/constant'
import { MatterCreateCell } from '@flyele-nx/ui'

type ConfigItem = {
  sort: number
  text: string
  icon: React.ReactNode
  bgColor: string
  color: string
}

interface IProps {
  defaultValue?: QuadrantValue
  onChange?: (v: QuadrantValue) => void
  content?: (selObj: ConfigItem) => React.ReactNode
  disable?: boolean
}

/** 优先级的 文字、颜色 配置 */
export const PRIORITY_MAP: Record<QuadrantValue, ConfigItem> = {
  [QuadrantValue.important_urgent]: {
    sort: 0,
    text: '重要紧急',
    icon: <ImportantUrgent color="#E65454" width={12} />,
    bgColor: '#FFEBEB',
    color: '#E65454'
  },
  [QuadrantValue.important_no_urgent]: {
    sort: 1,
    text: '重要不紧急',
    icon: <ImportantNoUrgent color="#E69448" width={12} />,
    bgColor: '#FFF5EC',
    color: '#E69448'
  },
  [QuadrantValue.urgent_no_important]: {
    sort: 2,
    text: '紧急不重要',
    icon: <UrgentNoImportant color="#7E7FF8" width={12} />,
    bgColor: '#F3F3FF',
    color: '#7E7FF8'
  },
  [QuadrantValue.no_important_no_urgent]: {
    sort: 3,
    text: '不紧急不重要',
    icon: <NoImportantNoUrgent color="#989F9F" width={12} />,
    bgColor: '#F4F9F9',
    color: '#989F9F'
  }
}

export const PrioritySelector: React.FC<React.PropsWithChildren<IProps>> = (
  props
) => {
  const {
    defaultValue = QuadrantValue.no_important_no_urgent,
    onChange,
    content,
    disable
  } = props

  const [selVal, setSelVal] = useState(defaultValue)
  const selObj = PRIORITY_MAP[selVal]

  const [isShowPopover, setIsShowPopover] = useState(false)

  const onCellClick = () => {
    if (disable) return

    setIsShowPopover(true)
  }
  const onSelect = (key: QuadrantValue) => {
    if (disable) return

    setSelVal(key)
    setIsShowPopover(false)
    onChange?.(key)
  }

  useLayoutEffect(() => {
    setSelVal(defaultValue)
  }, [defaultValue])

  const popoverContent = (
    <div className={style.list}>
      {Object.entries(PRIORITY_MAP)
        .sort((a, b) => a[1].sort - b[1].sort)
        .map(([_key, item]) => {
          const key = +_key as unknown as QuadrantValue

          return (
            <div
              key={key}
              onClick={() => onSelect(key)}
              className={cs(style.item)}
              style={{ backgroundColor: item.bgColor, color: item.color }}
            >
              {item.icon}
              <span className={style.item_text}>{item.text}</span>
              {selVal === key && <img src={checkedImg} alt="checked" />}
            </div>
          )
        })}
    </div>
  )

  return (
    <Popover
      showArrow={false}
      open={isShowPopover}
      trigger="click"
      content={popoverContent}
      destroyTooltipOnHide
      arrow={false}
      overlayStyle={{
        boxShadow: '0px 1px 10px 0px rgba(6, 6, 6, 0.2)',
        borderRadius: 5,
        paddingBottom: 0,
        paddingTop: 0,
        zIndex: 1000,
        width: 180
      }}
      placement="bottomLeft"
      onOpenChange={(visible) => {
        setIsShowPopover(visible)
      }}
      // overlayClassName={style.tips}
    >
      {content !== undefined ? (
        content(selObj)
      ) : (
        <MatterCreateCell
          isMatterCreate
          img={() => <PriorityIcon />}
          onClick={onCellClick}
          cellCla={style.matter_cell_cla}
          cellContentCla={style.matter__cell_content_cla}
        >
          <div
            className={style.content}
            style={{
              backgroundColor: selObj.bgColor,
              color: selObj.color
            }}
          >
            {selObj.text}
          </div>
        </MatterCreateCell>
      )}
    </Popover>
  )
}
