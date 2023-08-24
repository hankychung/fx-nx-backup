export enum LocationType {
  PERSONAL = 1, // 个人应用库
  SPACE, // 空间应用库
  PROJECT // 项目应用库
}

export enum ApplicationState {
  NORMAL = 1, // 正常
  CANCEL = 2 // 取消
}

export enum ApplicationType {
  NORMAL = 1, // 普通应用
  WORKFLOW = 2 // 工作流
}

export enum SortOperateType {
  DOWN = 'down',
  UP = 'up'
}

export enum ProjectJoin {
  JOIN = 1, // 查看自己加入的
  ALL // 全部项目
}
