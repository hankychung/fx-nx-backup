export interface VipIntroduceContentProps {
  isVip: boolean
  isTeamVip: boolean
  isForeverVip?: boolean //是否个人永久会员
  personVipBtnClick?: (item: IInfoType & { btnText: string }) => void
  teamVipBtnClick?: (item: IInfoType & { btnText: string }) => void
  customBtnClick?: () => void
  descBtnClick?: () => void
  equitySpaceClick?: () => void
}

export interface IPower {
  title: string
  active: boolean
  isSpace?: string
}

export interface IInfoType {
  key: string
  title: string
  desc: string
  bgColor: string
  borderColor: string
  btnText: string
  btnTextColor?: string
  btnBgColor?: string
  btnBorderColor?: string
  money: string
  unit: '' | '月' | '年' | '年/人' | 'yr'
  moneyText?: string
  powerList: IPower[]
  topText?: string
  oldPrice: string
}
