// 邀请弹窗的tab
export enum InviteMoadlTabKey {
  member = 'member',
  neimeng = 'neimeng',
  qrcode = 'qrcode',
  link = 'link',
  qrcode_unCreated = 'qrcode_unCreated',
  link_unCreated = 'link_unCreated'
}

// 邀请链接参数
export interface IInviteParams {
  taskId?: string
  matterType?: number
  title?: string
  projectId?: string
  spaceId?: string
  isExternal?: boolean
  flow_step_id?: string
  corpId?: string // 企业微信的企业id
}
