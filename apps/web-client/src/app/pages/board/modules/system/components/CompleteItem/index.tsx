import React, { FC } from 'react'
import cs from 'classnames'
import { FlyTextTooltip } from '@flyele/flyele-components'
import style from './index.module.scss'
import { IDashboardItem, IScheduleTask } from '@flyele-nx/types'
import { useTimeTip } from '@flyele-nx/utils'
import { StatusBox } from '@flyele-nx/service-module'
import { RepeatIcon } from '@flyele-nx/icon'
// const unfinishedState = [10301, 10402]

interface Props {
  item: IDashboardItem
  handleClick: () => void
}

const CompleteItem: FC<React.PropsWithChildren<Props>> = ({
  item,
  children,
  handleClick
}) => {
  const { txt, delayTxt } = useTimeTip(item)

  return (
    <div
      className={cs(style.complete, 'schedule-item')}
      // {...getDataset(item)}
      onClick={handleClick} // 提到这个地方触发，不然在行内上下有 10px 的空白区域是点击不了的
    >
      <div className={style.lft}>
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={cs({ [style.check]: item.flow_step_id })}
        >
          <StatusBox task={item as unknown as IScheduleTask} />
          {/* {item.flow_step_id && item.task_id ? (
            <WorkflowOperation
              creator_id={item.creator_id}
              taskId={item.task_id}
              curStepId={item.flow_step_id}
              size={14}
              complete_at={item.complete_at}
              status={getOperationStatus(item)}
            />
          ) : (
            <CompleteBox
              item={convertItem}
              complete={async () => {
                if (item.cycle && !item.repeat_type && item.finish_time) {
                  showMsg({
                    msgType: '消息',
                    content: '循环已取消, 不支持再次打开'
                  })
                  return
                }

                const entrance = enterPage || CreateMatterEnterPath.schedule_day

                handleCompleteTask(convertItem, entrance)
                  .then((state) => {
                    if (item.cycle && !item?.finish_time && item.repeat_type) {
                      showMsg({
                        msgType: '成功',
                        content: `你已完成第${item.cycle}次循环`
                      })
                    }

                    item.state = state
                  })
                  .catch((e) => {
                    console.error('完成事项错误', e)
                  })
              }}
            />
          )} */}
        </div>

        <div className={style.info}>
          <div
            className={style.info__title}
            style={item.finish_time ? { color: '#b4b4b4' } : {}}
          >
            <FlyTextTooltip strategy="fixed" text={item.title} />
          </div>
          {(!!txt || item.repeat_type) && (
            <div className={style.time}>
              {!!delayTxt && !item.finish_time && (
                <span className={style.warn}>{delayTxt}</span>
              )}
              <span className={style.txt} style={{ marginRight: '5px' }}>
                {txt}
              </span>
              {!!item.repeat_type && (
                <RepeatIcon className={style.icon} />
                // <Icon svgClassName={style.icon} iconClass="shixiangxunhuan" />
              )}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default CompleteItem
