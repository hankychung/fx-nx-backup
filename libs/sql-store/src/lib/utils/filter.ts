import { BaseQuerySql } from '../sql/query'
import {
  Direction,
  FilterParamsProps,
  FilterQueryType,
  FullGroupBy
} from '../type/filter'

export const getNullOrNoNullIds = (ids: string[], sqlKey: string) => {
  const hasNull = ids.includes('-1')

  const isNullStr = hasNull ? `${sqlKey} = 0` : `${sqlKey} != 0`

  // 实际要筛选的id
  const filterIds = ids.filter((i) => i !== '-1')

  const hasFilterId = !!filterIds.length

  let link = ''

  if (hasNull && hasFilterId) {
    link = 'OR'
  } else if (hasFilterId && !hasNull) {
    link = 'AND'
  }

  const inStr = filterIds.length ? `${sqlKey} IN (${filterIds.join(',')})` : ''

  return `(${isNullStr} ${link} ${inStr})`
}

export const getFilterSql = (
  params: FilterParamsProps & { timestamp: number; user_id: string }
) => {
  const {
    user_id,
    direction,
    page_number,
    timestamp,
    page_record,
    show_model,

    order_by,
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

    priority_levels,
    matter_states,

    taker_ids,
    application_ids,
    creator_ids,
    admins_ids,
    project_ids,
    workspace_ids,
    parent_ids,

    task_at,
    create_at,
    update_at,
    finish_time,
    complete_at
  } = filter || {}

  const { order_by_key, sort } = order_by || {}

  let LIMIT = `LIMIT ${(page_number - 1) * page_record}, ${page_record}`

  let queryModel = show_model

  const WHERES: string[] = []

  const ORDERS: string[] = ['repeat_id ASC', 'task_id DESC']

  // 平铺模式下 查询所有小于等于今天的
  let LeftJoinRepeatAnd = `d.cycle_date <= STRFTIME('%s', 'now')`

  /**
   * 标题/背景信息
   */
  if (keyword) {
    queryModel = 1
    WHERES.push(`(title LIKE '%${keyword}%' OR detail LIKE '%${keyword}%')`)
  }

  // 如果是收合模式默认查询顶级事项
  if (queryModel === 2 && !parent_id) {
    WHERES.push(`parent_id = ''`)
  }

  // 如果是收合模式只查询循环时间小于等于今天的 或者循环次数仅等于一的
  if (queryModel === 2) {
    LeftJoinRepeatAnd = `(d.cycle_date <= STRFTIME('%s', 'now') OR d.cycle = 1)`
  }

  /**
   * 查询目标子事项
   */
  if (parent_id) {
    LIMIT = ''

    WHERES.push(`parent_id = ${parent_id}`)
  }

  /**
   * 查询所属事项
   */
  if (parent_ids) {
    const hasNull = parent_ids.includes('-1')
    const tParentIds = parent_ids.filter((v) => v !== '-1')

    const nStr = hasNull ? `(parent_id = '')` : ''
    const tStr = tParentIds.map((id) => `INSTR(parent_id, ${id})`).join(' OR ')

    WHERES.push(
      `(${nStr} ${hasNull && tParentIds.length ? 'OR' : ''} (${tStr}))`
    )
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
   * 是否有总结
   */
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
  switch (group_by) {
    /** 按项目分区 */
    case FullGroupBy.project: {
      // 过滤无项目的事项
      WHERES.unshift(`project_id > 0`)

      ORDERS.unshift(`project_id DESC, timestamp !=0`)

      if (order_by_key && sort) {
        ORDERS.push(`${order_by_key} ${sort}`)
      }

      break
    }
    /** 按事项时间分区 */
    case FullGroupBy.time: {
      const orderIsTime = order_by_key === 'timestamp' && sort === 'DESC'

      /**
       * 今日
       */
      if (typeof timestamp === 'number' && !parent_id) {
        if (direction === Direction.up) {
          let contrast = '<'

          if (orderIsTime) {
            contrast = '>='
          }

          // 往上翻的时候 绝对不查待安排
          WHERES.push(`(timestamp ${contrast} ${timestamp} AND is_no_work = 0)`)
        } else {
          let contrast = '>='

          if (orderIsTime) {
            contrast = '<'
          }

          // 往下翻的时候 一定要把安排筛选出来
          WHERES.push(`(timestamp ${contrast} ${timestamp} OR is_no_work = 1)`)
        }
      }

      /**
       * 往上或者往下获取
       */
      if (direction) {
        let up = 'DESC'
        let down = 'ASC'

        if (order_by_key === 'timestamp' && sort === 'DESC') {
          up = 'ASC'
          down = 'DESC'
        }

        if (direction === Direction.up) {
          ORDERS.unshift(`timestamp ${up}`)
        } else {
          ORDERS.unshift(`is_no_work ASC, timestamp ${down}`)
        }
      }
      break
    }
    /** 不分区 */
    default: {
      if (!order_by_key) {
        ORDERS.unshift(`timestamp DESC`)
      } else {
        ORDERS.unshift(`${order_by_key} ${sort}`)
      }
      break
    }
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
   * 事项时间
   */
  if (task_at?.end_time && task_at.start_time) {
    const { start_time, end_time } = task_at

    WHERES.push(`((start_time BETWEEN ${start_time} AND ${end_time}) OR (end_time BETWEEN ${start_time} AND ${end_time})) OR
    (start_time > 0 AND start_time < ${start_time} AND end_time > ${end_time}) OR
    (flow_step_id > 0 AND create_at BETWEEN ${start_time} AND ${end_time}))`)
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
    const hasNull = taker_ids.includes('-1')
    const tTakerIds = taker_ids.filter((v) => v !== '-1')

    const nStr = hasNull ? `(takers IS NULL)` : ''
    const tStr = tTakerIds.map((id) => `INSTR(takers, ${id})`).join(' OR ')

    WHERES.push(
      `(${nStr} ${hasNull && tTakerIds.length ? 'OR' : ''} (${tStr}))`
    )
    // const hasNull = taker_ids.includes('-1')
    // const tTakerIds = taker_ids.filter((v) => v !== '-1')

    // const nStr = hasNull ? `taker_total = 0 ` : ''
    // const tStr = `exists(
    //   SELECT 1 FROM task_dispatch t WHERE t.ref_task_id = task_id AND t.taker_id IN (${tTakerIds.join(
    //     ','
    //   )}) LIMIT 1)`

    // WHERES.push(`(${nStr} ${hasNull && tTakerIds.length ? 'OR' : ''} ${tStr})`)
  }

  /**
   * 责任人筛选
   */
  if (admins_ids?.length) {
    const hasNull = admins_ids.includes('-1')
    const tAdminIds = admins_ids.filter((v) => v !== '-1')

    const nStr = hasNull ? `(admins IS NULL)` : ''
    const tStr = tAdminIds.map((id) => `INSTR(admins, ${id})`).join(' OR ')

    WHERES.push(
      `(${nStr} ${hasNull && tAdminIds.length ? 'OR' : ''} (${tStr}))`
    )
    // WHERES.push(
    //   `exists(
    //       SELECT 1 FROM task_dispatch t WHERE t.ref_task_id = task_id AND is_admin > 0 AND t.taker_id IN (${admins_ids.join(
    //         ','
    //       )}))`
    // )
  }

  /**
   * 事项状态
   */
  if (matter_states?.length) {
    WHERES.push(`matter_state IN (${matter_states.join(',')})`)
  }

  /**
   * 优先级
   */
  if (priority_levels?.length) {
    WHERES.push(`priority_level IN (${priority_levels.join(',')})`)
  }

  /**
   * 所属应用
   */
  if (application_ids?.length) {
    WHERES.push(getNullOrNoNullIds(application_ids, 'application_id'))
  }

  /**
   * 空间筛选
   */
  if (workspace_ids?.length) {
    WHERES.push(getNullOrNoNullIds(workspace_ids, 'workspace_id'))
  }

  /**
   * 按项目筛选
   */
  if (project_ids) {
    WHERES.push(getNullOrNoNullIds(project_ids, 'project_id'))
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
    // 协作事项
    case FilterQueryType.cooperation: {
      WHERES.unshift(`takers != ${user_id}`)
      // WHERES.push(`(taker_total > 1 OR (takers != ${user_id} ))`)
      break
    }
    // 个人事项
    case FilterQueryType.personal: {
      WHERES.unshift(`takers = ${user_id}`)
      // WHERES.push(`taker_total = 1 AND takers = ${user_id}`)
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

  const sql = BaseQuerySql({
    limit: LIMIT,
    user_id,
    where,
    order,
    LeftJoinRepeatAnd
  })

  console.log(sql)
  // 不直接返回 隔断一句 方面后面查看sql 避免冲突
  return sql
}
