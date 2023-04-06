import { SqlStore } from '@flyele-nx/sql-store'
import { FilterKeys } from './type'

const INIT_DB = 'INIT_DB'

const SqlFilterTimerkeys: { filter_key: FilterKeys; keys: [string, string] }[] =
  [
    { filter_key: 'task_at', keys: ['start_time', 'end_time'] },
    { filter_key: 'complete_at', keys: ['complete_stime', 'complete_etime'] },
    { filter_key: 'finish_time', keys: ['finish_stime', 'finish_etime'] },
    { filter_key: 'update_at', keys: ['update_stime', 'update_etime'] },
    { filter_key: 'create_at', keys: ['create_stime', 'create_etime'] }
  ]

const SqlFilterSplitKeys: {
  filter_key: keyof SqlStore.Filter.FilterParamsFilter
  key: string
}[] = [
  { filter_key: 'parent_ids', key: 'parents_id' },
  {
    filter_key: 'application_ids',
    key: 'application_id'
  },
  {
    filter_key: 'matter_states',
    key: 'matter_state'
  },
  {
    filter_key: 'priority_levels',
    key: 'priority_level'
  },
  {
    filter_key: 'taker_ids',
    key: 'taker_id'
  },
  {
    filter_key: 'creator_ids',
    key: 'creator_id'
  },
  {
    filter_key: 'admins_ids',
    key: 'admins_id'
  },
  {
    filter_key: 'project_ids',
    key: 'project_id'
  },

  {
    filter_key: 'workspace_ids',
    key: 'workspace_id'
  }
]

export { INIT_DB, SqlFilterTimerkeys, SqlFilterSplitKeys }
