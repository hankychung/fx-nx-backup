import dayjs from 'dayjs'
import { IVip, SpaceType } from '@flyele-nx/service'
import duration from 'dayjs/plugin/duration'
import { VipTypeEnum } from '@flyele-nx/constant'
dayjs.extend(duration)

export class UserInfoUtils {
  // 是否包含任意一个未过期的 个人会员/团队会员
  static hasVipAndNoDead(vip: IVip): boolean {
    const maxTime = Math.max(vip.next_end_time || 0, vip.end_time || 0)

    return vip.level > 0 && maxTime > Math.floor(Date.now() / 1000)
  }

  // 检查是否会员
  static vipCheck(vip: IVip): boolean {
    // next_end_time有值时，是团队会员又是个人会员
    return (
      vip.level === VipTypeEnum.Person ||
      (!!vip.next_end_time && vip.next_end_time < Math.floor(Date.now() / 1000))
    )
  }

  // 检查是否团队会员
  static vipTeamCheck(vip: IVip): boolean {
    return vip.level === VipTypeEnum.Team
  }

  // 检查是永久会员
  static vipForeverCheck(vip: IVip): boolean {
    return (
      vip.level > 0 &&
      (vip.deadline === 9999999999 || vip.next_end_time === 9999999999)
    )
  }

  static checkPoor(vip: IVip): boolean {
    return vip.deadline === 0 && vip.level === 0
  }

  static checkExpiredVip(vip: IVip): boolean {
    return (
      // !vip.level &&
      !!vip.deadline && vip.deadline < Math.floor(Date.now() / 1000)
    )
  }

  static checkExpiredTeamVip(time: number): boolean {
    return !!time && time < Math.floor(Date.now() / 1000)
  }

  static checkVipType(vip_type?: VipTypeEnum, vip_next_expired_at?: number) {
    if (vip_next_expired_at) {
      return {
        isVip: true,
        isTeamVip: true
      }
    }

    const isVip = vip_type === VipTypeEnum.Person
    const isTeamVip = vip_type === VipTypeEnum.Team

    return {
      isVip,
      isTeamVip
    }
  }

  // 判断是否有会员 和 有一些专业版空间
  static getDiamond(
    vip: IVip,
    list: SpaceType.IBasicSpace[]
  ): { isVip: boolean; hasProSpace: boolean } {
    const _isVip = UserInfoUtils.vipCheck(vip)
    const _hasProSpace = list.some((item) => {
      return item.level === 2
    })

    return { isVip: _isVip, hasProSpace: _hasProSpace }
  }

  /**
   * 获取vip 卡片信息
   * isVip 是否vip 渲染不同的卡片样式
   * isWaring 是否显示 红色字体
   * text 根据计算出来的文案
   * within24 是否24小时内
   * **/
  static getVipCardInfo(vip: IVip): {
    isVip: boolean
    isWaring: boolean
    text: string
    within24: boolean
  } {
    const _isVip = UserInfoUtils.vipCheck(vip)
    let text = ''
    let waring = false
    let within24 = false
    const vipDate = dayjs.unix(vip.deadline)

    if (_isVip) {
      const hourDiff = vipDate.diff(dayjs(), 'hours')

      if (hourDiff > 72) {
        text = `${vipDate.format('YYYY年MM月DD日')}到期`
      }

      if (hourDiff > 24 && hourDiff <= 72) {
        const day = Math.abs(Math.ceil(hourDiff / 24))

        text = `会员还有${day}天到期，快去延期吧！`
      }

      if (hourDiff < 24) {
        const duration = dayjs.duration(vipDate.diff(dayjs()))
        const hours = duration.get('hours').toString().padStart(2, '0')
        const minutes = duration.get('minutes').toString().padStart(2, '0')
        const seconds = duration.get('seconds').toString().padStart(2, '0')

        text = `${hours}:${minutes}:${seconds}后到期，快去延期吧!`
        waring = true
        within24 = true
      }
    } else {
      const daysDiff = Math.abs(vipDate.diff(dayjs(), 'days'))

      if (daysDiff > 180) {
        // text = '邀请好友，免费得会员'
        text = '会员到期后不会自动续费'
      }

      if (daysDiff <= 180) {
        text = `会员已到期${daysDiff}天`
        waring = true
      }
    }

    return { isVip: _isVip, isWaring: waring, text, within24 }
  }

  /**
   * 判断 有多少条基础版 、专业版
   * **/
  static getSpaceCardInfo(list: SpaceType.IBasicSpace[]): {
    pro: number
    base: number
  } {
    let proNum = 0
    let baseNum = 0

    if (list.length > 0) {
      const proList = list.filter((item) => item.level === 2)

      proNum = proList.length
      baseNum = list.length - proNum
    }

    return { pro: proNum, base: baseNum }
  }
}
