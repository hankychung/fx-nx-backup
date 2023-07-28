interface Member {
  end_time: number
  id: string
  invite_code: string
  start_time: number
  state: 0 | 1 | 2
  user_id: string
  next_end_time?: number //不为空表示他还有个人会员的过期时间
}
export interface IVipMember {
  member: Member
}

export interface IVip {
  id?: string // vip id
  invite_code?: string // vip邀请码
  level: number // 会员等级 1.8v 暂时只存在 0 | 1
  deadline: number // 会员结束时间
  start_time?: number // 会员开始时间
  next_end_time?: number
  end_time?: number
  recently_type?: 1 | 2 | undefined
}

export interface ITabs {
  key: string
  title: string
  clickFunc: () => void
  contextMenuTab: () => void
  contextMenuTxt: string
  contextMenuTo: () => void
  contextMenuMerge: () => void
}

export interface IOption {
  type: string
  pendantCut: string
  tabArr?: string[]
}

export interface Ipos {
  x: number
  y: number
}
export interface IWideHigh {
  MINI: { w: number; h: number }
  NOW_VIEW: { w: number; h: number }
  MONTH_VIEW: { w: number; h: number }
}
export interface IlastScreenRate {
  w: number
  h: number
}
export interface ISettings {
  isOpen: boolean
  theme: string
  isFixed: boolean
  isAlwaysTop: boolean
  pos: Ipos
  lastScreenRate: IlastScreenRate
  lastScreenNum: number
  pendantCut: string
  wideHigh: IWideHigh
  isMerge: boolean
  opacity: number
  opacityFonts: number
  tabArr: string[]
  isMini: boolean
  isShrink: boolean
}
