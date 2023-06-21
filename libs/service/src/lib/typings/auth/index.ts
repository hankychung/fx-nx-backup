export interface IMatterAuth {
  maxTaker: number // 事项协作人最大值
  maxTaskTag: number // 事项内最大标签
  maxChildMatter: number // 子事项最大值
  isVip: boolean // 事项创建人是否vip
  maxCustomRemind: number // 事项自定义提醒
  memberId: string // 事项创建人id
  isTeamVip: boolean // 事项创建人是否团队会员
}
