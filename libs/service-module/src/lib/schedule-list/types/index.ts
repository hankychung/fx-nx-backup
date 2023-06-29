export interface ScheduleListProps {
  date: string
  isFinished?: boolean
  getFinishListTotal?: (total: number) => void
  isBoard?: boolean
  isVipWin?: boolean // 是否小挂件窗体
  overlayClassName?: string
  isDarkMode?: boolean
}

export interface IScheduleListRef {
  reload: () => Promise<void>
}
