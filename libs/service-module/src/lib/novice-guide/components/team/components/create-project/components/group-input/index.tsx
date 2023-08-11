import React, { ChangeEvent, useMemo } from 'react'
import styles from './index.module.scss'
import { Input } from 'antd'
import cs from 'classnames'

const _GroupInput = ({
  key,
  editKey,
  value,
  groupIndex,
  index,
  onChange,
  onChangeEdit
}: {
  key: string
  editKey: string
  value: string
  groupIndex: number
  index: number
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    groupIndex: number,
    index: number
  ) => void
  onChangeEdit: (key: string, edit: boolean) => void
}) => {
  const isEdit = useMemo(() => {
    return key === editKey
  }, [editKey, key])

  return (
    <div className={cs(styles.groupItem, { [styles.pd]: !isEdit })}>
      {isEdit ? (
        <Input
          defaultValue={value}
          placeholder="请输入分组名称"
          maxLength={8}
          bordered={false}
          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e, groupIndex, index)
            onChangeEdit(key, false)
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
        <div onClick={() => onChangeEdit(key, true)}>{value}</div>
      )}
    </div>
  )
}
export const GroupInput = React.memo(_GroupInput)
