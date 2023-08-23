import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import style from './index.module.scss'
import { useMemoizedFn } from 'ahooks'
import { debounce } from 'lodash'
import { message } from 'antd'
import { globalNxController } from '@flyele-nx/global-processor'

interface IProps {
  inputStyle?: React.CSSProperties
  maxLen?: number
  placeholder?: string
  onEnter?: () => void
  value: string
  onChange?: (val: string) => void
}

export const TitleInput = (props: IProps) => {
  const {
    maxLen = 300,
    inputStyle,
    placeholder = '请输入标题',
    onEnter,
    value,
    onChange
  } = props
  // const [value, setValue] = useState('')
  const [msg, contextHolder] = message.useMessage()

  const debounceOnEnter = useMemoizedFn(
    debounce(() => {
      onEnter?.()
    })
  )

  // 按下回车
  const onKeyPress = useMemoizedFn((e) => {
    if (e.charCode === 13) e.preventDefault()

    if (e.key.toLowerCase() === 'enter' && !e.altKey && !e.ctrlKey) {
      if (!e.shiftKey) {
        debounceOnEnter()
      } else {
        console.log(
          'shift+enter 不响应换行，因为目前事项标题不支持换行，后续支持的话 可以搜索这句话修改'
        )
      }
    }
  })

  const handleChange = (e: ContentEditableEvent) => {
    if (value.length >= maxLen) {
      // TODO 换showMsg
      msg.error(`最多支持${maxLen}个字符`)
      globalNxController.showMsg({
        msgType: '消息',
        content: `最多支持${maxLen}个字符`
      })
    }

    onChange?.(e.target.value)
  }
  return (
    <div className={style.container}>
      <ContentEditable
        aria-valuemax={maxLen}
        style={inputStyle}
        className={style.input}
        aria-required
        html={value}
        disabled={false}
        onChange={handleChange}
        onKeyPress={onKeyPress}
      />
      {!value.length && (
        <div className={style.placeholder}>
          {placeholder}
          <span style={{ color: 'red' }}>*</span>
        </div>
      )}
      {contextHolder}
    </div>
  )
}
