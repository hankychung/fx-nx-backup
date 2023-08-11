export interface ISortableTab {
  id: string
  text: string
  count?: number
  total?: number // 用于抽屉内部做完成和未完成数量的计算
}

export interface SystemBoardCommonCtn {
  display: boolean
  getCounts: () => Promise<void>
  nowTab: ISortableTab
  queryType: number
}

export interface ISystemBoardNormalRef {
  reload: () => Promise<any>
  reloadTabs?: () => Promise<any> // 自定义看板专用
}
