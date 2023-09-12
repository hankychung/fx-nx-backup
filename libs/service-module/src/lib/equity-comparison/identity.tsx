import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import { EqualComparison } from './components/equal-comparison'
import { identityEqualComparisonData } from '@flyele-nx/constant'

export const IdentityEqualComparison = () => {
  return (
    <EqualComparison
      // title="身份权益对比"
      header={[
        I18N.officialWebsite.features,
        I18N.officialWebsite.free,
        I18N.common.premium,
        I18N.common.business
      ]}
      listObj={identityEqualComparisonData}
    />
  )
}
