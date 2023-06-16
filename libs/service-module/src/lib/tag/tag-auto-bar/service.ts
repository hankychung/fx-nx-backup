import { BaseObserver } from '@flyele-nx/utils'
import { BaseStream } from '@flyele-nx/utils'
import React from 'react'
import { CountItemState } from './count-item'
import { TagAutoBarProps } from './index'

/**
 author: william   email:362661044@qq.com
 create_at:2021/12/30 上午 11:22
 **/

export type TagItemEvent = {
  id: string
  visible: boolean
  width?: number
  originalWidth: number
  order: number
  name: string
}

export type CountEvent = CountItemState

// 每个间隔
// export const TagGap = 6
//
// // 容器内边距
// export const BarPadding = 0

// 更多的 id
export const countKey = 'countKey'

// 最小Tag宽度
const minTagWidth = 38

export class AutoTagBarService {
  // 总的bar宽度
  barWidth = 0

  // 更多+1 宽度
  countWidth = 28

  // 标签间隔
  tagGap = 6

  // 保存每个item信息
  storeMap = new Map<string, TagItemEvent>()

  // + n
  countStore: CountEvent | undefined

  constructor(props: Omit<TagAutoBarProps, 'tags'>) {
    const { tagGap = 0 } = props

    this.tagGap = tagGap
  }

  // 实际可用宽度
  get fullSizeWidth(): number {
    return this.barWidth - (this.countWidth + this.tagGap)
  }

  get dataList() {
    const list: TagItemEvent[] = Array.from(this.storeMap.values())

    list.sort((a, b) => {
      return a.order - b.order
    })

    return list
  }

  // 给每个item 发送信号
  streamController = new BaseStream<TagItemEvent>()

  // 获取 count
  countController = new BaseObserver<CountItemState>()

  isLastOne(i: number) {
    return i === this.dataList.length - 1
  }

  // 计算生成 tag
  generateTagItem() {
    let holdWidth = 0

    const visibleList = []

    const countNumber = (index: number) => {
      return this.dataList.length - index
    }

    // 先重置全部
    this.resetTag()
    this.hideCount()

    for (let i = 0; i < this.dataList.length; i++) {
      const item: TagItemEvent = this.dataList[i]

      holdWidth += item.originalWidth + this.tagGap

      // 当前 tag 能够容纳
      if (holdWidth <= this.fullSizeWidth) {
        visibleList.push(i)
        this.showTag({ ...item })
      }

      // tag 裁剪后 差值范围
      let tagClipWidth =
        item.originalWidth - Math.abs(this.fullSizeWidth - holdWidth)

      // 当前tag超出了显示范围
      if (holdWidth > this.fullSizeWidth) {
        // 尝试贪心一点  如果是最后的标签 减去 count的快读
        if (
          this.isLastOne(i) &&
          holdWidth < this.fullSizeWidth + this.countWidth
        ) {
          visibleList.push(i)
          this.showTag(item)
          break
        }

        // 需要裁剪
        // 如果显示范围不够 直接显示 +n
        if (tagClipWidth < minTagWidth) {
          // 溢出不能显示的
          this.showCount({ number: countNumber(i), order: item.order - 1 })
        } else {
          // 如果溢出 还能显示的
          visibleList.push(i)

          // 贪心点 把count 宽度吃了
          if (this.isLastOne(i)) tagClipWidth += this.countWidth

          this.showTag({ ...item, width: tagClipWidth })
          this.showCount({ number: countNumber(i + 1), order: item.order })
        }
        break
      }
    }

    // 没有一个能显示的
    if (visibleList.length === 0 && this.storeMap.size > 0) {
      // 如果没有一个都能显示 就裁剪 order 1 的数据
      const first = this.dataList[0]

      const newWidth =
        first.originalWidth - (first.originalWidth - this.fullSizeWidth)

      if (newWidth > minTagWidth) {
        this.showTag({ ...first, width: newWidth })
        this.showCount({ number: countNumber(1), order: first.order })
      }
    }
  }

  // 重置标签
  resetTag() {
    for (const [key, value] of this.storeMap) {
      if (key && value) {
        const _newData = { ...value, width: undefined, visible: false }

        this.storeMap.set(key, _newData)
        this.hideTag(_newData)
      }
    }
  }

  showTag(props: Omit<TagItemEvent, 'visible'>) {
    this.storeMap.set(props.id, { ...props, visible: true })
    this.streamController.notification({ ...props, visible: true })
  }

  hideTag(props: Omit<TagItemEvent, 'visible'>) {
    this.storeMap.set(props.id, { ...props, visible: false })
    this.streamController.notification({
      ...props,
      visible: false
    })
  }

  showCount(props: Omit<CountItemState, 'visible'>) {
    if (props.number > 0) {
      this.countController.notification({ ...props, visible: true })
    } else {
      this.countController.notification({ ...props, visible: false })
    }
  }

  hideCount() {
    this.countStore = {
      number: 0,
      order: this.dataList.length + 1,
      visible: false
    }
    this.countController.notification(this.countStore)
  }
}
export const AutoTagBarContext = React.createContext<AutoTagBarService | null>(
  null
)
