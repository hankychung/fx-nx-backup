import React, {
  useState,
  // useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  ForwardRefRenderFunction,
  useMemo
} from 'react'
import { Empty } from '../empty'
// import useSubscribe from 'hooks/useSubscribe'
import { useUpdateBoard } from '../../hooks/useUpdateBoard'
import { Item as LikeItem } from '../tab-like'
import { Item as DispatchItem } from '../tab-dispatch'
import { Item as AcceptItem } from '../tab-accept'
import { ToBeArrangedItem } from '../tab-tobe-arranged'

import { cloneDeep } from 'lodash'
import { SortableContent } from '@flyele-nx/ui'
import { useInfiniteScroll, useMemoizedFn } from 'ahooks'
import style from './index.module.scss'
// import More from '../More'
// import NewItemDom from '../NewItemDom'
import {
  CommonResponse,
  IDashboard,
  IDashboardItem,
  ISystemBoardNormalRef,
  SystemBoardCommonCtn
} from '@flyele-nx/types'
import { TaskApi } from '@flyele-nx/service'
import classNames from 'classnames'
import { MoreIcon } from '@flyele-nx/icon'

const initPage = {
  finished: { page: 1, done: false },
  unFinished: { page: 1, done: false }
}

const PAGE_RECORD = 20

const uselessChange = (show: boolean, dom: HTMLDivElement) => {
  return (
    (show && dom.style.display === 'flex') ||
    (!show && dom.style.display === 'none')
  )
}

// let timer: NodeJS.Timeout | null = null

const TabPersonal: ForwardRefRenderFunction<
  ISystemBoardNormalRef,
  SystemBoardCommonCtn
