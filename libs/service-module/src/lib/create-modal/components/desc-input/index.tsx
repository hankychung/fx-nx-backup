import TextArea from 'antd/es/input/TextArea'
import style from './index.module.scss'

interface IProps {
  descPlaceholderStyle?: React.CSSProperties
  placeholder?: string
  descDisabled?: boolean
  value: string
  onChange?: (val: string) => void
}

export const DescInput = (props: IProps) => {
  const { descPlaceholderStyle, placeholder, descDisabled, onChange, value } =
    props

  return (
    <TextArea
      style={{ ...descPlaceholderStyle }}
      value={value}
      className={style.desc_input}
      placeholder={placeholder}
      bordered={false}
      onBlur={() => onChange?.(`${value.trim()}`)}
      onChange={(e) => onChange?.(e.target.value)}
      autoSize
      disabled={descDisabled}
    />
  )
}
