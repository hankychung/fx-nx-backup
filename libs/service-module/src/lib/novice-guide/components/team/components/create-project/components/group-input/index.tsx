import React, {
  ChangeEvent,
  forwardRef,
  useState,
  ForwardRefRenderFunction,
  useImperativeHandle
} from 'react'
import styles from './index.module.scss'
import { Input } from 'antd'
import cs from 'classnames'

export interface IGroupInputRef {
  changeInEdit: (value: boolean) => void
}

const _GroupInput: ForwardRefRenderFunction<
  IGroupInputRef,
  {
    value: string
    groupIndex: number
    index: number
    onChange: (
      e: ChangeEvent<HTMLInputElement>,
      groupIndex: number,
      index: number
    ) => void
  }
> = ({ value, groupIndex, index, onChange }, ref) => {
  const [isEdit, setIsEdit] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      changeInEdit: (value: boolean) => {
        setIsEdit(value)
      }
    }
  })

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
export const GroupInput = React.memo(forwardRef(_GroupInput))
