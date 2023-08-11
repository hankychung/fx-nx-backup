import React, { useContext, useMemo, useState } from 'react'
import { CommonPage } from '../../../common/page'
import { useMemoizedFn, useMount } from 'ahooks'
import { CommonTagList, ITagsList } from '../../../common/tag-list'
import styles from './index.module.scss'
import { UsercApi } from '@flyele-nx/service'
import { IndustryMemberType, diyIndustryId } from '@flyele-nx/constant'
import { IIndustryList } from '@flyele-nx/types'
import { PersonalContext } from '../../../../context/personal'

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
    await fetchIndustryList()
  })

  return (
    <CommonPage
      visible={visible}
      title="你的职业是？"
      desc="为你推荐最合适的工作流程"
      disableNext={disableNext}
      goBack={onGoBack}
      goNext={onGoNext}
    >
      <div className={styles.careerChoiceRoot}>
        <CommonTagList
          tags={tagsList}
          activeTag={activeTag}
          onClick={onClickTags}
          placeholder="都没有？点此输入你的职业……"
        />
      </div>
    </CommonPage>
  )
}
