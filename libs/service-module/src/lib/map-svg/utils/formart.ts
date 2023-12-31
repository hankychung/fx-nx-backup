import dayjs from 'dayjs'
import { Data } from '../type/data'
import { BaseTimerData, isFullDay, MDataTypeEnum } from '../type/mdata'
import { ObjectiveData } from '../type/target'
import { CreateProxy } from '../type/bin'
import { MapSvgGetAvatarProxyFunc } from '../type/system'

export const getAvatarProxyMapSvg = CreateProxy<MapSvgGetAvatarProxyFunc>(
  (_user_id: string) => {
    return undefined
  }
)

// 格式化事项时间
export const FomratMainTimerStr = (d: BaseTimerData): string => {
  let start = ''
  let end = ''

  const FullDay = 'M月D日'
  const NotFullDay = 'M月D日 HH:mm'

  const AllDay = ' (全天)'
  const StartTimerSlot = ' 开始'
  const EndTimerSlot = ' 截止'

  const haveStart = !!d.start_time
  const haveEnd = !!d.end_time

  const StartIsFullDay = d.start_time_full_day === isFullDay.Yes
  const EndIsFullDay = d.end_time_full_day === isFullDay.Yes

  const start_time = dayjs((d.start_time || 0) * 1000)
  const end_time = dayjs((d.end_time || 0) * 1000)
  const now_time = dayjs(Date.now())

  if (haveStart) {
    // 8月1日 全天
    if (StartIsFullDay)
      start = `${start_time.format(FullDay)}${haveEnd ? '' : AllDay}`
    // 8月1日 14:00 开始
    else
      start = `${start_time.format(NotFullDay)}${haveEnd ? '' : StartTimerSlot}`

    if (!now_time.isSame(start_time, 'year')) {
      start = `${start_time.year()}年${start}`
    }
  }
  if (haveEnd) {
    // 如果有开始时间 且和 开始时间同年同日
    if (haveStart && end_time.isSame(start_time, 'date')) {
      if (!StartIsFullDay && EndIsFullDay) {
        start = `${start}${StartTimerSlot}`
      } else if (!StartIsFullDay && !EndIsFullDay) {
        end = end_time.format('HH:mm')
      } else if (StartIsFullDay && !EndIsFullDay) {
        end = `${end_time.format(NotFullDay)}${EndTimerSlot}`
      } else start += AllDay
    } else {
      // 8月1日
      if (EndIsFullDay) end = end_time.format(FullDay)
      // 8月1日 14:00
      else end = end_time.format(NotFullDay)

      if (!haveStart) {
        end = `${end}${EndTimerSlot}`

        if (!now_time.isSame(end_time, 'year'))
          end = `${end_time.year()}年${end}`
      } else if (!end_time.isSame(start_time, 'year')) {
        end = `${end_time.year()}年${end}`
      }
    }
  }

  if (start && end) return `${start} - ${end}`
  else return start || end || '添加时间'
}

export const formatObjectiveData = (
  objective_data: ObjectiveData,
  isSuperiors?: boolean
) => {
  return {
    title: objective_data.title,
    target_id: objective_data.objective_id,
    target_status: objective_data.state,
    target_progress: (objective_data.schedule || 0) / 100,
    target_level: objective_data.level,
    superiors_total: isSuperiors ? objective_data.relation_total : 0,
    children_total: !isSuperiors ? objective_data.relation_total : 0,
    takers: (objective_data?.objective_member || []).map((v) => {
      return {
        avatar: v.avatar || getAvatarProxyMapSvg.value(v.user_id),
        user_id: v.user_id
      }
    }),
    card_type: MDataTypeEnum.target
  }
}

export const formatMdata = (data: Data, isSuperiors?: boolean) => {
  const { up_list, down_list } = data

  const formatData = {
    title: '',
    children: [] as Data[],
    superiors: [] as Data[]
  }

  if (down_list && down_list.length) {
    for (const c of down_list) {
      formatData.children.push(formatMdata(c))
    }
  }

  if (up_list && up_list.length) {
    for (const s of up_list) {
      formatData.superiors.push(formatMdata(s, true))
    }
  }

  Object.assign(
    formatData,
    formatObjectiveData(data as ObjectiveData, isSuperiors)
  )

  return formatData
}

export const formatGetDomStrText = (str: string) => {
  const span = document.createElement('span')

  span.innerHTML = str

  const text = span.textContent

  span.remove()

  return text
}
