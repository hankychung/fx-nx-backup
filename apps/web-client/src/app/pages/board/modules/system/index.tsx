import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
  useRef
} from 'react'
import { SortableTab } from '@flyele-nx/ui'
// import { SystemUtils } from './utils'
import Template from './components/template'

import style from './index.module.scss'
import { ISortableTab, ISystemBoardNormalRef } from '@flyele-nx/types'
import { useUpdateBoard } from '../../hooks/useUpdateBoard'
import { TaskApi, UsercApi } from '@flyele-nx/service'
import { useUserInfoStore } from '@flyele-nx/zustand-store'

function getTxt(count?: number) {
  return `·${count}`
}

enum TabIds {
  FOLLOW = '1',
  DISPATCH = '2',
  JOIN = '3',
  PERSONAL = '4',
  ARRANGED = '5'
}

type IRefDict = Record<TabIds, { ref: React.RefObject<ISystemBoardNormalRef> }>

const initTabs: ISortableTab[] = [
  {
    id: TabIds.FOLLOW,
    text: '关注',
    count: 0,
    total: 0
  },
  {
    id: TabIds.DISPATCH,
    text: '派发',
    count: 0,
    total: 0
  },
  {
    id: TabIds.JOIN,
    text: '接受',
    count: 0,
    total: 0
  },
  {
    id: TabIds.PERSONAL,
    text: '个人',
    count: 0,
    total: 0
  },
  {
    id: TabIds.ARRANGED,
    text: '待安排',
    count: 0,
    total: 0
  }
]

const System: ForwardRefRenderFunction<ISystemBoardNormalRef> = (_, ref) => {
  const sortedTab = useUserInfoStore.getState().setting.view_sort
  const userId = useUserInfoStore.getState().userInfo.user_id

  const [activeId, setActiveId] = useState<TabIds>(TabIds.FOLLOW)

  const [tabs, setTabs] = useState<ISortableTab[]>(initTabs)

  const likeRef = useRef<ISystemBoardNormalRef>(null)
  const dispatchRef = useRef<ISystemBoardNormalRef>(null)
  const acceptRef = useRef<ISystemBoardNormalRef>(null)
  const personalRef = useRef<ISystemBoardNormalRef>(null)
  const arrangedRef = useRef<ISystemBoardNormalRef>(null)

  useEffect(() => {
    setTabs(() => {
      const list = sortedTab.split(',').map((i) => parseInt(i, 10) - 1)

      return [
        initTabs[list[0]],
        initTabs[list[1]],
        initTabs[list[2]],
        initTabs[list[3]]
      ]
    })
  }, [sortedTab])

  const cmps = useMemo(
    () => [
      { id: TabIds.ARRANGED },
      { id: TabIds.FOLLOW },
      { id: TabIds.DISPATCH },
      { id: TabIds.JOIN }
    ],
    []
  )

  const getCounts = useCallback(async () => {
    const {
      data: {
        // dispatch_finish_total = 0,
        // join_finish_total = 0,
        follow_finish_total = 0
      }
      // self_finish_total = 0,
    } = await TaskApi.getDashboradCountFinish()

    const {
      data: { dispatch_total = 0, join_total = 0, follow_total = 0 }
    } = await TaskApi.getDashboradCountNotFinish()

    // 待安排总数
    const getToBeArrangedTol = await TaskApi.getToBeArranged({})

    // const dict = {
    //   [`${[TabIds.FOLLOW]}`]: follow_finish_total,
    //   [`${TabIds.DISPATCH}`]: dispatch_finish_total,
    //   [`${TabIds.JOIN}`]: join_finish_total,
    //   [`${TabIds.ARRANGED}`]: getToBeArrangedTol.total ?? 0
    // }

    const boardCount: Record<string, number> = {
      [TabIds.DISPATCH]: dispatch_total,
      [TabIds.FOLLOW]: follow_total + follow_finish_total,
      [TabIds.JOIN]: join_total,
      [TabIds.ARRANGED]: getToBeArrangedTol.total ?? 0
    }

    setTabs((tabs) =>
      tabs.map((item) => {
        const { id } = item

        const count = boardCount[id]

        item.text = item.text.split('·').shift() + getTxt(count)

        item.count = count

        // 用于抽屉内部做完成和未完成数量的计算
        // item.total = dict[id]
        return item
      })
    )
  }, [])

  const refDict = useMemo<IRefDict>(
    () => ({
      [TabIds.ARRANGED]: {
        ref: arrangedRef
      },
      [TabIds.FOLLOW]: {
        ref: likeRef
      },
      [TabIds.DISPATCH]: {
        ref: dispatchRef
      },
      [TabIds.PERSONAL]: {
        ref: personalRef
      },
      [TabIds.JOIN]: {
        ref: acceptRef
      }
    }),
    []
  )

  const reload = useCallback(async () => {
    await refDict[activeId].ref.current?.reload()
  }, [activeId, refDict])

  useEffect(() => {
    const timer = setInterval(reload, 1000 * 60 * 5)

    return () => {
      clearInterval(timer)
    }
  }, [reload])

  useImperativeHandle(ref, () => ({
    reload
  }))

  useEffect(() => {
    getCounts()
  }, [getCounts])

  useUpdateBoard({
    handler: getCounts
  })

  // TODO: 订阅
  // useSubscribe(
  //   {
  //     type: Pub.CREATE_SUCCESS,
  //     handler: getCounts
  //   },
  //   [getCounts]
  // )

  // useSubscribe(
  //   {
  //     type: Pub.RELOAD_PAGE,
  //     handler: getCounts
  //   },
  //   []
  // )

  // useSubscribe(
  //   {
  //     type: Pub.DELETE_MATTER_ITEM,
  //     handler: getCounts
  //   },
  //   []
  // )

  // useMount(() => {
  //   emitter.on()
  // })

  const handleDragEnd = (sortedItems: ISortableTab[]) => {
    UsercApi.updateSetting({
      view_sort: sortedItems.map((item) => item.id).join(',')
    })
    const newSortedTab = sortedItems.map((item) => item.id).join(',')

    // 本端记录排序
    localStorage.setItem(`sortedTab${userId}`, newSortedTab)

    setTabs(sortedItems)
  }

  return (
    <div className={style['system-container']}>
      {/* TODO: 这个拖动不知道怎么用不了 */}
      <SortableTab
        tabs={tabs}
        handleDragEnd={(sortedItems) => handleDragEnd(sortedItems)}
        handleClickTab={(id) => {
          setActiveId(id as TabIds)
          // SystemUtils.setStoreTabId(id as TabIds)
        }}
        defaultActiveId={TabIds.FOLLOW}
        itemClass={style['system-tab']}
      />
      {cmps.map(({ id }) => (
        <Template
          ref={refDict[id].ref}
          queryType={parseInt(id, 10)}
          key={id}
          display={activeId === id}
          nowTab={
            (tabs.find((t) => t.id === activeId) || tabs[0]) as ISortableTab
          }
          getCounts={getCounts}
        />
      ))}
      <div id="more-float" className={style['more-float']} />
      {/* 暂时不做侧拉窗 */}
      {/* <div id="drawer" /> */}
    </div>
  )
}

export default React.memo(forwardRef(System))
