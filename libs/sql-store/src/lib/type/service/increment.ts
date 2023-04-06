interface IDiffInfo {
  data: {
    [k: string]: any
  }
  id: string
  keys: {
    [k: string]: any
  }
  type: 'insert' | 'update' | 'delete'
  update_at: number
}

interface IDiffInfoResponse {
  code: number
  data: {
    last_id: string
    list: IDiffInfo[]
  }
}

export { IDiffInfoResponse }
