import { useContactStore } from '../../store/useContactStore'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { ScheduleTaskConst, Taker } from '@flyele-nx/service'

/**
 author: william   email:362661044@qq.com
 create_at:2021/12/29 上午 11:23
 **/
type TakersRankReturnType = {
  takers: Taker[]
  distributeTaker?: Taker
  takeTotal: number
  finishTotal: number
  waitTotal: number
}

type MatterTakerStateText = {
  takers: Taker[]
  userId: string
  creatorId: string
  showVest?: boolean // 是否显示 事项
  showProcessing?: boolean // 是否显示 详情
  showWait?: boolean
}

export class TakersUtils {
  /**
   * 事项 状态逻辑处理
   * 参与人 只显示 待接受，已拒绝，已完成
   * 创建人 已完成 > 已取消 > (事项全部参与人的状态)
   * **/
  static MatterTakerStateText(props: MatterTakerStateText): string {
    const {
      // TODO: 威廉
      takers = [],
      userId,
      creatorId,
      showVest = false,
      showProcessing = false,
      showWait = false
    } = props

    const { takeTotal, finishTotal, waitTotal } = TakersUtils.TakersRank({
      takers,
      creatorId
    })

    try {
      const myTaker = takers.find((item) => {
        return item.taker_id === userId
      })

      const isCreator = userId === creatorId

      // 获取整个事项成员状态信息
      const specialText = () => {
        let text = ''

        const buildDouHao = () => {
          return text.length > 0 ? '，' : ''
        }

        // 接受人数
        if (takeTotal > 0) text = `${takeTotal}人已接受`

        // 完成人数
        if (finishTotal > 0) text += `${buildDouHao()}${finishTotal}人已完成`

        if ((showWait || isCreator) && waitTotal > 0) {
          text += `${buildDouHao()}${waitTotal}人未接受`
        }
        return text
      }

      // 创建人
      if (isCreator) return specialText()

      // 匹配不到时，应该这个事项是没有邀请自己, 并自己不是创建人
      if (!myTaker && !isCreator) return '无需处理'

      const _showVestText: string = showVest ? '事项' : ''

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { state, personal_state } = myTaker

      // 参与人状态优先
      if (personal_state) {
        // eslint-disable-next-line default-case
        switch (personal_state) {
          case ScheduleTaskConst.MATTER_PERSONAL_STATE.wait:
            return `${_showVestText}待接受`
          case ScheduleTaskConst.MATTER_PERSONAL_STATE.refused:
            return `${_showVestText}已拒绝`
        }
      }

      // 参与人
      switch (state) {
        case ScheduleTaskConst.MATTER_CREATOR_STATE.dispatched:
          if (showProcessing) {
            return specialText()
          }
          return `${_showVestText}已派发`
        case ScheduleTaskConst.MATTER_CREATOR_STATE.completed:
          return `${_showVestText}已完成`
        case ScheduleTaskConst.MATTER_CREATOR_STATE.canceled:
          return `${_showVestText}已取消`
        case ScheduleTaskConst.MATTER_TAKER_STATE.processing:
          // TODO 交互定义 改来改去 一句如：xxx一样 tm 又不一样 f
          if (!isCreator && !showProcessing) {
            return `${_showVestText}处理中`
          }
          return specialText()
        case ScheduleTaskConst.MATTER_TAKER_STATE.completed:
          return `${_showVestText}已完成`
        case ScheduleTaskConst.MATTER_TAKER_STATE.canceled:
          return `${_showVestText}已取消`
        case ScheduleTaskConst.MATTER_TAKER_STATE.withdrawn:
          return `${_showVestText}已撤回`
        default:
          return ''
      }
    } catch (e) {
      return ''
    }
  }

