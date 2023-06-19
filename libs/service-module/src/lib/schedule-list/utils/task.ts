import { ScheduleTaskConst, Taker } from '@flyele-nx/service'

/** 事项标题 在提交接口之前 去除前后空格、去除换行、限制长度 */
export const trimTitle = (title: string) =>
  title
    .trim()
    .replace(/[\r\n]/g, '')
    .slice(0, ScheduleTaskConst.MAX_TITLE_LEN)

export const getAvatarsFromTakers = (
  takers: Array<Taker & { isTeamVip: boolean; isVip: boolean }>
) => {
  return takers.map((item) => {
    const { isTeamVip, isVip } = item

    return {
      userId: item.taker_id,
      src: item.avatar,
      is_view: item?.is_view,
      overlayClassName: '',
      isTeamVip,
      isVip
    }
  })
}
