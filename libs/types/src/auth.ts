/**
 * 此文件用于威廉之前的写的前端字段与后端字段不是很一致的转换类型文件
 */
// 基础权限
export interface IAuthBase {
  /**  自定义视图 */
  maxCustomView: number
  /**  上传文件大小 最大值 */
  maxUploadFileSize: number
  /**  是否能使用月视图 */
  calendar: boolean
  /**  是否全量导出 */
  fillBatchExport: boolean
  /**  资源库 文件最大容量 */
  maxFileSize: number
  /**  自定义时间提醒最大值 */
  maxCustomTimeRemind: number
  /**  创建空间最大值 */
  maxCreateSpace: number
  /**  是否能创建脉络图 */
  createVenation: boolean
  /**  个人空间 项目最大值 */
  maxPrivateProject: number
  /**  pc 小组件 */
  pcWidget: boolean
  /**  同步日历 */
  asyncCalendar: boolean
  /**  创建事项协助人 */
  myTaskInteractNum: number
  /**  创建子事项 */
  myChildTasksNum: number
  /**  创建子事项的嵌套层级 */
  myChildTasksLevel: number
  /**  创建事项标签 */
  myTagTasksNum: number
  /**  全量表头最大值 */
  maxFullDoseHeader?: number
}
