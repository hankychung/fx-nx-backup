import { useCallback, useEffect, useState } from 'react'

interface Props {
  list: any[]
  defaultIndex: number
  idPrefix?: string // 类名前缀，如果传入则自动移入可视区域，还需要在元素上指定id,规则为 idPrefix_index
  scrollProps?: ScrollIntoViewOptions
}
export const useListPrevNext = (props: Props) => {
  const { list, defaultIndex, idPrefix, scrollProps } = props
  const [selIndex, setSelIndex] = useState(defaultIndex)

  const next = useCallback(() => {
    setSelIndex((index) => {
      const selIndex = index >= list.length - 1 ? 0 : index + 1

      return selIndex
    })
  }, [list])

  const prev = useCallback(() => {
    setSelIndex((index) => {
      const selIndex = index === 0 ? list.length - 1 : index - 1

      return selIndex
    })
  }, [list])

  useEffect(() => {
    if (idPrefix) {
      const ele = document.getElementById(`${idPrefix}_${selIndex}`)
      const scrollObj = scrollProps || { behavior: 'smooth', block: 'center' }

      ele?.scrollIntoView(scrollObj)
    }
  }, [idPrefix, scrollProps, selIndex])

  return {
    selIndex,
    setSelIndex,
    next,
    prev
  }
}
