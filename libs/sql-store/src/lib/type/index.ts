import * as Filter from './filter'

interface IUserParams {
  token: string
  host: string
  env: string
  userId: string
  wasmUrl?: string
}

export { IUserParams, Filter }
