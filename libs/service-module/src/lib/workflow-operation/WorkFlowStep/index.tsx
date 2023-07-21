import React, { useMemo } from 'react'
import cs from 'classnames'
import { FlyAvatarGroup, FlyTooltip } from '@flyele/flyele-components'
import style from './index.module.scss'
import { IUserStepInfo, WorkflowConst } from '@flyele-nx/service'
import { WorkflowMemberIcon } from '../WorkflowMemberIcon'
import { LineIcon, UndoGrayIcon } from '@flyele-nx/icon'
import { useContactStore } from '../../store/useContactStore'

const { FlowOperateType } = WorkflowConst

export enum OperateStep {
  START = 'START',
  CUR = 'CUR',
  NEXT = 'NEXT',
  PRE = 'PRE',
  DONE = 'DONE'
}

// const dict = {
//   [OperateStep.START]: '',
//   [OperateStep.CUR]: '当前步骤',
//   [OperateStep.PRE]: '上一步',
//   [OperateStep.NEXT]: '下一步',
//   [OperateStep.DONE]: '',
// }

export interface IStepItem {
  idx: number
  title: string
  step: OperateStep
  members?: IUserStepInfo[]
  isLastStep?: boolean
  //协作人操作方式：1.或；2.且
  operateType?: WorkflowConst.FlowOperateType
}

type IProps = IStepItem & {
  handleClick: () => void
}

const _WorkFlowStep: React.FC<IProps> = ({
  idx,
  title,
  step,
  handleClick,
  members,
  operateType
}) => {
  const isDone = useMemo(() => step === OperateStep.DONE, [step])
  const isOr = useMemo(() => operateType === FlowOperateType.OR, [operateType])
  const { contactDict } = useContactStore()

  /**
   * 固定协作人排最前
   * **/
  const _members = useMemo(() => {
    if (!members) return []
    return members
      .map((item) => {
        const info = contactDict[item.user_id]

        return {
          src: info?.avatar || '',
          userId: item.user_id,
          isLock: item.is_lock,
          name: info?.nick_name || info?.original_name || '',
          isComplete: !!item.complete_at,
          isBack: item.is_back,
          isRemoved: !!item.removed_at
        }
      })
      .sort((item) => {
        return item.isLock ? -1 : 1
      })
  }, [members, contactDict])

  return (
    <div
      className={style.container}
      onClick={(e) => {
        e.stopPropagation()
        handleClick()
      }}
    >
      <div className={style['badage-wrapper']}>
        <div
          className={cs(style.badage, {
            [style['badage-done']]: isDone,
            [style['badage-current']]: step === OperateStep.CUR
          })}
        >
          {idx}
        </div>
        {!isDone && <LineIcon className={style.line} />}
      </div>
      <div
        className={cs(style['right-box'], {
          //  [style.noCurrent]: step !== OperateStep.CUR,
        })}
      >
        <div className={style['txt-box']}>
          <div
            className={cs(style.txt, 'bold', { [style['txt-done']]: isDone })}
          >
            {title}
          </div>
          <span className={cs(style.logic, { [style['logic-or']]: isOr })}>
            {isOr ? '或' : '且'}
          </span>
        </div>
        <FlyAvatarGroup
          list={_members}
          inOneRow
          avatarSize={20}
          shiftingWidth={4}
          max={5}
          renderItem={(item) => {
            const {
              src,
              isLock,
              canRemove,
              userId,
              isComplete,
              isBack,
              isRemoved,
              name
            } = item

            return (
              <div
                className={style.avatar}
                style={{ backgroundImage: `url(${src})` }}
              >
                <FlyTooltip text={name} trigger="hover" zIndex={10000}>
                  <div className={style.iconWrap}>
                    <WorkflowMemberIcon
                      avatar={src}
                      isLock={isLock}
                      canRemove={canRemove}
                      userId={userId}
                      isComplete={isComplete}
                      isBack={isBack}
                      isRemoved={isRemoved}
                    />
                  </div>
                </FlyTooltip>
              </div>
            )
          }}
        />
        {/* {dict[step] && <div className={style.subtitle}>{dict[step]}</div>} */}
      </div>
      {step === OperateStep.PRE && (
        <FlyTooltip
          zIndex={10000}
          needInheritSize={false}
          text="返回到该步骤"
          trigger="hover"
        >
          <UndoGrayIcon className={style.back} />
        </FlyTooltip>
      )}
      {step === OperateStep.CUR && <div className={style['box-current']} />}
      {step === OperateStep.NEXT && <div className={style['box-next']} />}
    </div>
  )
}

export const WorkFlowStep = React.memo(_WorkFlowStep)
