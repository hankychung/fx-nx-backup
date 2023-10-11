import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import { SpaceComparison } from './components/equal-comparison'
import { spaceEqualComparisonData } from '@flyele-nx/constant'

export const SpaceEqualComparison = () => {
  return (
    <SpaceComparison
      header={[
        I18N.officialWebsite.spaceVersion,
        I18N.common.free_teamspace,
        I18N.common.pro_teamspace
      ]}
      desc={[
        ' ',
        I18N.common.withinTheSupportGroup,
        I18N.common.unlimitedNumberOfPeople
      ]}
      isSpace={true}
      listObj={spaceEqualComparisonData}
    />
  )
}
