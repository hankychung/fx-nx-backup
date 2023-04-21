import * as Filter from './filter'

interface IUserParams {
  token: string
  host: string
  env: string
  userId: string
  wasmUrl?: string
}

interface IQueryFullViewCountRes {
  accepted_total: number
  cooperation_total: number
  delay_total: number
  dispatch_total: number
  finished_total: number
  in_progress_total: number
  personal_total: number
  total: number
  unfinished_total: number
}

export { IUserParams, IQueryFullViewCountRes, Filter }
