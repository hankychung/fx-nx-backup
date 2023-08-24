/**
 * 项目状态
 */
export enum PROJECT_STATE {
  normal = 10201, //正常项目
  dissolve = 10202, //	解散项目
  disable = 10203 // 待激活项目
}

export interface ICheckTaskComboResponse {
  /** 该目的地无法新建、使用应用 */
  application_limit?: string
  /** 不支持自定义循环 */
  custom_circle?: string
  /** 可用容量不足 */
  file_space?: string
  /** 导入项目到空间的返回结果 1 代表失败 2 代表成功 3 代表带审核 4 代表升级并且移入成功 */
  import_result?: string
  /** 导入项目到空间需要审批时返回 */
  notice_id?: string
  /** 最多支持20人 */
  project_member_total?: string
  /** 项目数量-最多支持20 */
  project_total_limit?: string
  /** 子事项层级、数量超出 */
  sub_task_total?: string
  /** 最多支持20人 */
  task_member_total?: string
  /** 该项目最多支持100个事项 */
  task_total?: string
  /** 最多支持20人 */
  workspace_member_total?: string
  /**项目最多支持500个事项 */
  workspace_task_total?: string
}

export enum CheckBoxState {
  checked = 'checked',
  disable = 'disable',
  unset = 'unset'
}

export enum CheckColorType {
  GREEN = '',
  BLUE = 'BLUE'
}
