export interface VipIntroduceContentProps {
  isVip: boolean
  isTeamVip: boolean
  personVipBtnClick?: (isVip?: boolean) => void
  teamVipBtnClick?: (isTeamVip?: boolean) => void
  customBtnClick?: () => void
}

export interface IPower {
  title: string
  active: boolean
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
  unit: '' | '月' | '年'
  moneyText?: string
  powerList: IPower[]
  topText?: string
  oldPrice: string
}
