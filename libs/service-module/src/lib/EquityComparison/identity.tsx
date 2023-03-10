import React from 'react'
import { EqualComparison } from './components/EqualComparison'
import { identityEqualComparisonData } from '@flyele-nx/constant'

export const IdentityEqualComparison = () => {
  return (
    <EqualComparison
      title="身份权益对比"
      header={['版本', '免费', '个人会员', '团队会员']}
      listObj={identityEqualComparisonData}
    />
  )
}
