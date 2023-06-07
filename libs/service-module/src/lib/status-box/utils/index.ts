// 把事项/待办的状态从已完成和未完成中，相互转换
export function changeCompleteState(state: number) {
  switch (state) {
    case 10301:
      return 10302
    case 10302:
      return 10301
    case 10402:
      return 10404
    case 10404:
      return 10402
    default:
      return 0
  }
}
