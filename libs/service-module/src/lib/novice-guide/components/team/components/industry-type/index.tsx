import React, { useMemo, useState } from 'react'
import { CommonPage } from '../../../common/page'
import styles from './index.module.scss'
import { useMemoizedFn, useMount } from 'ahooks'
import { CommonTagList, ITagsList } from '../../../common/tag-list'
import { UsercApi } from '@flyele-nx/service'
import { IndustryMemberType, diyIndustryId } from '@flyele-nx/constant'
import { IIndustryList } from '@flyele-nx/types'

const _IndustryType = ({
  visible,
  goBack,
  goNext
}: {
  visible: boolean
  goBack: () => void
  goNext: () => void
}) => {
  // 行业类型
  const [inactiveTags, setInactiveTags] = useState<IIndustryList[]>([])
  const [activeIndustryTag, setActiveIndustryTag] = useState<number>(0)
  // 团队人数
  const teamSize = [
    {
      id: '1',
      title: '1-10'
    },
    {
      id: '2',
      title: '11-20'
    },
    {
      id: '3',
      title: '20-50'
    },
    {
      id: '4',
      title: '50以上'
    }
  ]
  const [activeTeamSize, setActiveTeamSize] = useState('')

  const onClickInactiveTags = useMemoizedFn((item: ITagsList) => {
    const { id, title } = item
    setActiveIndustryTag(id as number)
  })

  const onClickTeamSize = useMemoizedFn((item: ITagsList) => {
    const { id, title } = item
    setActiveTeamSize(id as string)
  })

  const onGoBack = useMemoizedFn(() => {
    goBack()
  })

  const onGoNext = useMemoizedFn(() => {
    console.log('@@@ data', activeIndustryTag, activeTeamSize)
    goNext()
  })

  const fetchIndustryList = useMemoizedFn(async () => {
    try {
      const { data } = await UsercApi.getIndustryList({
        member_type: IndustryMemberType.TEAM
      })
      if (data) {
        setInactiveTags(data)
      }
    } catch (e) {
      console.log(e)
    }
  })

  const tagsList = useMemo(() => {
    if (inactiveTags.length) {
      return inactiveTags
        .filter((item) => item.industry_id !== diyIndustryId)
        .map((item) => {
          return {
            id: item.industry_id,
            title: item.industry_name
          }
        })
    }
    return []
  }, [inactiveTags])

  const disableNext = useMemo(() => {
    return activeIndustryTag === 0 || activeTeamSize === ''
  }, [activeIndustryTag, activeTeamSize])

  useMount(async () => {
    await fetchIndustryList()
  })

  return (
    <CommonPage
      visible={visible}
      title="你的行业类型是？"
      desc=""
      disableNext={disableNext}
      goBack={onGoBack}
      goNext={onGoNext}
    >
      <div className={styles.industryTypeRoot}>
        <CommonTagList
          tags={tagsList}
          activeTag={activeIndustryTag}
          onClick={onClickInactiveTags}
          placeholder="都没有？点此输入你的行业类型……"
        />
        <div className={styles.title}>团队人数是？</div>
        <CommonTagList
          tags={teamSize}
          activeTag={activeTeamSize}
          onClick={onClickTeamSize}
          needAdd={false}
        />
      </div>
    </CommonPage>
  )
}

export const IndustryType = React.memo(_IndustryType)
