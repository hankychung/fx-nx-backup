import { find } from 'lodash'
import { IFullViewTask, IFullViewTaker, ICreateParams } from '@flyele-nx/types'

function getKey(i: Pick<IFullViewTask, 'task_id' | 'repeat_id'>) {
  return i.repeat_id ? `${i.task_id}-${i.repeat_id}` : i.task_id
}

/**
 * 判断是否有参与事项
 */
export const isInTask = (
  takers: IFullViewTaker[],
  userId: string,
  creatorId: string
) => {
  if (creatorId === userId) return true

  const findTarget = find(takers, (taker) => taker.taker_id === userId)

  return !!findTarget
}
type TimeParams = Partial<
  Pick<
    ICreateParams,
    | 'start_time'
    | 'remind_at'
    | 'end_time'
    | 'end_time_full_day'
    | 'start_time_full_day'
  >
>

// 获取小组件显示参数
export const getWidget = (value: TimeParams & { isLoopMatter?: boolean }) => {
  const { isLoopMatter = false } = value
  const data = {
    execute_addr: false,
    remind: true, // 测试谢家峰要求全部传true, 后面的人有啥问题的就请找他
    time: true // 测试谢家峰要求全部传true， 后面的人有啥问题的就请找他
  }

  // 子事项是没有循环选项的
  if (isLoopMatter) {
    Object.assign(data, { repeat: true })
  }
  return data
}

function createSVG(tag: string, attrs: { [key: string]: any }): SVGElement {
  const elem = document.createElementNS('http://www.w3.org/2000/svg', tag)
  Object.keys(attrs).forEach((attr) => {
    if (attr === 'append_to') {
      const parent = attrs.append_to
      parent.appendChild(elem)
    } else if (attr === 'innerHTML') {
      elem.innerHTML = attrs.innerHTML
    } else {
      elem.setAttribute(attr, attrs[attr])
    }
  })

  return elem
}

export { getKey, createSVG }
