/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-07-20 14:31:01
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-20 17:58:11
 * @FilePath: /fx-nx/libs/service-module/src/lib/gantt/Row/Title/IconBox/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { FC, useState, useMemo, useCallback, useEffect } from 'react'
import cs from 'classnames'
import { useMemoizedFn } from 'ahooks'
import dayjs from 'dayjs'
// import MatterApi from '@/service/matter'
import { flatten } from 'lodash'
// import {
//   handleBatchRepeatCompleteTask,
//   isFinishWithRepeat,
// } from '@/model/utils'
import { Spin } from 'antd'
import meetingFinishedIcon from '../../../../assets/schedule/meeting-finished.png'
import meetingIcon from '../../../../assets/schedule/meeting.png'
import checkingGif from '../../../../assets/schedule/checking.gif'
import checkboxDisabledIcon from '../../../../assets/schedule/uncheck_disabled.png'
import cycleIcon from '../../../../assets/schedule/cycle.png'
import checkboxFinishedIcon from '../../../../assets/schedule/check.png'
import checkboxIcon from '../../../../assets/schedule/uncheck.png'
import { useMessage } from '@flyele-nx/ui'
// import { useLocation } from 'react-router-dom'
// import { Complete_entrance } from '@/sensor/actions/BASIC_KEYS'
// import Pubjs from '@utils/pubsub'
// import SUB from '@/constants/pubsub'
// import {
//   PAPI_repeact_tasks_complete,
//   PAPI_tasks_set_state,
// } from '@/pages/small-tools/MVC/P-process/Schedule/Set'

import style from './index.module.scss'
import { timeGetter } from '@flyele-nx/utils'
import { setTimeoutForIdleCallback } from '@flyele-nx/utils'
// import AcceptOnceMany from '../../../../accept-once-many'
import { Task } from '@flyele-nx/types'
// import { WorkflowOperation } from '../../../../workflow-operation'
// import { getOperationStatus } from '../../../../workflow-operation/utils'
import {
  WorkflowOperation,
  getOperationStatus,
  AcceptOnceMany
} from '@flyele-nx/service-module'
import { IFullViewRepeatTreeItem, IFullViewTreeItem } from '@flyele-nx/types'

interface IProps {
  matterType: number
  finished?: boolean
  notMyBusiness?: boolean
  cycleDate?: string
  onClick?: (state?: boolean) => void
  data: Task
  userId?: string
  batchComplete?: () => Promise<() => void>
  /**
   * 是否为多选框
   */
  isSelector?: boolean
  handleCheckboxHover?: (b: boolean) => void
}

const isMeeting = (matterType: number) => matterType === 10702

const isTask = (matterType: number) => [10701, 10705].includes(matterType)

