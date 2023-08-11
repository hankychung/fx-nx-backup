import React, { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'
import { Input } from 'antd'
import cs from 'classnames'

const _GroupInput = ({
  value,
  groupIndex,
  index,
  onChange
}: {
  value: string
  groupIndex: number
  index: number
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    groupIndex: number,
    index: number
  ) => void
}) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className={cs(styles.groupItem, { [styles.pd]: !isEdit })}>
      {isEdit ? (
        <Input
          autoFocus
          defaultValue={value}
          placeholder="请输入分组名称"
          maxLength={8}
          bordered={false}
          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e, groupIndex, index)
            setIsEdit(false)
          }}
          style={{
            minWidth: '100px',
            maxWidth: '224px',
            height: '28px',
            fontSize: '14px'
          }}
          allowClear
        />
      ) : (
        <div onClick={() => setIsEdit(true)}>{value}</div>
      )}
    </div>
  )
}
export const GroupInput = React.memo(_GroupInput)
