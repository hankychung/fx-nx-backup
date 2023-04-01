import { BaseQuerySql } from '../sql/query'
import {
  Direction,
  FilterParamsProps,
  FilterQueryType,
  FullGroupBy
} from '../type/filter'

export const getFilterSql = (
  params: FilterParamsProps & { timestamp: number }
) => {
  const {
    user_id,
    direction,
    page_number,
    timestamp,
    page_record,
    show_model,

    filter
  } = params

  const {
    keyword,
    parent_id,

    query_type,
    group_by,

    is_follow,
    schedule_hide,
    conclusion,

    tags,

    taker_ids,
    application_ids,
    creator_ids,
    admins_ids,
    project_ids,
    workspace_ids,

    create_at,
    update_at,
    finish_time,
    complete_at
  } = filter || {}

  const LIMIT = `LIMIT ${(page_number - 1) * page_record}, ${page_record}`

  let queryModel = show_model

  const WHERES: string[] = []

  const ORDERS: string[] = ['repeat_id ASC', 'task_id DESC']

  /**
   * 标题/背景信息
   */
  if (keyword) {
    queryModel = 1
    WHERES.push(`(title LIKE '%${keyword}%' OR detail LIKE '%${keyword}%')`)
  }

  // 如果是收合模式默认查询顶级事项
  if (queryModel === 2 && !parent_id) {
    WHERES.push(`parent_id IN (${0})`)
  }

  /**
   * 所属事项
   */
  if (parent_id) {
    WHERES.push(`parent_id IN (${parent_id})`)
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

  if (conclusion) {
    if (conclusion === 1) {
      WHERES.push(`conclusion != ''`)
    } else if (conclusion === 2) {
      WHERES.push(`conclusion = ''`)
    }
  }

  /**
   * 分区规则
   */
  if (group_by) {
    switch (group_by) {
      /** 按项目分区 */
      case FullGroupBy.project: {
        ORDERS.push(`project_id DESC`)
        break
      }
      /** 按事项时间分区 */
      case FullGroupBy.time: {
        /**
         * 今日
         */
        if (typeof timestamp === 'number') {
          WHERES.push(
            `timestamp ${direction === Direction.up ? '<' : '>='} ${timestamp}`
          )
        }
        /**
         * 往上或者往下获取
         */
        if (direction) {
          if (direction === Direction.up) {
            ORDERS.push('timestamp DESC')
          } else {
            ORDERS.push('timestamp !=0, timestamp ASC')
          }
        }
        break
      }
      default:
        break
    }
  }

  if (application_ids?.length) {
    const hasNo = application_ids.includes('-1')

    const isNullStr = hasNo ? 'application_id = 0' : 'application_id != 0'

    // 实际要筛选的id
    const applicationIds = application_ids.filter((i) => i !== '-1')

    const hasAppId = !!application_ids.length

    let link = ''

    if (hasNo && hasAppId) {
      link = 'OR'
    } else if (hasAppId && !hasNo) {
      link = 'AND'
    }

    const inStr = applicationIds.length
      ? `application_id IN (${applicationIds.join(',')})`
      : ''

    WHERES.push(`(${isNullStr} ${link} ${inStr}`)
  }

  /**
   * 筛选标签
   */
  if (tags?.length) {
    // 是否包含无标签
    const hasNoNull = tags.includes('-1')

    const tagIsNullStr = hasNoNull ? 'tag_str IS NULL' : 'tag_str IS NOT NULL'

    // 实际要筛选的id
    const tagIds = tags.filter((i) => i !== '-1')

    // 是否包含要指定筛选id的
    const hasTagId = !!tagIds.length

    let link = ''

    if (hasNoNull && hasTagId) {
      link = 'OR'
    } else if (hasTagId && !hasNoNull) {
      link = 'AND'
    }

    // 生成要匹配指定id的
    const inTagStr = tagIds.map((v) => `INSTR(tag_str, ${v})`).join(' or ')

    WHERES.push(`(${tagIsNullStr} ${link} (${inTagStr}))`)
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
   * 责任人筛选
   */
  if (admins_ids?.length) {
    WHERES.push(
      `exists(
          SELECT 1 FROM task_dispatch t WHERE t.ref_task_id = task_id AND is_admin > 0 AND t.taker_id IN (${admins_ids.join(
            ','
          )}))`
    )
  }

  /**
   * 空间筛选
   */
  if (workspace_ids?.length) {
    WHERES.push(`workspace_id in (${workspace_ids.join(',')})`)
  }

  /**
   * 按项目筛选
   */
  if (project_ids) {
    WHERES.push(`project_id in (${project_ids.join(',')})`)
  }

  /**
   * 事项筛选
   */
  // 0->所有筛选，1->未完成，2->已完成，3->我派发，4->我接受，5->协作事项，6->个人事项，7->我进行中，8->我延期中
  switch (query_type) {
    //未完成
    case FilterQueryType.unComplete: {
      WHERES.push('finish_time = 0')
      break
    }
    //已完成
    case FilterQueryType.complete: {
      WHERES.push('finish_time > 0')
      break
    }
    //我派发
    case FilterQueryType.dispatch: {
      WHERES.push(`creator_id = ${user_id}`)
      break
    }
    //我接受
    case FilterQueryType.accepted: {
      WHERES.push(`creator_id != ${user_id}`)
      break
    }
    //TODO 协作事项
    case FilterQueryType.cooperation: {
      break
    }
    // TODO 个人事项
    case FilterQueryType.personal: {
      break
    }
    //我进行中
    case FilterQueryType.in_progress: {
      WHERES.push(
        `finish_time = 0 AND (a.start_time <= strftime('%s','now') OR a.cycle_date <= strftime('%Y-%m-%d','now')) AND (a.end_time = 0 OR a.end_time > strftime('%s','now'))`
      )
      break
    }
    //我延期中
    case FilterQueryType.delay: {
      WHERES.push(
        `finish_time = 0 AND end_time > 0 AND end_time < strftime('%s','now')`
      )
      break
    }
    default:
      break
  }

  const where = WHERES.length ? `WHERE ${WHERES.join(' AND ')}` : ''
  const order = ORDERS.length ? `ORDER BY ${ORDERS.join(', ')}` : ''

  const sql = BaseQuerySql({ limit: LIMIT, user_id, where, order })

  return sql
}
