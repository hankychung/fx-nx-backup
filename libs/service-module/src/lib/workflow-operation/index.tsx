import { I18N } from '@flyele-nx/i18n'
import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
  useRef,
  useDeferredValue,
  useCallback
} from 'react'
import { Modal, Input, Button } from 'antd'
import cs from 'classnames'
import {
  FlyAvatar,
  FlyBasePopper,
  FlyBasePopperCtrl,
  FlyTooltip,
  useController
} from '@flyele/flyele-components'
import { useMemoizedFn, useUpdateEffect } from 'ahooks'
import { IOperationProps, IOperation, IWorkflowAddUser } from './types'
import { OperateStep, IStepItem, WorkFlowStep } from './WorkFlowStep'
import style from './index.module.scss'
import { getAllTakers, stepsFormatter } from './utils'
import { TaskApi, IWorkflowStep } from '@flyele-nx/service'

import {
  DisabledIcon,
  OptionIcon,
  RectWhiteIcon,
  TaskCheckIcon,
  UncheckIcon,
  UndoIcon
} from '@flyele-nx/icon'
import {
  useContactStore,
  useUserInfoStore,
  globalNxController
} from '@flyele-nx/global-processor'
import { MatterType, FlowOperateType, SIZE_TYPE_KEY } from '@flyele-nx/constant'
import { UserInfoUtils } from '@flyele-nx/utils'

const { TextArea } = Input

export type WorkflowOperationRef = {
  show: () => void
}

const _WorkflowOperation: ForwardRefRenderFunction<
  WorkflowOperationRef,
  IOperationProps
