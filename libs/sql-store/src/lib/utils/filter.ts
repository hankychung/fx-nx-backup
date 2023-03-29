import { BaseQuerySql } from "../sql/query";
import { FilterParamsProps } from "../type/filter";

export const getFilterSql = (params: FilterParamsProps) => {
  const { user_id, page_number, parent_id, page_record } = params

  const LIMIT = `LIMIT ${(page_number - 1) * page_record}, ${page_record}`

  const WHERES: string[] = []

  if (parent_id) {
    WHERES.push(`parent_id IN (${parent_id})`)
  }

  const where = WHERES.length ? `WHERE ${WHERES.join(' AND ')}` : ''

  return BaseQuerySql({ limit: LIMIT, user_id, where })
}