import React from 'react'
import { SpaceComparison } from './components/equal-comparison'
import { spaceEqualComparisonData } from '@flyele-nx/constant'

export const SpaceEqualComparison = () => {
  return (
    <SpaceComparison
      // title="空间权益对比"
      header={['空间版本', '免费空间', '专业空间']}
      desc={[
        ' ',
        '支持20人内的团队简单使用~',
        '无限人数，更专业更全面的团队权益'
      ]}
      isSpace={true}
      listObj={spaceEqualComparisonData}
    />
  )
}
