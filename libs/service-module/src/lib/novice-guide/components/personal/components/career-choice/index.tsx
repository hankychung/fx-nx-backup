import { I18N, isCN } from '@flyele-nx/i18n'
import React, { useContext, useMemo, useState } from 'react'
import { CommonPage } from '../../../common/page'
import { useMemoizedFn, useMount } from 'ahooks'
import { CommonTagList, ITagsList } from '../../../common/tag-list'
import styles from './index.module.scss'
import { UsercApi } from '@flyele-nx/service'
import { IndustryMemberType, diyIndustryId } from '@flyele-nx/constant'
import { IIndustryList } from '@flyele-nx/types'
import { PersonalContext } from '../../../../context/personal'

const careerDataEN: IIndustryList[] = [
  { industry_id: 1, industry_name: 'IIndustryList' },
  { industry_id: 2, industry_name: 'Sales' },
  { industry_id: 3, industry_name: 'Developer' },
  { industry_id: 4, industry_name: 'Designer' },
  { industry_id: 5, industry_name: 'Operator' },
  { industry_id: 6, industry_name: 'Lawyer' },
  { industry_id: 7, industry_name: 'Customer manager' },
  { industry_id: 8, industry_name: 'Student' }
]

export const CareerChoice = ({
  visible,
  goBack,
  goNext
}: {
  visible: boolean
  goBack: () => void
  goNext: () => void
}) => {
  const { activeTag, setActiveTag, setActiveTagName } =
    useContext(PersonalContext)
  // 职业类型
  const [tags, setTags] = useState<IIndustryList[]>([])
  const [loading, setLoading] = useState(false)

  const onClickTags = useMemoizedFn((item: ITagsList) => {
    const { id, title } = item
    setActiveTag(id as number)
    setActiveTagName(title)
  })

  const onGoBack = useMemoizedFn(() => {
    goBack()
  })

  const onGoNext = useMemoizedFn(() => {
    goNext()
  })

  const fetchIndustryList = useMemoizedFn(async () => {
    if (loading) return

    setLoading(true)
    try {
      const { data } = await UsercApi.getIndustryList({
        member_type: IndustryMemberType.PERSONAL
      })
      if (data) {
        setTags(data)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  })

  const tagsList = useMemo(() => {
    if (tags.length) {
      return tags
        .filter((item) => item.industry_id !== diyIndustryId)
        .map((item) => {
          return {
            id: item.industry_id,
            title: item.industry_name
          }
        })
    }
    return []
  }, [tags])

  const disableNext = useMemo(() => {
    return activeTag === 0
  }, [activeTag])

  useMount(async () => {
    if (isCN) {
      await fetchIndustryList()
    } else {
      setTags(careerDataEN)
    }
  })

  return (
    <CommonPage
      visible={visible}
      title={I18N.common.whatIsYourProfession}
      desc={I18N.common.recommendTheMost}
      disableNext={disableNext}
      goBack={onGoBack}
      goNext={onGoNext}
    >
      <div className={styles.careerChoiceRoot}>
        <CommonTagList
          tags={tagsList}
          activeTag={activeTag}
          onClick={onClickTags}
          placeholder={I18N.common.iDidntEvenOrderThis}
        />
      </div>
    </CommonPage>
  )
}
