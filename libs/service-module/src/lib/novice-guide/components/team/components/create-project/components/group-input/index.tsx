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
import { Close } from '@flyele-nx/icon'

export interface IGroupInputRef {
  changeInEdit: (value: boolean) => void
}

const _GroupInput: ForwardRefRenderFunction<
  IGroupInputRef,
  {
    value: string
    groupIndex: number
    index: number
    onChange: (value: string, groupIndex: number, index: number) => void
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
            onChange(e.target.value, groupIndex, index)
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
        <div className={styles.groupValue} onClick={() => setIsEdit(true)}>
          {value}
          <div
            className={styles.deleteIcon}
            onClick={() => {
              onChange('', groupIndex, index)
            }}
          >
            <Close width={10} height={10} color="#D9D9D9" />
          </div>
        </div>
      )}
    </div>
  )
}
export const GroupInput = React.memo(forwardRef(_GroupInput))
