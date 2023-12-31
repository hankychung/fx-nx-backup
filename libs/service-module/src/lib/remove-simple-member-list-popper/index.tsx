import { I18N } from '@flyele-nx/i18n'
import React, {
  MouseEvent,
  PropsWithChildren,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import SimpleMemberList, { ISimpleMember } from '../simple-member-list'
import { useTaskMemberRemove } from '../member/hooks/useTaskMemberRemove'
import { AlertWithOkAndCancel } from '@flyele-nx/ui'
import { TaskApi } from '@flyele-nx/service'
import { globalNxController } from '@flyele-nx/global-processor'
import { Popover } from 'antd'
import { useMemoizedFn } from 'ahooks'

export interface IHandleMethods {
  handleOpenChange: (newOpen: boolean) => void
}

type IProps = {
  taskId: string
  memberList: ISimpleMember[]
  canShow: () => Promise<boolean>
  onClickAdd?: (e: MouseEvent<HTMLDivElement>) => void
  isWorkFlow?: boolean // 是否工作流
  canNotAdd?: boolean // 是否可添加
  isView?: boolean //
  userInTask?: boolean
}

const RemoveSimpleMemberListPopper = forwardRef<
  IHandleMethods,
  PropsWithChildren<IProps>
>((props, ref) => {
  const {
    taskId,
    memberList,
    children,
    canShow,
    onClickAdd,
    isWorkFlow,
    canNotAdd = false,
    isView,
    userInTask = true
  } = props

  const [open, setOpen] = useState(false)

  const { taskMemberRemove } = useTaskMemberRemove()

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const onClickRemove = useMemoizedFn((member: ISimpleMember) => {
    if (userInTask) {
      AlertWithOkAndCancel.alert({
        message: I18N.common.areYouSureYouWantToMove,
        confirmTxt: I18N.common.remove,
        cancelTxt: I18N.common.cancel,
        color: 'red',
        async onOk() {
          let dispatchId = member.dispatchId

          // 本地添加的协作人无法知道其dispatchId
          if (!dispatchId) {
            const task = await TaskApi.search({ refId: taskId })

            const taker = (task.data[0].takers || []).find(
              (t) => t.taker_id === member.userId
            )

            dispatchId = taker?.dispatch_id || ''
          }

          taskMemberRemove({
            data: {
              taskId,
              selectedTakerList: [
                {
                  userId: member.userId,
                  dispatchId,
                  isCreator: !!member.isCreator
                }
              ]
            },
            onSuccess: () => {
              handleOpenChange(false)
            }
          })
        }
      })
    } else {
      globalNxController.showMsg({
        msgType: '错误',
        content: I18N.common.notInvolvedInMatters
      })
    }
  })

  useImperativeHandle(ref, () => ({
    handleOpenChange
  }))

  return (
    <Popover
      id="removeSimpleMemberList"
      arrow={false}
      placement="bottom"
      trigger="click"
      open={open}
      onOpenChange={async (value) => {
        if (value) {
          if (await canShow()) {
            handleOpenChange(value)
          }
        } else {
          handleOpenChange(value)
        }
      }}
      zIndex={500}
      autoAdjustOverflow={true}
      destroyTooltipOnHide={true}
      overlayInnerStyle={{
        padding: 0
      }}
      content={() => (
        <SimpleMemberList
          list={memberList}
          canNotAdd={canNotAdd}
          onClickAdd={onClickAdd}
          onClickRemove={onClickRemove}
          isWorkFlow={isWorkFlow}
          isView={isView}
        />
      )}
    >
      {children}
    </Popover>
  )
})

RemoveSimpleMemberListPopper.displayName = 'RemoveSimpleMemberListPopper'

export { RemoveSimpleMemberListPopper }
