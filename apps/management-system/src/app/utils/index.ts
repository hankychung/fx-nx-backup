/**
 * 分 转换成 元
 * 后端给的金钱的单位 是 分，显示转换成元
 */
export const pennyToYuan = (penny: number) => {
  return (penny / 100).toFixed(2)
}
