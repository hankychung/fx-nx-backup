import React, { FC, useMemo, useState, useRef, useEffect } from 'react'
// import { getParentNode } from 'utils/dom'
// import { openVenationWin } from 'utils/createVenationWin'
import { ReactComponent as VenationIcon } from '../../../assets/schedule/venationIcon.svg'

// import CreateApi from 'service/create'
// import MiddleDataApi from '@/service/bff/matter'
// import { Enter_page } from '@/sensor/actions/BASIC_KEYS'
// import createToolWin from '@/utils/createSmallToolsWin'
// import useMessage from '@hooks/useMessage'
// import Pubjs from 'utils/pubsub'
// import PUB from 'constants/pubsub'
import { ReactComponent as CycleIcon } from '../../../assets/schedule/cycle.svg'
import { ReactComponent as EditIcon } from '../../../assets/schedule/edit_icon.svg'

import { useMemoizedFn, useClickAway } from 'ahooks'
import cs from 'classnames'
// import { handleCompleteTask } from 'model/utils'
// import {
//   FullDoseHandlerCtx,
//   TitleEditorCtx,
//   TitleFilledCtx,
// } from 'pages/full-dose/context'
// import arrDownIcon from 'assets/icons/arr_down.png'
import { ReactComponent as ArrDownIcon } from '../../../assets/schedule/arrDownIcon.svg'

// import { MAX_TITLE_LEN } from '@/constants/const'
import { FlyTextTooltip, FlyTooltip } from '@flyele/flyele-components'
import {
  Enter_page_detail,
  FAKE_ID,
  NO_PROJECT_ID,
  Pub
  // TableHeaderTitle,
} from '@flyele-nx/constant'
import dayjs from 'dayjs'
// import { useLocation } from 'react-router-dom'
import { getWidget } from '../../utils/index'
// import { ICreateParams } from 'service/types/create'
// import { FullShowMode } from '@/service/types/matter.d'
// import { getDataset } from '@/hooks/useFollow'
// import { CreateMatterEnterPath } from '@/sensor/actions/matter.d'
// import { lureShowApiErrData } from '@/utils/pure_util'
// import { useCheckVip } from '@/hooks/useCheckVip'
// import { Context } from '@/pages/project/Detail/service'
// import { ICheckTaskComboResponse } from '@/service/types/rights'
// import { useGlobalMatterCondition } from '@/hooks/useGlobalMatterCondition'
// import { useGlobalMatterPriority } from '@/hooks/useGlobalMatterPriority'
import { IconBox } from './IconBox'
import style from './index.module.scss'
import { isInTask } from '../../utils/index'
import AlertPromise from '../../components/AlertPromise'
import { IFullViewCellProps, IScheduleTask } from '@flyele-nx/types'
import { getParentNode } from '@flyele-nx/utils'
import { MAX_TITLE_LEN, MatterType } from '@flyele-nx/constant'
import { ICreateParams } from '@flyele-nx/types'
import { useGanttList } from '../../hooks/useScheduleList'
import {
  globalNxController,
  useProjectStore
} from '@flyele-nx/global-processor'
import { TaskApi } from '@flyele-nx/service'
import { StatusBox } from './status-box'
import { ApiHandler } from '../../utils/apiHandler'
import { Indent } from '../../components/task-list/components/indent'
import { GanttHandler } from '../../utils/ganttHandler'

