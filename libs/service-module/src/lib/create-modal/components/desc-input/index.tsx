import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import style from './index.module.scss'

interface IProps {
  descPlaceholderStyle?: React.CSSProperties
  placeholder?: string
  descDisabled?: boolean
  onChange?: (val: string) => void
}

export const DescInput = (props: IProps) => {
  const { descPlaceholderStyle, placeholder, descDisabled, onChange } = props
  const [value, setValue] = useState('')
  return (
    <TextArea
      style={{ ...descPlaceholderStyle }}
      value={value}
      className={style.desc_input}
      placeholder={placeholder}
      bordered={false}
      onBlur={() => onChange?.(`${value.trim()}`)}
      onChange={(e) => setValue(e.target.value)}
      autoSize
      disabled={descDisabled}
    />
  )
}
