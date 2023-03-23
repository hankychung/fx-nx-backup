/**
 * 空间升级类型
 */
export enum SpaceUpgradeType {
  SPACE = 1, // 空间成员
  EXTERNAL = 2 // 外部成员
}

/**
 * 空间成员类型
 */
export enum SpaceMemberType {
  SPACE = 1, // 空间成员
  EXTERNAL = 2 // 外部成员
}
/**
 * 空间角色
 */
export enum SpaceMemberNewType {
  CREATOR = 1, // 创建人
  ADMIN = 2, // 管理员
  SPACE = 3, // 空间成员
  EXTERNAL = 4 // 外部成员
}
/**
 * 空间成员审批状态
 */
export enum SpaceApprovalState {
  UNTREATED = 1, // 未处理
  AGREE = 2, // 同意
  REJECT = 3 // 拒绝
}
