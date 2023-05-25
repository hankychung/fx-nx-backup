import { BaseQuerySql, FullDoseCountSql } from '../sql/query'
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

export const getFullDoseCountSql = ({ user_id }: { user_id: string }) => {
  const countSql = FullDoseCountSql({ user_id })

  console.log('getFullDoseCountSql', countSql)

  return countSql
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
    keywords,
    parent_id,

    query_type,
    group_by,

    is_follow,
    schedule_hide,
    conclusion: _conclusion,

    tags,

    priority_levels,
    matter_states,
    show_wait_arrange,

    task_ids,
    dispatch_ids,
    repeat_ids,
    taker_ids,
    application_ids,
    creator_ids,
    admins_ids,
    project_ids,
    workspace_ids,
    parent_ids,
    flow_step_ids,

    task_at,
    create_at,
    update_at,
    finish_time,
    complete_at
  } = filter || {}

  const { order_by_key, sort } = order_by || {}

  let LIMIT = ''

  if (page_number && page_record) {
    LIMIT = `LIMIT ${(page_number - 1) * page_record}, ${page_record}`
  }

  let queryModel = show_model

  const WHERES: string[] = []

  const ORDERS: string[] = []

  // 平铺模式下 查询所有小于等于今天的
  let LeftJoinRepeatAnd = `LEFT JOIN task_repeat AS d ON c.id = d.task_id AND b.repeat_type > 0 
  LEFT JOIN task_repeat_finish AS e ON d.repeat_id = e.repeat_id AND e.user_id = ${user_id}`

  if (show_wait_arrange) {
    WHERES.push(`date_idx = 99`)
  }

  /**
   * 标题/背景信息
   */
  if (keywords) {
    queryModel = 1
    WHERES.push(`(title LIKE '%${keywords}%' OR detail LIKE '%${keywords}%')`)
  }

  // 如果是收合模式默认查询顶级事项
  if (queryModel === 2 && !parent_id) {
    WHERES.push(`(parent_id = '' OR category = 1)`)
  }

  // 如果是收合模式只查询循环时间小于等于今天的 或者循环次数仅等于一的
  if (queryModel === 2) {
    LeftJoinRepeatAnd = `LEFT JOIN(SELECT task_id, repeat_id, start_time, end_time, start_time_full_day, 
        end_time_full_day, complete_at, cycle, MAX(cycle_date) AS cycle_date
      FROM task_repeat 
      WHERE STRFTIME('%Y-%m-%d', cycle_date, 'localtime') <= DATETIME('now', 'localtime') OR cycle = 1
      GROUP BY task_id) AS d ON c.id = d.task_id AND b.repeat_type > 0
      LEFT JOIN (SELECT MAX(finish_time) AS finish_time, task_id
        FROM task_repeat_finish
      WHERE user_id = ${user_id}
      GROUP BY task_id) AS e ON a.ref_task_id = e.task_id`
  }

  /**
   * 查询目标子事项
   */
  if (parent_id) {
    LIMIT = ''

    WHERES.push(`parent_id = '${parent_id}'`)
  }

  /**
   * 查询所属事项
   */
  if (parent_ids) {
    const hasNull = parent_ids.includes('-1')
    const tParentIds = parent_ids.filter((v) => v !== '-1')

    const nStr = hasNull ? `(parent_id = '')` : ''
    const tStr = tParentIds.length
      ? `(${tParentIds.map((id) => `INSTR(parent_id, ${id})`).join(' OR ')})`
      : ''

    WHERES.push(
      `(${nStr} ${hasNull && tParentIds.length ? 'OR' : ''} ${
        tStr ? `(${tStr})` : ''
      } )`
    )
  }

  /**
   * 是否关注
   */
  if (is_follow) {
    WHERES.push(`is_follow = ${Number(Number(is_follow) === 1)}`)
  }

  /**
   * 是否隐藏
   */
  if (schedule_hide) {
    WHERES.push(`schedule_hide = ${Number(Number(schedule_hide) === 1)}`)
  }

  /**
   * 是否有总结
   */
  if (_conclusion) {
    const conclusion =
      typeof _conclusion === 'number' ? _conclusion : parseInt(_conclusion)

    if (conclusion === 1) {
      WHERES.push(`conclusion != ''`)
    } else if (conclusion === 2) {
      WHERES.push(`conclusion = ''`)
    }
  }

  /**
   * 筛选指定的task_id
   */
  if (task_ids?.length) {
    WHERES.push(`task_id IN (${task_ids.join(',')})`)
  }

  if (dispatch_ids?.length) {
    WHERES.push(`dispatch_id IN (${dispatch_ids.join(',')})`)
  }

  /**
   * 筛选指定的repeat_id
   */
  if (repeat_ids?.length) {
    WHERES.push(`repeat_id IN (${repeat_ids.join(',')})`)
  }

  /**
   * 分区规则
   */
  switch (group_by) {
    /** 按项目分区 */
    case FullGroupBy.project: {
      // 过滤无项目的事项
      // WHERES.unshift(`project_id > 0`)

      const theOrder = []

      theOrder.push(`is_no_project ASC, project_id DESC`)

      if (order_by_key && sort) {
        if (order_by_key === 'timestamp') {
          theOrder.push(
            `date_idx ${sort}, date ${sort}, time_idx ${sort}, create_at ${
              sort?.toUpperCase() === 'DESC' ? 'ASC' : 'DESC'
            }`
          )
        } else {
          theOrder.push(`${order_by_key} ${sort}`)
        }
        theOrder.concat([`task_id ${sort}`, `repeat_id ${sort}`])
      } else {
        theOrder.push(`date_idx ASC, create_at DESC`)
      }

      ORDERS.push(...theOrder)

      // ORDERS.unshift(`is_no_project ASC, project_id DESC, date_idx ASC`)

      break
    }
    /** 按事项时间分区 */
    case FullGroupBy.time: {
      const isOrderTime = order_by_key === 'timestamp'

      const orderIsTime = isOrderTime && sort?.toUpperCase() === 'DESC'

      /**
       * 今日
       */
      if (typeof timestamp === 'number' && !parent_id) {
        if (direction === Direction.up) {
          let contrast = '<'

          if (orderIsTime) {
            contrast = '>='
          }

          // 往上翻的时候
          WHERES.push(`timestamp ${contrast} ${timestamp}`)
        } else if (direction === Direction.down) {
          let contrast = '>='

          if (orderIsTime) {
            contrast = '<'
          }

          // 往下翻的时候
          WHERES.push(`timestamp ${contrast} ${timestamp}`)
        }
      }

      /**
       * 往上或者往下获取
       */
      if (direction) {
        let up = 'DESC'
        let down = 'ASC'

        if (orderIsTime) {
          up = 'ASC'
          down = 'DESC'
        }

        if (direction === Direction.up) {
          // const upOrder = orderIsTime || !isOrderTime ? 'ASC' : 'DESC'

          ORDERS.unshift(
            `date_idx ASC, date ${up}, time_idx DESC, create_at ${
              orderIsTime ? 'DESC' : 'ASC'
            }`
          )
        } else {
          // const downOrder = orderIsTime ? 'DESC' : 'ASC'

          ORDERS.unshift(
            `date_idx ASC, date ${down}, time_idx ASC, create_at ${
              orderIsTime ? 'ASC' : 'DESC'
            }`
          )
        }
      } else if (isOrderTime) {
        ORDERS.unshift(
          `date_idx ${sort}, date ${sort}, time_idx ${sort}, create_at ${
            sort?.toUpperCase() === 'DESC' ? 'ASC' : 'DESC'
          }`
        )
      } else {
        ORDERS.unshift(`date_idx ASC, date ASC, time_idx ASC, create_at DESC`)
      }

      ORDERS.concat([`task_id ${sort || 'ASC'}`, `repeat_id ${sort || 'ASC'}`])

      break
    }

    /** 不分区 */
    default: {
      if (!order_by_key) {
        ORDERS.unshift(`date_idx ASC, create_at ASC`)
      } else if (order_by_key === 'timestamp') {
        ORDERS.push(`date_idx ${sort}, ${order_by_key} ${sort}`)
        ORDERS.concat([`task_id ${sort}`, `repeat_id ${sort}`])
      } else {
        ORDERS.push(`${order_by_key} ${sort}`)
        ORDERS.concat([`task_id ${sort}`, `repeat_id ${sort}`])
      }

      // else {
      //   ORDERS.unshift(`${order_by_key} ${sort}`)
      // }
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
    const inTagStr = tagIds.length
      ? `(${tagIds.map((v) => `INSTR(tag_str, ${v})`).join(' or ')})`
      : ''

    WHERES.push(`(${tagIsNullStr} ${link} ${inTagStr})`)
  }

  /**
   * 事项时间
   */
  if (task_at?.end_time && task_at.start_time) {
    const { start_time, end_time } = task_at

    WHERES.push(`((start_time BETWEEN ${start_time} AND ${end_time}) OR (end_time BETWEEN ${start_time} AND ${end_time}) OR
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
    const tStr = tTakerIds
      ? `(${tTakerIds.map((id) => `INSTR(takers, ${id})`).join(' OR ')})`
      : ''

    WHERES.push(`(${nStr} ${hasNull && tTakerIds.length ? 'OR' : ''} ${tStr})`)
    // const hasNull = taker_ids.includes('-1')
    // const tTakerIds = taker_ids.filter((v) => v !== '-1')

    // const nStr = hasNull ? `taker_total = 0 ` : ''
    // const tStr = `exists(
    //   SELECT 1 FROM task_dispatch t WHERE t.ref_task_id = task_id AND t.taker_id IN (${tTakerIds.join(
    //     ','
    //   )}) LIMIT 1)`

    // WHERES.push(`(${nStr} ${hasNull && tTakerIds.length ? 'OR' : ''} ${tStr})`)
  }

  // 工作流
  if (flow_step_ids?.length) {
    const hasCompate = flow_step_ids.includes('-2')

    const completeStr = 'OR (flow_step_id > 0 AND complete_at > 0)'

    const nullIndex = flow_step_ids.findIndex((v) => v === '-1')

    if (nullIndex !== -1) {
      flow_step_ids[nullIndex] = '0'
    }

    WHERES.push(
      `(flow_step_id IN (${flow_step_ids.join(',')}) ${
        hasCompate ? completeStr : ''
      })`
    )
  }

  /**
   * 责任人筛选
   */
  if (admins_ids?.length) {
    const hasNull = admins_ids.includes('-1')
    const tAdminIds = admins_ids.filter((v) => v !== '-1')

    const nStr = hasNull ? `(admins IS NULL)` : ''
    const tStr = tAdminIds.length
      ? `(${tAdminIds.map((id) => `INSTR(admins, ${id})`).join(' OR ')})`
      : ''

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
      WHERES.push(
        `creator_id = ${user_id} AND takers != '' AND takers != '${user_id}'`
      )
      break
    }
    //我接受
    case FilterQueryType.accepted: {
      WHERES.push(`creator_id != ${user_id}`)
      break
    }
    // 协作事项
    case FilterQueryType.cooperation: {
      WHERES.unshift(`takers != '${user_id}'`)
      // WHERES.push(`(taker_total > 1 OR (takers != ${user_id} ))`)
      break
    }
    // 个人事项
    case FilterQueryType.personal: {
      WHERES.unshift(
        `(takers = CAST(${user_id} AS text) OR (takers ISNULL AND creator_id = ${user_id}))`
      )
      // WHERES.push(`taker_total = 1 AND takers = ${user_id}`)
      break
    }
    //我进行中
    case FilterQueryType.in_progress: {
      WHERES.push(
        `finish_time = 0
        AND (DATETIME(start_time, 'unixepoch', 'localtime') <= DATETIME('now', 'localtime') OR
             STRFTIME('%Y-%m-%d', cycle_date, 'localtime') <= DATETIME('now', 'localtime'))
        AND (end_time = 0 OR DATETIME(end_time, 'unixepoch', 'localtime') > DATETIME('now', 'localtime'))`
      )
      break
    }
    //我延期中
    case FilterQueryType.delay: {
      WHERES.push(
        `finish_time = 0 AND end_time > 0 AND DATETIME(end_time, 'unixepoch', 'localtime') < DATETIME('now', 'localtime')`
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
