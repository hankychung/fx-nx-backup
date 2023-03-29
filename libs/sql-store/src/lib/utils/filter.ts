import { BaseQuerySql } from '../sql/query'
import { Direction, FilterParamsProps } from '../type/filter'

export const getFilterSql = (
  params: FilterParamsProps & { timestamp: number }
) => {
  const { user_id, page_number, parent_id, page_record, timestamp, direction } =
    params

  const LIMIT = `LIMIT ${(page_number - 1) * page_record}, ${page_record}`

  const WHERES: string[] = []

  const ORDERS: string[] = ['a.repeat_id ASC', 'a.id DESC']

  if (parent_id) {
    WHERES.push(`parent_id IN (${parent_id})`)
  }

  if (typeof timestamp === 'number') {
    WHERES.push(
      `timestamp ${direction === Direction.up ? '<' : '>='} ${timestamp}`
    )
  }

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

  return sql
}
