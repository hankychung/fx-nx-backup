import { useInfiniteScroll } from 'ahooks'
import Item from '../list-item'
import { BizApi } from '@flyele-nx/service'
import { ICustomDashboardItem } from '@flyele-nx/types'
import { useMemo, useRef } from 'react'
import style from './index.module.scss'

interface IProps {
  tabId: string
}

export const List = (props: IProps) => {
  const { tabId } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const { data, reloadAsync: reload } = useInfiniteScroll<{
    list: ICustomDashboardItem[]
    hasNextPage: boolean
    page: number
  }>(
    async (d) => {
      const page = d ? d.page + 1 : 1
      const res = await BizApi.getCustomDashboardData({
        filterId: tabId,
        pageNumber: page
      })

      console.log('res', res.data.custom_dashboard)

      const hasNextPage = !!(
        res.data.custom_dashboard && res.data.custom_dashboard.length
      )
      return {
        list: res.data.custom_dashboard ?? [],
        hasNextPage,
        page: page
      }
    },
    {
      target: containerRef,
      isNoMore: (d) => {
        return !d?.hasNextPage
      }
    }
  )
  const list = useMemo(() => {
    return data?.list ?? []
  }, [data])
  return (
    <div ref={containerRef} className={style.list}>
      {list.map((item) => {
        return (
          <Item
            item={item}
            key={item.task_id}
            complete={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
        )
      })}
    </div>
  )
}