> = (props, ref) => {
  const { display, nowTab, queryType } = props

  // const [list, setList] = useState<IDashboard>(null)
  // const [unfinishedList, setUnfinishedList] = useState<IDashboard>(null)
  // const [finishedList, setFinishedList] = useState<IDashboard>(null)
  // const [isFinishTagMode, set_isFinishTagMode] = useState<boolean>(false)
  // const pageNumber = useRef(cloneDeep(initPage))
  // const [showMore, setShowMore] = useState(false)
  // const [login, setLogin] = useState<boolean>(false) //数据login

  // const [newTask, setNewTask] = useState<string[]>([]) //待安排新增数据

  const showMoreBtn = useMemo(
    () => (nowTab && nowTab.count && nowTab.count > 20) || !!nowTab.total,
    [nowTab]
  )

  /**
   * 取消事项后更新 newTask
   */
  // const updateNewTaskAfterCancel = useMemoizedFn((ids: string[]) => {
  //   if (newTask.length) {
  //     const curNewTask = newTask.filter((item) => !ids.includes(item))

  //     setNewTask(curNewTask)
  //   }
  // })

  // useEffect(() => {
  //   const dom = document.querySelector('#more-float') as HTMLDivElement

  //   if (dom) {
  //     if (uselessChange(showMore, dom)) return

  //     dom.style.display = showMore && showMoreBtn ? 'flex' : 'none'
  //   }
  // }, [showMore, showMoreBtn])

  const getList = useMemoizedFn(
    async ({
      state,
      pageNumber,
      doNotMerge
    }: {
      state: 0 | 1 | 2
      pageNumber: number
      doNotMerge?: boolean
    }) => {
      // setLogin(true)
      return queryType === 5
        ? ((await TaskApi.getToBeArranged({
            pageNumber
          })) as unknown as CommonResponse<IDashboard>)
        : await TaskApi.getDashboard({
            queryType,
            state,
            pageNumber,
            pageRecord: PAGE_RECORD,
            doNotMerge
          })
    }
  )

  const containerRef = useRef<HTMLDivElement>(null)

  const { data, reloadAsync: reload } = useInfiniteScroll<{
    list: IDashboardItem[]
    hasNextPage: boolean
    page: number
  }>(
    async (d) => {
      const page = d ? d.page + 1 : 1
      const res = await getList({
        state: queryType === 1 ? 0 : 1,
        pageNumber: page
      })

      const hasNextPage = !!(res.data && res.data.length)
      return {
        list: (res.data ?? []) as IDashboardItem[],
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
  }, [data?.list])

  const initRef = useRef(false)

  useImperativeHandle(ref, () => ({ reload }))

  // const resetFinishedList = useMemoizedFn(async () => {
  //   pageNumber.current = cloneDeep(initPage)

  //   if (!isFinishTagMode) {
  //     const { data } = await getList({
  //       state: 1,
  //       pageNumber: pageNumber.current.unFinished.page++,
  //       doNotMerge: true
  //     })

  //     if (!data || data.length < PAGE_RECORD) {
  //       pageNumber.current.unFinished.done = true
  //     }

  //     setUnfinishedList(data)
  //     setLogin(false)

  //     return
  //   }

  //   const { data } = await getList({
  //     state: 2,
  //     pageNumber: pageNumber.current.finished.page++
  //   })

  //   if (!data || data.length < PAGE_RECORD) {
  //     pageNumber.current.finished.done = true
  //   }

  //   setFinishedList(data)
  //   setLogin(false)
  // })

  // useEffect(() => {
  //   resetFinishedList()
  // }, [resetFinishedList, isFinishTagMode, showMore])

  // const init = useMemoizedFn(async () => {
  //   pageNumber.current = cloneDeep(initPage)

  //   const { data } = await getList({
  //     // 我关注的 需要获取所有的（未完成、已完成）的数据
  //     state: queryType === 1 ? 0 : 1,
  //     pageNumber: pageNumber.current.unFinished.page++
  //   })

  //   if (!data || data.length < PAGE_RECORD) {
  //     pageNumber.current.unFinished.done = true
  //   }

  //   setList(data)
  //   // setLogin(false)
  // })

  useEffect(() => {
    if (!display && initRef.current) return
    initRef.current = true
    reload()
  }, [reload, display])

  // useUpdateBoard({
  //   handler: () => {
  //     if (!display) return
  //     reload()
  //     setTimeout(() => {
  //       // resetFinishedList()
  //     }, 500)
  //   }
  // })
  // TODO:订阅
  // 新增事项存值
  // useSubscribe(
  //   {
  //     type: Pub.UPDATE_NEW_CREATE,
  //     handler: (list) => {
  //       if (!display) return
  //       const { task_id, ref_task_id, end_time, start_time, flow_step_id } =
  //         list[0]

  //       if (list.length && !end_time && !start_time && !flow_step_id) {
  //         setNewTask([...newTask, task_id || ref_task_id])
  //       }
  //       init()
  //       resetFinishedList()
  //     }
  //   },
  //   [display, init]
  // )

  // useSubscribe(
  //   {
  //     type: Pub.DELETE_MATTER_ITEM,
  //     handler: (list) => {
  //       if (!display) return
  //       updateNewTaskAfterCancel(list)
  //     }
  //   },
  //   [display, updateNewTaskAfterCancel]
  // )
  // useSubscribe(
  //   {
  //     type: Pub.EMPTY_NEWTASK,
  //     // type: Pub.RELOAD_PAGE,
  //     handler: () => {
  //       setNewTask([])
  //     }
  //   },
  //   []
  // )

  // const loadMore = useCallback(async () => {
  //   console.log('loadMore')
  //   // if (
  //   //   (isFinishTagMode && pageNumber.current.finished.done) ||
  //   //   (!isFinishTagMode && pageNumber.current.unFinished.done)
  //   // ) {
  //   //   return
  //   // }

  //   // const { data } = await getList({
  //   //   state: isFinishTagMode ? 2 : 1,
  //   //   pageNumber: isFinishTagMode
  //   //     ? pageNumber.current.finished.page++
  //   //     : pageNumber.current.unFinished.page++,
  //   //   doNotMerge: true
  //   // })

  //   // setLogin(false)
  //   // const isDone = !data || data.length < PAGE_RECORD

  //   // if (isFinishTagMode) {
  //   //   setFinishedList((l) => [...(l || []), ...(data || [])])
  //   //   pageNumber.current.finished.done = isDone
  //   // } else {
  //   //   setUnfinishedList((l) => [...(l || []), ...(data || [])])
  //   //   pageNumber.current.unFinished.done = isDone
  //   // }
  // }, [])

  // const renderList = useMemo(() => {
  //   return (isFinishTagMode ? finishedList : unfinishedList) || []
  // }, [finishedList, isFinishTagMode, unfinishedList])

  return display ? (
    <div
      className={classNames(style.container, style.hideXScrollbar)}
      ref={containerRef}
    >
      {nowTab.total === 0 && nowTab.count === 0 && (!list || !list.length) ? (
        <Empty />
      ) : (
        (list || []).map((item, index: number) => {
          const props = {
            key: `${item?.task_id}-${item?.repeat_id}`,
            item,
            index
          }

          if (queryType === 1) {
            return <LikeItem {...props} key={props.key} />
          }

          if (queryType === 2) {
            return <DispatchItem {...props} key={props.key} />
          }

          if (queryType === 3) {
            return <AcceptItem {...props} key={props.key} />
          }
          return (
            <div key={props.key}>
              <ToBeArrangedItem {...props} />
              {/* {!!newTask.length && newTask[0] === item?.task_id && (
                    <NewItemDom />
                  )} */}
            </div>
          )
        })
      )}
      <div className={style.more}>
        <span>查看全部</span>
        <MoreIcon className={style['more-icon']} />
      </div>
    </div>
  ) : null
}

export default forwardRef(TabPersonal)