  /**
   * 这里忽略了 已派发
   * takers 排序 例子：项目创建的事项卡片 底部taker
   * order 创建人 > 参与接受 > 参与未接受
   * **/
  static TakersRank(props: {
    takers: Taker[]
    creatorId: string
  }): TakersRankReturnType {
    const { takers, creatorId } = props

    const json: Record<'take' | 'finish', number> = { take: 0, finish: 0 }

    let creatorItem: Taker | undefined

    let distributeTaker: Taker | undefined

    const takeArr: Taker[] = []

    const otherArr: Taker[] = []

    for (let i = 0; i < takers.length; i++) {
      const item: Taker = takers[i]

      // 有创建人就塞进去
      if (item.taker_id === creatorId) {
        // 有创建人并且参与的
        if (item.identity === ScheduleTaskConst.IDENTITY.matterCreator) {
          creatorItem = item
          json.take++
        }

        if (item.identity === ScheduleTaskConst.IDENTITY.matterDistribute) {
          distributeTaker = item
        }

        // 创建人完成了事项
        if (item.state === ScheduleTaskConst.MATTER_CREATOR_STATE.completed) {
          json.finish++
        }
        continue
      }

      // 判断 协助人接受状态
      if (
        item.personal_state === ScheduleTaskConst.MATTER_PERSONAL_STATE.accepted
      ) {
        takeArr.push(item)
        // 判断 协助人完成状态
        if (item.state === ScheduleTaskConst.MATTER_TAKER_STATE.completed) {
          json.finish++
        } else {
          json.take++
        }
      } else {
        // 其他状态
        otherArr.push(item)
      }
    }

    // 排序
    const newTakers: Taker[] = [...takeArr, ...otherArr]

    if (creatorItem) {
      newTakers.unshift(creatorItem)
    }

    return {
      takers: newTakers,
      takeTotal: json.take,
      finishTotal: json.finish,
      waitTotal: otherArr.length,
      distributeTaker
    }
  }

  /** 通过id伪造 Taker 数据  **/
  static generateTakerData(id: string): Taker {
    const allInteractDict = useContactStore.getState().contactDict
    const data = allInteractDict[id]

    return {
      taker_id: id,
      avatar: data?.avatar,
      create_at: 0,
      creator_id: '',
      dispatch_id: '',
      identity: ScheduleTaskConst.IDENTITY.matterTaker,
      invite_id: '',
      invite_name: '',
      invite_type: 'flyele',
      nick_name: data?.nick_name,
      operate_state: ScheduleTaskConst.MATTER_OPERATE_STATE.withdrawn,
      original_name: '',
      personal_state: ScheduleTaskConst.MATTER_PERSONAL_STATE.accepted,
      pinyin: data?.pinyin ?? '',
      species: 1,
      state: ScheduleTaskConst.MATTER_CREATOR_STATE.dispatched
    }
  }

  /** 通过ids伪造 Taker list 数据  **/
  static generateTakersData(ids: string[]): Taker[] {
    const allInteractDict = useContactStore.getState().contactDict

    return ids.map((id) => {
      const data = allInteractDict[id]
      const obj: Taker = {
        taker_id: id,
        avatar: data?.avatar,
        create_at: 0,
        creator_id: '',
        dispatch_id: '',
        identity: ScheduleTaskConst.IDENTITY.matterTaker,
        invite_id: '',
        invite_name: '',
        invite_type: 'flyele',
        nick_name: data?.nick_name,
        operate_state: ScheduleTaskConst.MATTER_OPERATE_STATE.withdrawn,
        original_name: '',
        personal_state: ScheduleTaskConst.MATTER_PERSONAL_STATE.accepted,
        pinyin: data?.pinyin ?? '',
        species: 1,
        state: ScheduleTaskConst.MATTER_CREATOR_STATE.dispatched
      }

      return obj
    })
  }

  /** 获取协作人加入的状态 **/
  static getTakerJoinState(item: {
    userId: string
    inviteId?: string
    isCreator?: boolean
    inviteNickName?: string
  }) {
    if (!item.inviteId) return ''

    const allInteractDict = useContactStore.getState().contactDict
    const userInfo = useUserInfoStore.getState().userInfo

    const data = allInteractDict[item.inviteId]

    if (item?.isCreator) {
      return '创建人'
    }

    // 当前的id 和 邀请人id 相等 自己邀请自己逻辑，目前是事项的认领加入
    if (item.inviteId === item.userId) {
      return '认领加入'
    }

    if (userInfo.user_id === item.inviteId) {
      return '我邀请加入'
    }
    return `${item.inviteNickName || data?.nick_name}邀请加入`
  }

  // 我在事项当前的状态
  static matterMyIsFinish(takers: Taker[]) {
    const userInfo = useUserInfoStore.getState().userInfo

    const my = takers.find((item) => {
      return item.taker_id === userInfo.user_id
    })

    if (my) {
      const finish = [
        ScheduleTaskConst.MATTER_TAKER_STATE.completed,
        ScheduleTaskConst.MATTER_CREATOR_STATE.completed
      ]

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return finish.includes(my.state)
    }

    return false
  }
}
