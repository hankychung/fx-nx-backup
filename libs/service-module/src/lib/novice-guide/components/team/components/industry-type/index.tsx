import { I18N, isCN } from '@flyele-nx/i18n'
import React, { useMemo, useState, useContext } from 'react'
import { CommonPage } from '../../../common/page'
import styles from './index.module.scss'
import { useMemoizedFn, useMount } from 'ahooks'
import { CommonTagList, ITagsList } from '../../../common/tag-list'
import { UsercApi } from '@flyele-nx/service'
import {
  IndustryMemberType,
  diyIndustryId,
  TeamSize
} from '@flyele-nx/constant'
import { IIndustryList } from '@flyele-nx/types'
import { TeamContext } from '../../../../context/team'

const _IndustryType = ({
  visible,
  goBack,
  goNext
}: {
  visible: boolean
  goBack: () => void
  goNext: () => void
}) => {
  const {
    activeIndustryTag,
    activeTeamSize,
    setActiveIndustryTag,
    setActiveTeamSize,
    setActiveIndustryTagTitle
  } = useContext(TeamContext)

  // 行业类型
  const [inactiveTags, setInactiveTags] = useState<IIndustryList[]>([])

  const onClickInactiveTags = useMemoizedFn((item: ITagsList) => {
    const { id, title } = item
    setActiveIndustryTagTitle && setActiveIndustryTagTitle(title)
    setActiveIndustryTag && setActiveIndustryTag(id as number)
  })

  const onClickTeamSize = useMemoizedFn((item: ITagsList) => {
    const { id } = item
    setActiveTeamSize && setActiveTeamSize(id as string)
  })

  const onGoBack = useMemoizedFn(() => {
    goBack()
  })

  const onGoNext = useMemoizedFn(() => {
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
    return isCN
      ? activeIndustryTag === 0 || activeTeamSize === ''
      : activeTeamSize === ''
  }, [activeIndustryTag, activeTeamSize])

  useMount(async () => {
    await fetchIndustryList()
  })

  return (
    <CommonPage
      visible={visible}
      title={isCN ? '你的行业类型是？' : ''}
      desc=""
      disableNext={disableNext}
      goBack={onGoBack}
      goNext={onGoNext}
    >
      <div className={styles.industryTypeRoot}>
        {isCN && (
          <CommonTagList
            tags={tagsList}
            activeTag={activeIndustryTag}
            onClick={onClickInactiveTags}
            placeholder={I18N.common.writeYourWorkType}
          />
        )}
        <div className={styles.title}>
          {I18N.common.theNumberOfTeamMembersIs}
        </div>
        <CommonTagList
          tags={TeamSize}
          activeTag={activeTeamSize}
          onClick={onClickTeamSize}
          needAdd={false}
        />
      </div>
    </CommonPage>
  )
}

export const IndustryType = React.memo(_IndustryType)
