import { useMemoizedFn } from 'ahooks'
import { useEffect, useRef } from 'react'
import Sortable, { SortableEvent, Options } from 'sortablejs'

import styles from './index.module.scss'

interface Props {
  el: string | HTMLElement | null
  onEnd: (event: SortableEvent) => any
  options?: Options
  isDisablePointerEvents?: boolean
}

export const isSortableDrag = () => {
  return !!document.getElementsByClassName('sortable-chosen')?.length
}

export const useSortable = (props: Props, deps: any[] = []) => {
  const { el, onEnd, options = {}, isDisablePointerEvents = false } = props

  // 拖拽实例
  const sortRef = useRef<Sortable>()
  // 销毁定时器,
  const distoryTimer = useRef<NodeJS.Timeout>()
  // 是否需要重新绑定
  const needRebind = useRef(false)

  const bindDrag = useMemoizedFn(() => {
    // 如果没有元素走了个寂寞
    if (!el) return

    if (needRebind.current) return

    if (isSortableDrag()) {
      needRebind.current = true
      destorySort()
      return
    }

    // 开始你的表演
    let ele: HTMLElement | null = null

    if (typeof el === 'string') {
      ele = document.querySelector<HTMLElement>(el)
    } else {
      ele = el
    }

    if (!ele) return

    delete sortRef.current

    sortRef.current = Sortable.create(ele, {
      delay: 50,
      touchStartThreshold: 10,
      onEnd,
      ghostClass: isDisablePointerEvents
        ? styles.ghostWithPointerNone
        : styles.ghostClass, // 开始拖拽的时候 被隐藏掉的那个元素的类名
      forceFallback: true,
      fallbackClass: isDisablePointerEvents
        ? styles.fallbackWithPointerNone
        : styles.fallbackClass, // 拖拽的时候 跟随在鼠标上的元素的类名
      scrollSensitivity: 140, // 距离滚动边缘多少的时候开始滚动
      scrollSpeed: 30, // 滚动的速度
      ...options
    })
  })

  const destorySort = useMemoizedFn(() => {
    if (distoryTimer.current) clearTimeout(distoryTimer.current)

    if (isSortableDrag()) {
      distoryTimer.current = setTimeout(() => {
        destorySort()
      }, 300)

      return
    }

    try {
      sortRef.current?.destroy?.()
    } catch (_e) {
      // console.log('sortable destroy error: ', e)
    }

    if (needRebind.current) {
      needRebind.current = false
      bindDrag()
    }
  })

  useEffect(() => {
    bindDrag()

    return () => {
      destorySort()
    }
  }, [el, options, onEnd, bindDrag, destorySort])
}
