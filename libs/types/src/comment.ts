interface IApiComment {
  comment_id: string
  ref_type: string
  msg_type: number
  system_type: number
  content: string
  creator_id: string
  create_at: number
  unread: boolean
  is_summary: boolean
  is_self: boolean
  step_un_deal: boolean
  kr_id: string
  nick_name: string
  avatar: string
}

export { IApiComment }
