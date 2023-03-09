import React from 'react'
import { EqualComparison } from './components/EqualComparison'
import { spaceEqualComparisonData } from '@flyele-nx/consts'

export const SpaceEqualComparison = () => {
  return (
    <EqualComparison
      title="空间权益对比"
      header={['空间版本', '免费空间', '免费空间', '专业空间']}
      listObj={spaceEqualComparisonData}
    />
  )
}
