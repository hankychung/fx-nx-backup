import { IndustryMemberType } from '@flyele-nx/constant'

export interface IIndustryListParams {
  member_type: IndustryMemberType
}

export interface IIndustryList {
  industry_id: number
  industry_name: string
}

export type usageModeType = 'personal' | 'team' | ''
