/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 18:01:01
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-25 12:42:59
 * @FilePath: /fx-nx/libs/service-module/src/lib/person-pay-modal/hooks/useListPreNext.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useCallback, useEffect, useState } from 'react'
import { IFlyeleAvatarItem } from '../../pay-modal'

interface Props {
  list: IFlyeleAvatarItem[]
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
