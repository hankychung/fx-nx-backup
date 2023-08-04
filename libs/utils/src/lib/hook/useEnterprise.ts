import { IFlyAvatarItemState } from '@flyele/flyele-components/dist/components/Avatar/FlyAvatarItem/type'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { CorpVersion, CorpCuStatus } from '@flyele-nx/constant'
import { IUserEnterpriseTakers } from '@flyele-nx/types'

export const enterpriseState = (
  interacts: IFlyAvatarItemState[],
  enterprise: IUserEnterpriseTakers[]
) => {
  if (!interacts) return []
  return enterprise
    .filter((e) => interacts.some((v) => e.user_id === v.userId))
    .map((k) => {
      return {
        ...k,
        stateTxt: CorpCuStatus[k.cu_status || 1].status
      }
    })
}

/**
 * interacts 可选参数 返回带cu_status状态协作人
 * 是否企业版用户 */
export const useEnterprise = (interacts?: IFlyAvatarItemState[]) => {
  const { enterprise, userInfo, enterpriseTakers } = useUserInfoStore(
    (state) => state
  )

  /** 是否企业版用户 */
  const isEnterprise = !!userInfo.corpid
  /** 是否体验版 */
  const isEnterpriseTrial = enterprise.version === CorpVersion.trial
  /** 是否专业版 */
  const isEnterprisePaid = enterprise.version === CorpVersion.paid

  const enterpriseStateArr = interacts
    ? enterpriseState(interacts, enterpriseTakers)
    : []

  return {
    /** 是否企业版用户 */
    isEnterprise,
    /** 是否体验版 */
    isEnterpriseTrial,
    /** 是否专业版 */
    isEnterprisePaid,
    enterprise,
    enterpriseTakers,
    ...userInfo,

    /** 协作人增加cu_status */
    enterpriseStateArr,
    userInfo
  }
}
