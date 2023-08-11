import { find } from 'lodash'
import { IFullViewTask, IFullViewTaker, ICreateParams } from '@flyele-nx/types'

import dj, { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { FAKE_ID, FullViewMatterStateEnum } from '@flyele-nx/constant'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
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

interface ITimeInfo {
  sDj: Dayjs
  eDj: Dayjs
  fullStart: boolean
  fullEnd: boolean
}

function formatYearAndDate(_dj: Dayjs) {
  if (dj().isSame(_dj, 'year')) {
    return _dj.format('M月D日')
  }

  return _dj.format('YYYY年M月D日')
}

function formatMonthAndDate(dj: Dayjs) {
  return dj.format('M月D日')
}

function formatTime(d: Dayjs) {
  return d.format('HH:mm')
}

function formatFullTime(d: Dayjs, needYear?: boolean, full?: boolean) {
  return `${(needYear ? formatYearAndDate : formatMonthAndDate)(d)} ${
    full ? '' : formatTime(d)
  }`
}

const getTimeTxt = (
  task: Pick<
    IFullViewTask,
    'start_time' | 'start_time_full_day' | 'end_time' | 'end_time_full_day'
  >,
  isStart: boolean
) => {
  const { start_time, start_time_full_day, end_time, end_time_full_day } = task

  const timeInfo: ITimeInfo = {
    sDj: dj.unix(start_time || 0),
    eDj: dj.unix(end_time || 0),
    fullStart: start_time_full_day === 2,
    fullEnd: end_time_full_day === 2
  }

  if (isStart && start_time) {
    return `${formatFullTime(timeInfo.sDj, true, timeInfo.fullStart)}`
  }

  if (!isStart && end_time) {
    return `${formatFullTime(timeInfo.eDj, true, timeInfo.fullEnd)}`
  }

  return ''
}

function isTask(task: IFullViewTask | string): task is IFullViewTask {
  return typeof task !== 'string'
}

function getId(data: string | IFullViewTask) {
  if (isTask(data)) {
    // return `${data.task_id}-${data.repeat_id || ''}-${data.parentKey || ''}`
    return (
      data.uniqueKey! ||
      `${data.task_id}-${data.repeat_id || ''}${
        data.parentKey ? `-${data.parentKey}` : ''
      }`
    )
  }

  return data
}

const FAKE_ITEM: IFullViewTask = {
  create_at: 0,
  creator_id: useUserInfoStore.getState().userInfo.user_id,
  date: '',
  dispatch_id: '',
  task_id: FAKE_ID,
  title: '',
  state: 10402,
  update_at: 0,
  nick_name: 'fake',
  takers: [],
  matter_state: FullViewMatterStateEnum.EXECUTION,
  matter_type: 10701
}

export const getFakeItem = (options?: { needCurDate?: boolean }) => {
  const curUnix = dayjs().unix()

  return {
    ...FAKE_ITEM,
    create_at: curUnix,
    update_at: curUnix,
    date: options?.needCurDate ? dayjs().format('YYYY-MM-DD') : '',
    start: new Date(),
    end: new Date(),
    name: '',
    id: FAKE_ID,
    type: 'task',
    hideChildren: false,
    displayOrder: 1
  }
}

export { getKey, createSVG, getTimeTxt, getId }
