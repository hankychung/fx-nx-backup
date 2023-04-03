import { FilterParamsFilter } from '@flyele-nx/sql-store'

const INIT_DB = 'INIT_DB'

type FilterKeys = keyof FilterParamsFilter

const SqlFilterTimerkeys: { filter_key: FilterKeys; keys: [string, string] }[] =
  [
    { filter_key: 'task_at', keys: ['start_time', 'end_time'] },
    { filter_key: 'complete_at', keys: ['complete_stime', 'complete_etime'] },
    { filter_key: 'finish_time', keys: ['finish_stime', 'finish_etime'] },
    { filter_key: 'update_at', keys: ['update_stime', 'update_etime'] },
    { filter_key: 'create_at', keys: ['create_stime', 'create_etime'] }
  ]

export { INIT_DB, SqlFilterTimerkeys }
