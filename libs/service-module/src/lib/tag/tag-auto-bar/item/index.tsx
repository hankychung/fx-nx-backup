import React, {
  MouseEvent,
  useContext,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { AutoTagBarContext } from '../service'
import { TagModel } from '@flyele-nx/service'
import { TagUtils } from '../../tag_utils'
import css from '../index.module.scss'

type AutoTagItemProps = {
  order: number
  data: TagModel
  onClick?: (e: MouseEvent, tag: TagModel) => void
}

type AutoTagItemState = {
  width?: number
  visible?: boolean
}

export function AutoTagItem(props: AutoTagItemProps) {
  const { streamController, storeMap } = useContext(AutoTagBarContext)!

  const { data, order: _proOrder, onClick } = props

  // 监听的dom
  const dom = useRef<HTMLDivElement | null>(null)

  // 整个状态
  const [state, setState] = useState<AutoTagItemState>({})

  const originalWidthRef = useRef<number>(0)

  // 获取最初 宽度
  useLayoutEffect(() => {
    originalWidthRef.current = dom.current?.clientWidth ?? 0
  }, [])

  useLayoutEffect(() => {
    // 监听事件 修改当前
    const key = streamController.addStreamListener((event) => {
      if (event && event.id === data.id) {
        const { width, visible, originalWidth } = event

        const _newWidth = width === originalWidth ? undefined : width

        setState({ width: _newWidth, visible })
      }
    })

    return () => {
      streamController.removeEvent(key)
    }
  }, [data, _proOrder, streamController])

  // 每次 data 改变就初始化
  useLayoutEffect(() => {
    // 初始化设置
    const width = originalWidthRef.current

    setState({ width: undefined, visible: false })

    // 初始化保存
    storeMap.set(data.id, {
      id: data.id,
      width,
      visible: false,
      originalWidth: width,
      order: _proOrder,
      name: data.name
    })

    return () => {
      storeMap.delete(data.id)
    }
  }, [data, _proOrder, storeMap])

  const { width, visible } = state

  const bgColor = TagUtils.getBgColor(data.color)

  const textColor = TagUtils.getTextColor(data.color)

  return (
    <div
      onClick={
        onClick
          ? (e) => {
              onClick(e, data)
            }
          : undefined
      }
      className={css['tag-container']}
      ref={dom}
      style={{
        color: textColor,
        opacity: visible ? 1 : 0,
        order: _proOrder,
        backgroundColor: bgColor,
        width
      }}
    >
      <div className={css.tag}>
        <span>{data.name}</span>
      </div>
    </div>
  )
}
