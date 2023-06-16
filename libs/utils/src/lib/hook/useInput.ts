import { checkHtml } from '../dom'
import { ChangeEvent, ClipboardEvent, useRef } from 'react'
import { useMemoizedFn } from 'ahooks'

interface Props {
  maxLen: number
  autoFocus?: boolean
  isCreateTitle?: boolean
}

type FnRef = {
  onChange?: (value: string) => void
  onPaste?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onMoreThanMaxLen?: () => void
}

export const useInput = <T extends { focus: () => void; blur: () => void }>(
  props: Props
) => {
  const { maxLen, autoFocus } = props
  const lockRef = useRef(false)
  const valueRef = useRef('')
  const fnRef = useRef<FnRef>({})

  const isCall = useRef(false)

  const elRef = useRef<T>()

  const getLen = (v: string) => {
    let val = v
    // 时间识别的时候会存在dom，需要把dom过滤掉，不然len就会很长
    const isHtml = checkHtml(val)

    if (isHtml) {
      const dom = document.createElement('div')

      dom.innerHTML = val
      val = dom.innerText
    }
    return val.replace(/[\r\n]/g, '').trim().length
  }

  const inputHandle = (value: string) => {
    let val = value
    const { onMoreThanMaxLen, onChange } = fnRef.current

    if (getLen(val) > maxLen) {
      // 每次change都走for循环是否会占用过多执行时间导致界面卡顿？？应该使用正则match,后面加上
      for (let i = maxLen; i <= val.length; i++) {
        const moreThan = getLen(val.substring(0, i)) > maxLen

        if (moreThan) {
          val = val.substring(0, i - 1)
          break
        }
      }
      onMoreThanMaxLen && onMoreThanMaxLen()
    }

    valueRef.current = val
    onChange && onChange(val)
  }

  const onFocus = () => {
    const { onFocus } = fnRef.current

    onFocus && onFocus()
  }

  const onBlur = () => {
    const { onBlur } = fnRef.current

    onBlur && onBlur()
  }

  const onInput = (event: ChangeEvent<any>) => {
    if (!lockRef.current) {
      inputHandle(event.target.value ?? event.target.innerText)
    } else {
      const { onChange } = fnRef.current

      onChange && onChange(event.target.value ?? event.target.innerText)
    }
  }

  const onCompositionStart = () => {
    lockRef.current = true
  }

  const onCompositionEnd = (event: any) => {
    lockRef.current = false
    inputHandle(event.currentTarget.value ?? event.target.innerText)
  }

  const onPaste = async (event: ClipboardEvent) => {
    if (event.clipboardData.getData('text/html')) {
      event.preventDefault()

      const str = event.clipboardData.getData('Text')

      const timer = setTimeout(async () => {
        clearTimeout(timer)

        await navigator.clipboard.writeText(str.split(/\r\n\r\n/).join('\n'))

        document.execCommand('paste')
      })
    }
  }

  const setCb = <Key extends keyof FnRef>(key: Key, value: FnRef[Key]) => {
    fnRef.current[key] = value
  }

  const inputRef = useMemoizedFn((ref: T) => {
    elRef.current = ref

    if (ref && !isCall.current) {
      autoFocus && ref.focus()
      isCall.current = true
    }
  })

  const focus = useMemoizedFn(() => {
    elRef.current?.focus()
  })

  const blur = useMemoizedFn(() => {
    elRef.current?.blur()
  })

  return {
    events: {
      onPaste,
      onInput,
      onFocus,
      onBlur,
      onCompositionStart,
      onCompositionEnd
    },
    setCb,
    lockRef,
    ref: inputRef,
    elRef,
    focus,
    blur
  }
}