> = (
  {
    task,
    curStepId,
    creator_id,
    handleHover,
    size,
    popoverPos = 'absolute',
    addClickAlwaysHide,
    status: statusFromProps,
    complete_at,
    changeStatus,
    isVipWin = false
  },
  ref
) => {
  const ctrl = useController(new FlyBasePopperCtrl())
  const [showModal, setShowModal] = useState(false)
  const [showPopper, setShowPopper] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const open = useDeferredValue(showPopper)
  const [inputVal, setInputVal] = useState('')
  const [steps, setSteps] = useState<IWorkflowStep[]>([])
  const [addUser, setAddUser] = useState<IWorkflowAddUser>()
  const [status, setStatus] = useState<IOperation>(statusFromProps)
  const getStepsLoading = useRef(false)
  const { contactDict } = useContactStore()
  const userId = useUserInfoStore((state) => state.userInfo.user_id)
  const [outdated, setOutdated] = useState(false)

  const taskId = task.ref_task_id

  const stepList = useMemo(
    () => stepsFormatter(steps, curStepId, !!addUser),
    [steps, curStepId, addUser]
  )

  useEffect(() => {
    setOutdated(true)
  }, [task])

  const openSteps = useMemoizedFn(() => {
    if (isHovering && steps.length) {
      ctrl.show()
    } else {
      setShowPopper(false)
    }
  })

  useUpdateEffect(() => {
    if (!open) return
    openSteps()
  }, [open])

  useEffect(() => {
    if (!isHovering) return

    if (stepList.length) {
      openSteps()
    }
  }, [isHovering, stepList, openSteps])

  // 当前事项是否已经完成验证
  const isOverDoneVerify = useMemoizedFn(() => {
    if (complete_at) return true

    const isLast = stepList.some((v) => v.step === OperateStep.DONE)

    // 如果不是最后一步，说明事项还没结束
    if (!isLast) return false

    // 当前步骤
    const curStep = steps.find((i) => i.id === curStepId)

    if (curStep?.operate_type === FlowOperateType.OR) {
      return !!curStep.user_ids?.some((v) => !!v.complete_at)
    }

    return !!curStep?.user_ids?.every((v) => !!v.complete_at)
  })

  const updateFlow = useMemoizedFn(async () => {
    await getSteps()
  })

  useEffect(() => {
    setStatus(statusFromProps)
  }, [statusFromProps])

  const refreshStatus = useMemoizedFn(() => {
    // 防止进入的时候steps是空的，当steps是空的时候 所有的判断都会出错
    if (steps.length === 0) {
      updateFlow()
      return
    }

    if (
      userId !== creator_id &&
      !steps.some((v) => v.user_ids?.some((v) => v.user_id === userId))
    ) {
      setStatus('pass')
      return
    }

    if (complete_at) {
      setStatus('complete')
      return
    }

    const curStep = steps.find((i) => i.id === curStepId)

    if (curStep) {
      const { user_ids } = curStep

      if (!user_ids?.length && userId === creator_id) {
        if (complete_at) {
          setStatus('complete')
          return
        }

        setStatus('handle')
        return
      }

      const myStatus = user_ids?.find((i) => i.user_id === userId)

      if (!myStatus) {
        setStatus('pass')
        return
      }

      if (myStatus.complete_at) {
        setStatus('complete')
        return
      }

      setStatus('handle')
      return
    }

    setStatus('pass')
  })

  useUpdateEffect(() => {
    refreshStatus()
  }, [complete_at, steps])

  useEffect(() => {
    if (!steps.length) return

    refreshStatus()
  }, [steps.length, curStepId, refreshStatus])

  const getSteps = useMemoizedFn(async () => {
    getStepsLoading.current = true

    const { data } = await TaskApi.getFlowSteps({ taskId })

    if (!data) {
      console.error('无工作流', taskId, data)
    }

    setSteps(data || [])
    if (data && data[0] && data[0].creator_id) {
      const user = contactDict[data[0].creator_id]

      const { isTeamVip, isVip } = UserInfoUtils.checkVipType(user)

      setAddUser({
        avatar: user?.avatar || '',
        name: user?.original_name || user?.nick_name,
        isTeamVip,
        isVip
      })
    }

    getStepsLoading.current = false

    if (isHovering) {
      setShowPopper(true)
    }
  })

  useEffect(() => {
    if (task.refreshWorkflow) {
      getSteps()
    }
  }, [task, getSteps])

  const showOperation = useMemoizedFn(() => {
    handleHover && handleHover(true)
    setIsHovering(true)

    if (!steps.length || outdated) {
      setOutdated(false)
      getSteps()
    } else {
      setShowPopper(true)
    }
  })

  useEffect(() => {
    ctrl.addListener((res) => {
      if (res === 'show') {
        showOperation()
      }
    })
  }, [ctrl, showOperation])

  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        addClickAlwaysHide ? ctrl.addClickAlwaysHide().show() : ctrl.show()
      }
    }),
    [addClickAlwaysHide, ctrl]
  )

  const handleBack = useMemoizedFn(() => {
    setShowModal(true)
  })

  const handleBackConfirm = useMemoizedFn(() => {
    closeModal()

    TaskApi.flowStepRollback({ reason: inputVal, taskId, curStepId })
      .then(() => {
        changeStatus?.()
        globalNxController.updateWorkflowStep({ taskId })
        globalNxController.showMsg({
          msgType: '成功',
          content: I18N.common.theOperationWasSuccessful2
        })
      })
      .catch((err: any) => {
        globalNxController.updateWorkflowStep({ taskId })
        if (err?.response?.data && err?.response?.data?.code === 40050) {
          // 他人已处理说明当前的操作不对,可能同时多人操作,
          // 也可能会存在数据不同等问题,最好还是走一次成功流程刷新一次数据
          changeStatus?.()
        }
      })
  })

  // 获取完成下一步的文案
  const getHandleNextTxt = useMemoizedFn(() => {
    // 当前步骤
    const curStep = steps.find((i) => i.id === curStepId)
    // 完成的是不是最后一步
    const isLast = stepList.some((v) => v.step === OperateStep.DONE)

    if (curStep?.operate_type === FlowOperateType.OR) {
      if (isLast) {
        return I18N.common.operationSuccessfulWorkflow
      }

      return I18N.common.theOperationWasSuccessful
    }

    const isAllOver = curStep?.user_ids?.every((v) => !!v.complete_at)

    // 如果是最后一步且全部已完成
    if (isLast && isAllOver) {
      return I18N.common.operationSuccessfulWorkflow
    }

    // 是否当前已全部完成
    if (isAllOver) {
      return I18N.common.theOperationWasSuccessful
    }

    // 当前非最后一步且非全部已完成
    return I18N.common.successfulOperationEtc
  })

  const handleNext = useMemoizedFn(() => {
    TaskApi.flowStepComplete({ curStepId, taskId })
      .then(() => {
        changeStatus?.()
        globalNxController.updateWorkflowStep({ taskId })
        globalNxController.showMsg({
          msgType: '成功',
          content: getHandleNextTxt()
        })
      })
      .catch((err) => {
        globalNxController.updateWorkflowStep({ taskId })
        if (err?.response?.data && err?.response?.data?.code === 40050) {
          // 他人已处理说明当前的操作不对,可能同时多人操作,
          // 也可能会存在数据不同等问题,最好还是走一次成功流程刷新一次数据
          changeStatus?.()
        }
      })
  })

  /**
   * 通知外部打开协作人邀请弹窗
   */
  const showAddModal = useMemoizedFn((chosenStep: string) => {
    const { allTakerIds } = getAllTakers(steps)
    const params = {
      matterType: MatterType.matter,
      task: {
        id: taskId,
        title: ''
      },
      sensor: null,
      conditionModel: {
        modelName: 'MatterConditionModel',
        params: {
          type: 'globalMatterCondition'
        }
      },
      isWorkFlowAdd: true,
      allTakerIds,
      chosenStep
    }

    if (isVipWin) {
      globalNxController.ipcRendererInvoke('vipSmallToolsWin-siszable', {
        sizeType: SIZE_TYPE_KEY.邀请协作人
      })
    }

    globalNxController.onHandlerTaskAddTaker(params)
  })

  /**
   * 在工作流事项中，当勾选当前步骤时，需要判断下一步是否有人：
   * 1、若下一步无人：
   *   若为“或”步骤，勾选完成后出现弹窗
   *   若为“且”步骤，当该步骤中最后一个人勾选完成后出现弹窗
   * 2、若下一步有人：勾选完成后进入下一步
   */
  const nextStepHasPenson = useCallback(() => {
    // 当前步骤
    const curStepIndex = steps.findIndex((i) => i.id === curStepId)
    const curStep = steps.find((i) => i.id === curStepId)
    // 完成的是不是最后一步
    const isLastStep = stepList.some((v) => v.step === OperateStep.DONE)

    if (isLastStep) {
      handleNext()
      return
    }

    const hasPerson = !!steps[curStepIndex + 1]?.user_ids?.length

    const notComplete = curStep?.user_ids?.filter((i) => !i.complete_at) || []
    const isLastComplete = notComplete.length <= 1

    if (curStep?.operate_type === FlowOperateType.OR && hasPerson) {
      handleNext()
      return
    }
    if (curStep?.operate_type === FlowOperateType.AND) {
      if (!isLastComplete || hasPerson) {
        handleNext()
        return
      }
    }

    const modal = Modal.confirm({
      width: 420,
      icon: null,
      centered: true,
      content: <div>{I18N.common.theNextStepIsStillPending}</div>,
      cancelText: I18N.common.cancel,
      okText: I18N.common.toChoose,
      cancelButtonProps: {
        type: 'text',
        style: { borderRadius: 8 }
      },
      okButtonProps: {
        style: { borderRadius: 8, backgroundColor: '#1DD2C1' }
      },
      onOk: () => {
        modal.destroy()
        showAddModal(steps[curStepIndex + 1].id)
      },
      onCancel: () => {
        modal.destroy()
      }
    })
  }, [steps, curStepId, stepList, handleNext, showAddModal])

  const closeModal = useMemoizedFn(() => {
    setShowModal(false)
    setInputVal('')
  })

  const checkBeforeStep = useMemoizedFn(() => {
    if (showModal) {
      closeModal()
      globalNxController.showMsg({ content: I18N.common.othersHaveProcessed })
    }
  })

  useEffect(() => {
    checkBeforeStep()
  }, [curStepId, checkBeforeStep])

  const overToast = useMemoizedFn(() => {
    if (isOverDoneVerify()) {
      globalNxController.showMsg({
        msgType: '消息',
        content: I18N.common.workflowMatters
      })
    } else {
      globalNxController.showMsg({
        msgType: '消息',
        content: I18N.common.currentStepYou2
      })
    }
  })

  const clickIcon = useMemoizedFn(async () => {
    switch (status) {
      case 'pass': {
        globalNxController.showMsg({
          msgType: '消息',
          content: I18N.common.currentStepYou
        })
        break
      }
      case 'complete': {
        if (steps.length) {
          overToast()
        } else {
          await getSteps()

          clickIcon()
        }
        break
      }
      default:
        break
    }
  })

  return (
    <div
      className={style.option}
      style={size ? { width: `${size}px`, height: `${size}px` } : {}}
    >
      {status === 'handle' ? (
        <FlyBasePopper
          content={() => {
            return (
              <Container
                list={stepList}
                ctrl={ctrl}
                handleBack={handleBack}
                handleNext={nextStepHasPenson}
                addUser={addUser}
              />
            )
          }}
          destroyPopperOnHide
          placement="bottom"
          popperDistance={12}
          showArrow
          disable={!stepList.length}
          strategy={popoverPos}
          theme="light"
          trigger="hover"
          triggerInvisibleHide
          zIndex={9999}
          controller={ctrl}
          clickOnHide={false}
          onVisibleChange={setIsHovering}
        >
          <div
            className={style.icon}
            onMouseEnter={() => {
              setIsHovering(true)
            }}
            onMouseLeave={() => {
              setIsHovering(false)
            }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <OptionIcon className={style.optionIcon} />
            <UncheckIcon className={style.uncheckIcon} />
          </div>
        </FlyBasePopper>
      ) : (
        <div
          className={cs(style.icon, {
            [style['icon-complete']]: status === 'complete',
            [style['icon-pass']]: status === 'pass'
          })}
          onClick={clickIcon}
        >
          {status === 'complete' && <TaskCheckIcon />}
          {status === 'pass' && <DisabledIcon />}
        </div>
      )}
      <Modal
        centered
        open={showModal}
        width={480}
        closable={false}
        footer={null}
      >
        <div className={style['modal-content']}>
          <div className={style.title}>{I18N.common.stepBack}</div>
          <div className={style.content}>
            <TextArea
              value={inputVal}
              autoSize={false}
              maxLength={150}
              showCount
              placeholder={I18N.common.pleaseEnterHere}
              onChange={(e) => {
                const { value } = e.target

                if (value.length >= 150) {
                  globalNxController.showMsg({
                    msgType: '消息',
                    content: I18N.template?.(I18N.common.supportsUpToM, {
                      val1: 150
                    })
                  })
                }

                setInputVal(value)
              }}
            />
          </div>
          <div className={style.footer}>
            <div onClick={closeModal}>{I18N.common.cancel}</div>
            <div onClick={handleBackConfirm}>{I18N.common.submit}</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const _Container: FC<{
  ctrl: FlyBasePopperCtrl
  handleBack: () => void
  handleNext: () => void
  list: IStepItem[]
  addUser?: IWorkflowAddUser
}> = ({ ctrl, handleBack, list, handleNext, addUser }) => {
  const clickStep = useMemoizedFn((step: OperateStep) => {
    if ([OperateStep.NEXT, OperateStep.DONE].includes(step)) return

    ctrl.hide()

    if (OperateStep.PRE === step) {
      handleBack()
      return
    }

    if ([OperateStep.CUR].includes(step)) {
      handleNext()
    }
  })

  console.log('addUser', addUser, list)

  const isFirstStep = useMemo(
    () => list.some((v) => v.step === OperateStep.START),
    [list]
  )

  return (
    <div className={style.container}>
      {list.map(({ idx, title, step, members, operateType }) => {
        if (addUser) {
          if (step === OperateStep.START) {
            return (
              <div className={style.wrapper} key={idx}>
                <div className={style.line} />
                <FlyTooltip text={addUser.name} trigger="hover">
                  <div className={cs(style['other-info'], style.header)}>
                    <span>{`${I18N.common.create}: `}</span>
                    <FlyAvatar src={addUser?.avatar} size={15} />
                    <span className={cs(style.overflow)}>{addUser.name}</span>
                  </div>
                </FlyTooltip>
              </div>
            )
          }
          if (step === OperateStep.DONE) {
            return (
              <div className={style.wrapper} key={idx}>
                <div className={cs(style['other-info'], style.end)}>
                  {I18N.common.end}
                </div>
                <div className={style.line} />
              </div>
            )
          }
        }
        return (
          <WorkFlowStep
            key={idx}
            title={title}
            step={step}
            idx={idx}
            members={members || []}
            handleClick={() => {
              // clickStep(step)
            }}
            operateType={operateType}
          />
        )
      })}
      <div className={style['btn-group']}>
        <Button
          className={style.btn}
          icon={
            isFirstStep ? (
              <UndoIcon color="#8F8F8F" className={style['btn-icon']} />
            ) : (
              <UndoIcon color="#262626" className={style['btn-icon']} />
            )
          }
          onClick={handleBack}
          disabled={isFirstStep}
        >
          {I18N.common.previousStep}
        </Button>
        <Button
          className={style.btn}
          icon={<RectWhiteIcon className={style['btn-icon']} />}
          type="primary"
          onClick={handleNext}
        >
          {I18N.common.nextStep}
        </Button>
      </div>
    </div>
  )
}

const Container = React.memo(_Container)

export const WorkflowOperation = React.memo(forwardRef(_WorkflowOperation))