const IconBox: FC<React.PropsWithChildren<IProps>> = ({
  matterType,
  finished = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  cycleDate,
  notMyBusiness,
  data,
  userId,
  batchComplete,
  // isSelector = false,
  handleCheckboxHover
}) => {
  const [visible, setVisible] = useState(false)
  const [checking, setChecking] = useState(false)
  const [isFinished, setIsFinished] = useState(finished)
  const [isFutureCycle, setIsFutureCycle] = useState(false)
  const [unFinishList, setUnFinishList] = useState<
    IFullViewTreeItem<Task>[] | IFullViewRepeatTreeItem[]
  >([]) // 未完成列表
  //p2 非我执行
  const nonSelfExecution = useMemo(() => {
    return data.identity === 10804 || data.identity === 10811
  }, [data])

  // // 是否在线状态
  // const { isOnline_and_check_alert } = useOnline()
  // 请求加载中
  const [inDelay, setInDelay] = useState<boolean>(false)
  const [showMsg] = useMessage()
  // const location = useLocation()

  useEffect(() => {
    timeGetter.getDate().then((stamp) => {
      if (
        data.repeat_type &&
        dayjs(cycleDate || (data.start_time || 0) * 1000).isAfter(
          dayjs.unix(stamp),
          'date'
        )
      ) {
        setIsFutureCycle(true)
      } else {
        setIsFutureCycle(false)
      }
    })
  }, [cycleDate, data.start_time, data.repeat_type])

  useEffect(() => {
    const value = nonSelfExecution ? !!data.complete_at : finished

    setIsFinished(value)
  }, [data.complete_at, finished, nonSelfExecution])

  // const complete_entrance = useMemo(() => {
  //   const isProject = location.pathname.includes('project/detail')

  //   return isProject
  //     ? Complete_entrance.项目_事项列表
  //     : Complete_entrance.全量视图
  // }, [location.pathname])

  /**
   * 点击完成拥有多个子事项的
   */
  const completeHandle = useCallback(
    (task: any) => {
      if (task.repeat_id) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { cycle, repeat_finishes } = task.repeat_list?.find(
          (item: { repeat_id: string }) => item.repeat_id === task.repeat_id
        )

        // 点击
        cycle &&
        task.repeat_type &&
        !repeat_finishes?.find(
          (item: { user_id: string }) => item.user_id === userId
        )
          ? showMsg({
              msgType: '消息',
              content: `你已完成第${cycle}次循环`
            })
          : showMsg({
              msgType: '消息',
              content: '该事项已放到最新的循环中'
            })
      }
    },
    [showMsg, userId]
  )

  const completeOnlyOne = async () => {
    setVisible(false)

    if (!finished) {
      setChecking(true)

      await setTimeoutForIdleCallback({
        timer: 900
      })

      setChecking(false)
    }

    try {
      await onClick()
    } catch (e) {
      if (!finished) {
        setIsFinished(false)
      }
    }
  }

  // pl
  const completeOnceMany = async () => {
    const dispatch_datas_list = unFinishList
    // 检查在线状态

    if (batchComplete) {
      const failCallback = await batchComplete()
      // 先让他loading完再继续操作

      setChecking(true)
      setVisible(false)

      await setTimeoutForIdleCallback({
        timer: 600
      })

      setChecking(false)

      setInDelay(true)

      // 循环事项的批量完成处理
      //7107todo

      if (data.repeat_type && data.repeat_id) {
        const completeList = [
          ...(unFinishList as IFullViewRepeatTreeItem[]).map((v) => {
            return {
              task_id: v.task_id,
              repeat_id: v.repeat_id
            }
          })
        ].concat([
          {
            task_id: data.task_id,
            repeat_id: data.repeat_id
          }
        ])

        console.log(completeList, unFinishList, 'unFinishList')

        // PAPI_repeact_tasks_complete({
        //   tasks: completeList,
        //   callback: async () => {
        //     setInDelay(false)
        //     completeHandle(data)

        //     // handleBatchRepeatCompleteTask(
        //     //   completeList as IFullViewRepeatTreeItem[],
        //     //   data.task_id
        //     // )
        //   },
        //   catchCallback: () => {
        //     setInDelay(false)
        //     failCallback()
        //     showMsg({
        //       msgType: '错误',
        //       content: '操作失败',
        //     })
        //   },
        // })

        return
      }

      /**
       * 详情完成
       */
      // PAPI_tasks_set_state({
      //   send_data: {
      //     dispatch_id: data.dispatch_id,
      //     data: {
      //       state: data.state,
      //     },
      //   },
      //   complete_entrance,
      //   dispatch_datas: [
      //     { ...data, children: undefined },
      //     ...dispatch_datas_list,
      //   ],
      //   callback: async (tasks: Array<any>) => {
      //     setInDelay(false)
      //     await completeHandle(data)

      //     const finishTime = await timeGetter.getDate()

      //     const pubList = tasks.map((task: any) => {
      //       return {
      //         ref_task_id: task?.task_id || task?.ref_task_id,
      //         task_id: task?.task_id || task?.ref_task_id,
      //         dispatch_id: data.dispatch_id,
      //         ...task,
      //         finish_time: [10302, 10404].includes(task.state) ? finishTime : 0,
      //         deleteChild: true,
      //       }
      //     })

      //     if (!pubList.map((i) => i.task_id).includes(data.task_id)) {
      //       failCallback()
      //     }

      //     // Pubjs.publish(SUB.LOCAL_UPDATE_SCHEDULE_ITEMS, pubList)

      //     // Pubjs.publish(SUB.BATCH_UPDATE_READUX_TASK, {
      //     //   task_ids: pubList.map(
      //     //     (item: any) => item?.task_id || item?.ref_task_id
      //     //   ), // ↓ 需要更新的部分差量数据
      //     //   diffObj: {
      //     //     // task,
      //     //     task_dispatch: {
      //     //       state: data.state,
      //     //     },
      //     //   },
      //     // })

      //     // Pubjs.publish(SUB.BATCH_01_READUX_AND_SQLITEDB, {
      //     //   task_ids: pubList.map(
      //     //     (item: any) => item?.task_id || item?.ref_task_id
      //     //   ),
      //     //   diffObj: {
      //     //     // task,
      //     //     task_dispatch: {
      //     //       state: data.state,
      //     //       finish_time: finishTime,
      //     //     },
      //     //   },
      //     // })

      //     // 日程通知处理 - 批量完成 //7107
      //     pubList.forEach((item: any) => {
      //       if (item.identity === 10804 || item.identity === 10811) return

      //       // Pubjs.publish(SUB.DB_INCREASE_01_READUX_AND_SQLITEDB, {
      //       //   type: 'dontUpdate',
      //       //   task_id: item?.task_id || item?.ref_task_id, // ↓ 需要更新的部分差量数据
      //       //   diffObj: {
      //       //     // task,
      //       //     task_dispatch: {
      //       //       state: item?.state,
      //       //     },
      //       //   },
      //       //   // 批量处理不更新日程, 通过LOCAL_UPDATE_SCHEDULE_ITEMS更新
      //       //   doNotUpdateSchedule: true,
      //       // })

      //       if (item?.state === 10404) {
      //         // Pubjs.publish(SUB.TASK_7_FINISH_STATE, {
      //         //   socketData: {
      //         //     o: '',
      //         //     // msg: IMsg
      //         //     // father_task_id: string
      //         //     rid: item?.task_id || item?.ref_task_id,
      //         //   },
      //         // })
      //       }
      //     })
      //   },
      //   catchCallback: () => {
      //     failCallback()
      //     setInDelay(false)
      //     showMsg({
      //       msgType: '错误',
      //       content: '操作失败',
      //     })
      //   },
      // })
    }
  }

  /**
   * 查询所有的子事项
   * @param task_id 事项ID
   * @returns 所有的子事项
   */
  const getChildrenTree = (task_id: string) => {
    // return (MatterApi.getCompleteTree(task_id).then(
    //   (res) => res.data
    // ) as unknown) as Promise<FullViewTask[]>
  }

  const disableClick = useMemo(
    () => isMeeting(matterType) || isFutureCycle || notMyBusiness,
    [isFutureCycle, matterType, notMyBusiness]
  )

  const getUNFinishList = (
    list: IFullViewTreeItem<Task>[]
  ): IFullViewTreeItem<Task>[] => {
    return flatten(
      list.map((item) => {
        if (item.children) {
          item.children = getUNFinishList(item.children)
        }

        // if (!isFinishWithRepeat(item)) {
        //   return [item]
        // }

        if (item.children && item.children?.length > 0) {
          return item.children
        }

        return []
      })
    )
  }

  const handleClick = useMemoizedFn(async () => {
    if (nonSelfExecution || disableClick) {
      if (nonSelfExecution ? !!data.complete_at : !!data.finish_time) {
        showMsg({
          msgType: '错误',
          content: '你未参与，无法再次打开'
        })
      } else {
        showMsg({
          msgType: '错误',
          content: '你未参与，无法完成'
        })
      }
      return
    }
    // end
    // if (disableClick) return

    if (!finished && !data.has_child) {
      setChecking(true)

      await setTimeoutForIdleCallback({
        timer: 900
      })

      setChecking(false)

      setIsFinished(true)
    }

    try {
      if (!finished && data.has_child) {
        if (data.repeat_type && data.repeat_id) {
          // MatterApi.getRepeatCompleteTree(data.task_id, data.repeat_id).then(
          //   ({ data: list }) => {
          //     const unFinishList = cloneDeep(list)
          //     setUnFinishList(unFinishList)
          //     // setIsFinished(true)
          //     unFinishList.length > 0 ? setVisible(true) : onClick()
          //   }
          // )
        } else {
          // getChildrenTree(data.task_id).then((list: any) => {
          //   let unFinishList = getUNFinishList(cloneDeep(list)) || []
          //   if (unFinishList.some((v) => v.repeat_type)) {
          //     unFinishList = []
          //   }
          //   //pc-7107 过滤非我执行
          //   unFinishList = unFinishList.filter(
          //     (e: any) => ![10811, 10804].includes(e.identity)
          //   )
          //   setUnFinishList(unFinishList)
          //   // setIsFinished(true)
          //   unFinishList.length > 0 ? setVisible(true) : onClick()
          // })
        }
      } else {
        onClick()
      }
    } catch (e) {
      if (!finished) {
        setIsFinished(false)
      }
    }
  })

  const getIcon = () => {
    // loading状态
    if (inDelay) return <Spin size="small" />

    if (data.flow_step_id) {
      return (
        <WorkflowOperation
          creator_id={data.creator_id}
          taskId={data.task_id}
          curStepId={data.flow_step_id}
          complete_at={data.complete_at}
          handleHover={handleCheckboxHover}
          status={getOperationStatus(data, userId || '')}
          size={14}
        />
      )
    }

    // 会议
    if (isMeeting(matterType)) {
      if (isFinished || notMyBusiness) {
        return (
          <img
            onClick={handleClick}
            className={style.icon}
            src={meetingFinishedIcon}
            alt=""
          />
        )
      }

      return (
        <img
          onClick={handleClick}
          className={style.icon}
          src={meetingIcon}
          alt=""
        />
      )
    }

    if (checking) {
      return (
        <img
          onClick={handleClick}
          className={style.checkingIcon}
          src={checkingGif}
          alt=""
        />
      )
    }

    if (notMyBusiness) {
      return (
        <img
          onClick={handleClick}
          className={style.icon}
          src={checkboxDisabledIcon}
          alt=""
        />
      )
    }

    if (isFutureCycle) {
      return (
        <img
          onClick={handleClick}
          className={style.icon}
          src={cycleIcon}
          alt=""
        />
      )
    }

    // 事项/待办
    if (isTask(matterType)) {
      if (isFinished) {
        return (
          <img
            onClick={handleClick}
            className={style.icon}
            src={checkboxFinishedIcon}
            alt=""
          />
        )
      }

      return (
        <AcceptOnceMany
          visible={visible} // 气泡框显示状态
          visibleChange={(v) => !v && setVisible(v)} // 设置气泡框显隐
          // 仅一个的操作
          taskList={unFinishList.map((item) => item.task_id)}
          handleClickOnlyOne={completeOnlyOne}
          // 批量操作
          handleClickAll={completeOnceMany}
          typeName="finish"
          overlayClassName="full_dose_custom_popover"
          cycle={data.cycle}
        >
          <img
            onClick={handleClick}
            className={style.icon}
            src={nonSelfExecution ? checkboxDisabledIcon : checkboxIcon}
            alt=""
          />
        </AcceptOnceMany>
      )
    }

    return null
  }

  return (
    <div
      className={cs(style.iconbox)}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {getIcon()}
    </div>
  )
}

export { IconBox }
