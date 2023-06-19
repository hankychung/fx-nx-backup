import { IMatterAuth } from './index'

// 默认 事项权限 兜底
export const defaultMatterAuth: IMatterAuth = {
  maxTaker: 20, // 协助人
  maxTaskTag: 99, // 标签
  maxChildMatter: 5, // 子事项
  isVip: false,
  maxCustomRemind: 1,
  memberId: '',
  isTeamVip: false
}
