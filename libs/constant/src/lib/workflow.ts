export enum FlowOperateType {
  OR = 1, // 或
  AND // 且
}

export enum FlowRangeType {
  IMMUTABLE = 1, // 不可自选
  RANGE = 2, // 指定范围
  NOT_RANGE = 3 // 不指定范围
}

// 0.未开始 ；1. 进行中；2.已完成；3.等待再次梳理 ；4.已退回
export enum FlowState {
  PENDING = 0,
  PROCESS,
  COMPLETE,
  WAITING,
  ROLLBACK
}

export const FlowStateLabel = {
  [FlowState.PENDING]: '未开始',
  [FlowState.PROCESS]: '待处理', // 进行中
  [FlowState.COMPLETE]: '已完成',
  [FlowState.WAITING]: '等待再次处理',
  [FlowState.ROLLBACK]: '已退回'
}
