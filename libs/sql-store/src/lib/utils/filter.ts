import { BaseQuerySql } from '../sql/query'
import { Direction, FilterParamsProps } from '../type/filter'

export const getFilterSql = (
  params: FilterParamsProps & { timestamp: number }
) => {
  const {
    user_id,
    direction,
    page_number,
    timestamp,
    page_record,

    filter
  } = params

  const {
    keyword,
    parent_id,

    is_follow,
    schedule_hide,

    taker_ids,
    creator_ids,
    admins_ids,

    create_at,
    update_at,
    finish_time,
    complete_at
  } = filter || {}

  const LIMIT = `LIMIT ${(page_number - 1) * page_record}, ${page_record}`

  const WHERES: string[] = []

  const ORDERS: string[] = ['repeat_id ASC', 'task_id DESC']

  /**
   * 所属事项
   */
  if (parent_id) {
    WHERES.push(`parent_id IN (${parent_id})`)
  }

  /**
   * 标题/背景信息
   */
  if (keyword) {
    WHERES.push(`(title LIKE '%${keyword}%' OR detail LIKE '%${keyword}%')`)
  }

  /**
   * 是否关注
   */
  if (is_follow) {
    WHERES.push(`is_follow = ${Number(is_follow === 1)}`)
  }

  /**
   * 是否隐藏
   */
  if (schedule_hide) {
    WHERES.push(`schedule_hide = ${Number(schedule_hide === 1)}`)
  }

  /**
   * 今日
   */
  if (typeof timestamp === 'number') {
    WHERES.push(
      `timestamp ${direction === Direction.up ? '<' : '>='} ${timestamp}`
    )
  }

  /**
   * 创建时间
   */
  if (create_at?.start_time && create_at.end_time) {
    const { end_time, start_time } = create_at

    WHERES.push(`create_at >= ${start_time} AND create_at <= ${end_time}`)
  }

  /**
   * 更新时间
   */
  if (update_at?.end_time && update_at?.start_time) {
    const { end_time, start_time } = update_at

    WHERES.push(`update_at >= ${start_time} AND update_at <= ${end_time}`)
  }

  /**
   * 事项完成时间
   */
  if (complete_at?.end_time && complete_at?.start_time) {
    const { end_time, start_time } = complete_at

    WHERES.push(`complete_at >= ${start_time} AND complete_at <= ${end_time}`)
  }

  /**
   * 我完成时间
   */
  if (finish_time?.end_time && finish_time?.start_time) {
    const { end_time, start_time } = finish_time

    WHERES.push(`finish_time >= ${start_time} AND finish_time <= ${end_time}`)
  }

  /**
   * 创建人筛选
   */
  if (creator_ids?.length) {
    WHERES.push(`creator_id IN (${creator_ids.join(',')})`)
  }

  /**
   * 协作人筛选
   */
  if (taker_ids?.length) {
    WHERES.push(
      `exists(
        SELECT 1 FROM task_dispatch t WHERE t.ref_task_id = task_id AND t.taker_id IN (${taker_ids.join(
          ','
        )}))`
    )
  }

  /**
   * 协作人筛选
   */
  if (admins_ids?.length) {
    WHERES.push(
      `exists(
          SELECT 1 FROM task_dispatch t WHERE t.ref_task_id = task_id AND is_admin > 0 AND t.taker_id IN (${admins_ids.join(
            ','
          )}))`
    )
  }

  // 往上或者往下获取
  if (direction) {
    if (direction === Direction.up) {
      ORDERS.push('timestamp DESC')
    } else {
      ORDERS.push('timestamp !=0, timestamp ASC')
    }
  }

  const where = WHERES.length ? `WHERE ${WHERES.join(' AND ')}` : ''
  const order = ORDERS.length ? `ORDER BY ${ORDERS.join(', ')}` : ''

  const sql = BaseQuerySql({ limit: LIMIT, user_id, where, order })

  console.log(sql)
  return sql
}
