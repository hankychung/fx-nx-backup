/**
 author: william   email:362661044@qq.com
 create_at:2021/10/20 下午 5:17
 **/

import { Popover } from 'antd'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  KeyboardEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { useInput } from '@flyele-nx/utils'
import cs from 'classnames'
import { TagUtils } from '../tag_utils'
import { TagModel, TagConst } from '@flyele-nx/service'
import css from './index.module.scss'
import { useMessage } from '@flyele-nx/ui'

// 颜色选择器
interface TagInputProps {
  defaultColor?: TagConst.TagWidgetColor
  defaultValue?: string
  onTap?: (
    name: string,
    color: TagConst.TagWidgetColor,
    callback?: (arg: { tags: TagModel[]; selectedTags: string[] }) => void
  ) => void
  onChange?: (name: string, color: TagConst.TagWidgetColor) => void
  emptyCallBack?: () => void
  wrapCla?: string
}
export interface InputRef {
  name?: string
  pickerColor?: TagConst.TagWidgetColor
}

const _TagInput: ForwardRefRenderFunction<InputRef, TagInputProps> = (
  props,
  inputRef
) => {
  const {
    defaultColor = TagConst.TagWidgetColor.green,
    defaultValue,
    onTap,
    onChange,
    emptyCallBack,
    wrapCla
  } = props

  const [showMsg] = useMessage()
  const tagRef = useRef<HTMLDivElement>(null)

  const [pickerColor, setPickerColor] = useState(defaultColor)

  // 单纯用来刷新状态
  const [name, setName] = useState<string>(defaultValue ?? '')

  // 选择颜色 气泡
  const [visible, setVisible] = useState(false)

  const maxLength = 12

  const { events, ref, setCb, focus } = useInput<HTMLInputElement>({
    maxLen: maxLength,
    autoFocus: true,
    isCreateTitle: true
  })

  useEffect(() => {
    focus()
  })

  const onChangeValue = (value: string) => {
    setName(value)
  }

  useImperativeHandle(inputRef, () => ({ name, pickerColor }), [
    name,
    pickerColor
  ])

  useEffect(() => {
    setCb('onChange', (value: string) => {
      if (onChange) onChange(value, pickerColor)
      onChangeValue(value)
    })
    setCb('onMoreThanMaxLen', () => {
      showMsg({
        msgType: '消息',
        content: `标签名称最多${maxLength}个字符`
      })
    })
  }, [onChange, pickerColor, setCb, showMsg])

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (name.trim().length === 0) {
        emptyCallBack && emptyCallBack()
        return
      }
      if (onTap) {
        onTap(name, pickerColor)
      }
      setName('')
      setPickerColor(TagUtils.loopColor(pickerColor))
    }
  }

  // 选择颜色
  const onPickColor = (color: TagConst.TagWidgetColor) => {
    if (onChange) onChange(name, color)
    setPickerColor(color)
    setVisible(false)
  }

  // 气泡action
  const handleVisibleChange = () => {
    setVisible(!visible)
  }

  // 颜色列表
  const buildColorList = () => {
    const colorList = TagUtils.getColorList()

    const list = colorList.map((item) => {
      const color = item as TagConst.TagWidgetColor

      return (
        <ColorPickerRadio
          onChange={onPickColor}
          key={color}
          color={color}
          checked={color === pickerColor}
        />
      )
    })

    return <div className={css['tag-color-list']}>{list}</div>
  }

  return (
    <div className={cs(css['tag-input'], wrapCla)} ref={tagRef}>
      <input
        type="text"
        ref={ref}
        value={name}
        {...events}
        onKeyPress={onKeyPress}
        placeholder="输入标签，回车创建"
      />
      <Popover
        getPopupContainer={() => tagRef.current ?? document.body}
        open={visible}
        onOpenChange={handleVisibleChange}
        content={buildColorList()}
        placement="bottom"
        trigger="hover"
      >
        <div style={{ display: 'inline-block' }}>
          <ColorPickerRadio color={pickerColor} checked />
        </div>
      </Popover>
    </div>
  )
}

/** tag 颜色radio **/
interface ColorPickerRadioProps {
  checked?: boolean
  color: TagConst.TagWidgetColor
  onChange?: (color: TagConst.TagWidgetColor) => void
}
function ColorPickerRadio(props: ColorPickerRadioProps) {
  const { checked, color, onChange } = props
  const bgColor = TagUtils.getBgColor(color)
  const textColor = TagUtils.getTextColor(color)

  return (
    <div
      onClick={onChange ? () => onChange(color) : undefined}
      className={css['tag-color-radio']}
      style={{ backgroundColor: bgColor, borderColor: textColor }}
    >
      <div
        className={css['radio-checked']}
        style={{
          visibility: checked ? 'visible' : 'hidden',
          backgroundColor: textColor
        }}
      />
    </div>
  )
}

export const TagInput = forwardRef(_TagInput)