const Title: FC<React.PropsWithChildren<IFullViewCellProps>> = ({
  data,
  userId
}) => {
  const {
    title,
    matter_type,
    finish_time,
    has_child,
    isOpen,
    // lineLevel = 0,
    level = 0,
    // childLine,
    topParentLine,
    cycle_date,
    task_id,
    repeat_id = '',
    parent_id,
    repeat_type,
    takers,
    creator_id,
    cycle,
    date,
    group_id,
    project_id
    // parentKey,
    // uniqueKey,
  } = data
  const [edit, setEdit] = useState(false)
  // const { handleClick, activeCell } = useContext(TitleEditorCtx)
  // const fullDoseHandlerRef = useContext(FullDoseHandlerCtx)
  const [value, setVal] = useState(title)
  const [tempValue, setTempValue] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)
  const createInputRef = useRef<HTMLInputElement>(null)
  // const isDoubleRef = useRef(false)
  const isEditRef = useRef(false)
  const isDisableClick = useRef(false)
  const { showMsg, pubJsPublish } = globalNxController
  const { hoverId } = useGanttList()
  // const location = useLocation()
  // const { operateType: globalOperateType } = useGlobalMatterCondition()
  // const { globalMatterPriority } = useGlobalMatterPriority()
  const taskId = useMemo(() => task_id + repeat_id, [task_id, repeat_id])
  // const hoverId = useRecoilValue(hoveredTaskState)
  // const { isValidVip } = useCheckVip()
  // const { project } = useContext(Context)
  const isExpanded = useProjectStore((state) => {
    const dict = state.expandDict

    if (!dict) return false

    return Boolean(dict[taskId])
  })

  const handleEsc = useMemoizedFn(() => {
    const dom = document.querySelector(
      '.create-detail textarea'
    ) as HTMLTextAreaElement | null

    //结局重复弹窗
    const cancleTaskCreate = document.querySelector('.cancleTaskCreate')

    if (cancleTaskCreate) return
    if (!value.trim() && !dom?.value.trim()) {
      // fullDoseHandlerRef.current?.removeCreatingTask()
    } else {
      AlertPromise({
        title: '',
        content: <div className={style.modal}>是否取消创建</div>,
        cancelText: '取消创建',
        okText: '不取消',
        cancelStyle: { borderRadius: 8 },
        okStyle: { borderRadius: 8, backgroundColor: 'var(--primary)' },
        keyboard: false,
        className: 'cancleTaskCreate'
      })
        .then(() => {
          // 继续创建
          createInputRef.current?.focus()
        })
        .catch(() => {
          // 取消创建
          // fullDoseHandlerRef.current?.removeCreatingTask()
        })
    }
  })

  const handleCreateTask = useMemoizedFn(async () => {
    const title = value.trim()

    if (!title) {
      // fullDoseHandlerRef.current?.removeCreatingTask()
      return false
    }

    const params: ICreateParams = {
      widget: getWidget({
        isLoopMatter: true
      }),
      is_dispatch: 0,
      repeat_type: 0,
      title,
      matter_type: MatterType.matter
      // operate_type: globalOperateType,
      // priority_level: globalMatterPriority,
    }

    const pId = project_id

    // 创建带项目的事项
    if (pId && pId !== NO_PROJECT_ID) {
      params.project_id = pId
    }

    // 创建带项目分组的事项
    if (group_id) {
      params.project_id = pId
      params.group_id = group_id
    }

    // 创建带时间的事项
    if (date) {
      params.start_time = dayjs(date).unix()
      params.end_time = dayjs(date).add(1, 'day').unix() - 1
      params.start_time_full_day = 2
      params.end_time_full_day = 2
      params.remind_at = {
        max_alone_total: 0,
        start_remind: [params.start_time + 18 * 60 * 60]
      }
    }

    try {
      // const { data: successRes } = await CreateApi.createTask(
      //   params,
      //   undefined,
      //   // CreateMatterEnterPath.view_full_table
      // )

      // Pubjs.publish(PUB.CREATE_SUCCESS, {
      //   data: successRes,
      //   parentTaskId: '',
      //   isDispatch: 0,
      //   children: false,
      //   smallTool: false,
      //   matterType: MATTER_TYPE.matter,
      //   fullViewTask: {
      //     ...data,
      //     task_id: successRes.task_id,
      //     dispatch_id: successRes.dispatch_id,
      //     title,
      //     date,
      //   },
      // })

      showMsg({
        content: '创建成功'
      })

      setVal('')
    } catch (error) {
      if ((error as any).data.data && userId) {
        // const errData = (error as any).data.data as ICheckTaskComboResponse
        // lureShowApiErrData({
        //   errData,
        //   isValidVip,
        //   userId,
        //   project,
        // })
        // fullDoseHandlerRef.current?.removeCreatingTask()
      }
    }

    return true
  })

  useClickAway((e) => {
    const dom = e.target as HTMLDivElement

    // 点击取消创建modal
    if (getParentNode(dom, '.ant-modal-content')) {
      return
    }

    if (!value.trim()) {
      if (getParentNode(dom, '.create-detail')) {
        // 进入背景信息编辑
        return
      }

      // 点击创建事项的其他内容区域
      if (dom.classList.contains('create-mask')) {
        showMsg({ content: '标题未填哦' })

        createInputRef.current?.focus()

        return
      }

      // 取消创建
      // fullDoseHandlerRef.current?.removeCreatingTask()

      return
    }

    // 触发创建
    handleCreateTask()
  }, createInputRef)

  // const { setTitleFilled } = useContext(TitleFilledCtx)

  useEffect(() => {
    setVal(title)
    setTempValue(title)

    // if (task_id === FAKE_ID) {
    //   setTitleFilled(!!title.length)
    // }
  }, [title])

  const handleOpen = useMemoizedFn((e) => {
    e.stopPropagation()

    // if (!isGroup) {
    //   openVenationWin(undefined, {
    //     p: {
    //       key: data.parent_id ? data.parent_id.split(',')[0] : data.task_id,
    //       taskId: data.task_id,
    //       project_id: fullDoseHandlerRef.current?.options.projectId,
    //       title: data.title
    //     }
    //   })

    //   return
    // }

    if (has_child) {
      if (isExpanded) {
        GanttHandler.expand([taskId], false)
        return
      }
      GanttHandler.expand([taskId], true)
      // 拉取子事项更新projectStore
      const parentId = parent_id ? `${parent_id},${task_id}` : task_id
      ApiHandler.getChildren(parentId)
    }
  })

  const showCycleDetail = useMemoizedFn(async (e) => {
    e.stopPropagation()

    // const {
    //   data: { takers, task },
    // } = await MiddleDataApi.getFullDetail({
    //   taskId: task_id,
    //   apis: ['task', 'takers'],
    // })

    // fullDoseHandlerRef.current?.openCycleDrawer({
    //   open: true,
    //   cycleInfo: { task, detailTakers: takers || [], cycle },
    // })
  })

  const handleKeyPress = useMemoizedFn(async (e) => {
    const isEnter = e.key.toLowerCase() === 'enter'

    if (isEnter && !e.altKey && !e.ctrlKey && !e.shiftKey) {
      // blur
      inputRef.current?.blur()

      // 创建事项
      if (data.task_id === FAKE_ID) {
        const isValidCreate = await handleCreateTask()

        if (isEnter && isValidCreate) {
          setTimeout(() => {
            // fullDoseHandlerRef.current?.createNewTask()
            // fullDoseHandlerRef.current?.createCallback({ creating: true })
          })
        }
      }
    }
  })

  useEffect(() => {
    const listenEsc = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      if (key === 'escape') {
        // 退出编辑
        handleEsc()
      }
    }

    if (data.task_id === FAKE_ID) {
      // 监听
      document.addEventListener('keydown', listenEsc)
    }

    return () => {
      document.removeEventListener('keydown', listenEsc)
    }
  }, [data.task_id, handleEsc])

  const handleDoubleClick = useMemoizedFn(() => {
    // if (isEditRef.current) return
    // const isProjectPage = location.pathname.includes('/project/detail')
    globalNxController.openTaskDetailWindow({
      task: data as any,
      enterPage: Enter_page_detail.日程列表
    })
    // isDoubleRef.current = true
    // setTimeout(() => {
    //   isDoubleRef.current = false
    // }, 100)
  })

  const handleConfirm = useMemoizedFn(async () => {
    setEdit(false)
    isEditRef.current = false

    try {
      const title = value.trim()

      if (title === '') {
        setVal(tempValue)
        return
      }
      setVal(title)
      setTempValue(title)

      await TaskApi.updateTask({ title, matter_type }, task_id)

      pubJsPublish(Pub.DB_INCREASE_01_READUX_AND_SQLITEDB, {
        task_id,
        parent_id,
        diffObj: {
          task: {
            title
          }
        },
        type: 'updateTitle'
      })
    } catch (e) {
      console.log('全量更新标题出错')
    }
  })

  const isGroup = true

  const notMyBusiness = useMemo(
    () => !!userId && !isInTask(takers, userId, creator_id),
    [userId, takers, creator_id]
  )

  const handleTitleClick = useMemoizedFn(() => {
    // if (activeCell === `${taskId}-${TableHeaderTitle.title}`) {
    setTimeout(() => {
      // if (isDoubleRef.current) {
      //   return
      // }

      if (finish_time) {
        showMsg({
          msgType: '消息',
          content: '已完成事项不可修改'
        })
        return
      }

      if (notMyBusiness) {
        showMsg({
          msgType: '错误',
          content: '没参与事项不可修改'
        })
        return
      }

      // edit
      setEdit(true)
      isEditRef.current = true
      setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
    })
    // }
  })

  useEffect(() => {
    if (data.task_id === FAKE_ID) {
      setTimeout(() => {
        createInputRef.current?.focus()
      }, 600)
    }
  }, [data.task_id])

  const onHandleClick = useMemoizedFn((e) => {
    handleTitleClick()
  })

  const titleStyle = useMemo<React.CSSProperties>(() => {
    return level ? { marginLeft: 16 * level } : {}
  }, [level])

  const handleComplete = useMemoizedFn(async () => {
    isDisableClick.current = true

    // await handleCompleteTask(
    //   { ...data, ref_task_id: data.task_id },
    //   Enter_page.全量视图
    // )

    setTimeout(() => {
      isDisableClick.current = false
    }, 1000)
  })

  const onInputChange = useMemoizedFn((e) => {
    console.log(e)

    const inputValue = e.target.value

    if (task_id === FAKE_ID) {
      // setTitleFilled(!!inputValue.trim().length)
    }

    if (inputValue.length > MAX_TITLE_LEN) {
      showMsg({ msgType: '错误', content: `标题不可超过${MAX_TITLE_LEN}个字` })
      return
    }

    setVal(inputValue)
  })

  const batchComplete = useMemoizedFn(async () => {
    // if (isOpen) {
    //   await fullDoseHandlerRef.current?.toggleOpen(data)
    // }

    const repeatId = data.repeat_id

    // 提前更改完成状态
    // fullDoseHandlerRef.current?.localModify(
    //   [{ taskId: task_id, repeatId }],
    //   (target) => {
    //     target.finish_time = dayjs().unix()
    //   }
    // )

    return () => {
      // 失败后回退状态
      // fullDoseHandlerRef.current?.localModify(
      //   [{ taskId: task_id, repeatId }],
      //   (target) => {
      //     target.finish_time = 0
      //   }
      // )
    }
  })

  // 理论上拿repeat_total, 基于接口没有覆盖全会有缺失, 经后台确认过和cycle是同一个东西
  const reTotal = data.repeat_total || data.cycle

  const repeatTotal = reTotal ? (reTotal > 99 ? '99+' : reTotal) : 1

  const completeTotal = data.task_tree_complete_total || 0

  const taskTotal =
    Number(data.task_tree_total) > 99 && !isOpen
      ? '99+'
      : data.task_tree_total || 0
  const _data = useMemo(() => {
    return {
      ...data,
      ref_task_id: data.task_id
    }
  }, [data])
  return data.task_id === FAKE_ID ? (
    <div
      className={cs(style.title, style['title-active'], style['title-create'])}
    >
      <input
        ref={createInputRef}
        type="text"
        value={value}
        onChange={onInputChange}
        onKeyPress={handleKeyPress}
        placeholder="输入标题，回车创建，esc取消"
        style={{
          padding: '0 20px',
          width: '100%'
        }}
      />
    </div>
  ) : (
    <div className={cs(style.title)}>
      {topParentLine && <div className={style['line-outer']} />}
      <Indent
        task={data as unknown as IScheduleTask}
        isTopTask={!data.parent_id}
      />
      <div
        className={cs(style['icon-box'], {
          [style['icon-box-open']]: isOpen
        })}
        style={titleStyle}
      >
        <StatusBox task={_data as IScheduleTask} isVipWin={false} />
      </div>
      <div className={cs(style.txtBox)}>
        {!edit && (
          <div className={style.txt} onClick={handleDoubleClick}>
            <FlyTextTooltip text={value} isDynamic mountNode={document.body} />
          </div>
        )}
        {edit && (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onInputChange(e)}
            onBlur={handleConfirm}
            onKeyDown={handleKeyPress}
          />
        )}

        {!edit && (
          <div className={style['icon-wrapper']}>
            {(hoverId.includes(taskId) ||
              (repeat_id && hoverId.includes(repeat_id))) && (
              <div
                className={style['edit-icon']}
                onClick={(e) => {
                  onHandleClick(e)
                }}
              >
                <EditIcon />
              </div>
            )}

            {!!repeat_type && (
              <div className={style['repeat-box-wrapper']}>
                <FlyTooltip text={`已产生${repeatTotal}次循环`}>
                  <div
                    className={cs(style.box, style['repeat-box'])}
                    onClick={showCycleDetail}
                  >
                    <CycleIcon color="rgba(138, 138, 138, 1)" />
                    {isGroup && <span>{repeatTotal}</span>}
                  </div>
                </FlyTooltip>
              </div>
            )}

            {(has_child || (!isGroup && parent_id)) && (
              <FlyTooltip
                text={isGroup ? `已完成${completeTotal}个子事项` : '脉络图'}
              >
                <div
                  className={cs(style.box, style['close-box'], {
                    [style['close-box-open']]: isExpanded
                  })}
                  onClick={handleOpen}
                >
                  {isGroup ? (
                    <>
                      <span>{`${completeTotal}/${taskTotal}`}</span>
                      {/* <img src={arrDownIcon} alt="" /> */}
                      <ArrDownIcon />
                    </>
                  ) : (
                    <VenationIcon />
                  )}
                </div>
              </FlyTooltip>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export { Title }
