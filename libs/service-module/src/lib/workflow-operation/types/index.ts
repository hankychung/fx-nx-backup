export type IOperation = 'pass' | 'complete' | 'handle'

export interface IOperationProps {
  taskId: string
  creator_id: string
  complete_at?: number
  curStepId: string
  handleHover?: (isHover: boolean) => void
  size?: number
  popoverPos?: 'fixed' | 'absolute'
  addClickAlwaysHide?: boolean // 控制器点show的时候是否需要加上 addClickAlwaysHide
  status: IOperation
  changeStatus?: () => void
}

export type IWorkflowAddUser = {
  avatar: string
  name: string
  isVip?: boolean
  isTeamVip?: boolean
}

export interface IWorkflowMember {
  userId: string // 协作人id
  avatar: string // 协作人头像
  isLock?: boolean // 是否固定协作人
  canRemove?: boolean // 是否可移除协作人
  isBack?: boolean // 是否退回
  isComplete?: boolean // 是否完成
  isRemoved?: boolean // 是否已移出
  name?: string //协作人昵称
  isTeamVip?: boolean // 是否团队会员
  isVip?: boolean //是否个人会员
}
