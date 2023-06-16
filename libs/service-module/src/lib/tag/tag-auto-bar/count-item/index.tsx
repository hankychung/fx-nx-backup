/**
 author: william   email:362661044@qq.com
 create_at:2021/12/30 下午 7:53
 **/

import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import css from '../index.module.scss'
import { AutoTagBarContext } from '../service'
import { useMemoizedFn } from 'ahooks'

interface CountItemProps {
  order: number
}

export interface CountItemState {
  order: number
  number: number
  visible: boolean
}

export default function CountItem({ order }: CountItemProps) {
  // 固定宽度

  const service = useContext(AutoTagBarContext)!

  const width = service.countWidth

  // 整个状态
  const [state, setState] = useState<CountItemState>({
    order,
    number: 0,
    visible: false
  })

  const setCountStore = useMemoizedFn(() => {
    service.countStore = {
      number: state.number,
      order: state.order,
      visible: state.visible
    }
  })

  useLayoutEffect(() => {
    // 监听
    service.countController.addListener((e) => {
      if (e) setState(e)
    })

    // 保存当前数据
    setCountStore()

    return () => {
      service.countController.dispose()
    }
  }, [service.countController, setCountStore])

  useLayoutEffect(() => {
    const data = { order, number: 0, visible: false }

    setState(data)
    service.countStore = data
  }, [order, service])

  useEffect(() => {
    setCountStore()
  }, [setCountStore, state])

  const bgColor = 'transparent'

  const textColor = '#B4B4B4'

  const { number, visible, order: _order } = state

  return (
    <div
      className={css['tag-container']}
      style={{
        color: textColor,
        display: visible ? 'inline-block' : 'none',
        order: _order ?? order,
        backgroundColor: bgColor,
        width,
        padding: '1px 0'
      }}
    >
      <div className={css.tag}>
        <span>{`+${number ?? 0}`}</span>
      </div>
    </div>
  )
}
