import React, { MouseEvent, PropsWithChildren, useCallback } from 'react'
import { FlyBasePopper, FlyBasePopperCtrl } from '@flyele/flyele-components'
import SimpleMemberList, { ISimpleMember } from '../simple-member-list'
import { useTaskMemberRemove } from '../member/hooks/useTaskMemberRemove'
import { AlertWithOkAndCancel } from '@flyele-nx/ui'
import { useMessage } from '@flyele-nx/ui'
import { TaskApi } from '@flyele-nx/service'

type IProps = {
  taskId: string
  memberList: ISimpleMember[]
  onClickAdd?: (e: MouseEvent<HTMLDivElement>) => void
  ctrl: FlyBasePopperCtrl
  isWorkFlow?: boolean // 是否工作流
  canNotAdd?: boolean // 是否可添加
  isView?: boolean //
  userInTask?: boolean
}

export function RemoveSimpleMemberListPopper(props: PropsWithChildren<IProps>) {
  const {
    taskId,
    memberList,
    children,
    onClickAdd,
    ctrl,
    isWorkFlow,
    canNotAdd = false,
    isView,
    userInTask = true
  } = props

  const [showMsg] = useMessage()
  const { taskMemberRemove } = useTaskMemberRemove()

  const onClickRemove = useCallback(
    (member: ISimpleMember) => {
      if (userInTask) {
        ctrl.removeClickAlwaysHide()
        AlertWithOkAndCancel.alert({
          message: '你确定要移除吗？',
          confirmTxt: '移出',
          cancelTxt: '取消',
          color: 'red',
          async onOk() {
            ctrl.addClickAlwaysHide()

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
                ctrl.hide()
              }
            })
          },
          onCancel() {
            ctrl.addClickAlwaysHide()
          }
        })
      } else {
        showMsg({ msgType: '错误', content: '没参与事项不可修改' })
      }
    },
    [ctrl, showMsg, taskId, taskMemberRemove, userInTask]
  )

  return (
    <FlyBasePopper
      showArrow={false}
      placement="bottom"
      controller={ctrl}
      strategy="fixed"
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
    </FlyBasePopper>
  )
}
