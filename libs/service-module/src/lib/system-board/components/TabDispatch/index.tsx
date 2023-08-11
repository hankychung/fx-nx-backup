import React, { FC } from 'react'
// import { IDashboardItem } from 'service/types/matter'
// import { useHeatIcon } from 'hooks/useHeatIcon'
import { Button } from 'antd'
// import {
//   WorkflowMemberInfoBar,
//   WorkflowStep,
// } from '@/components/WorkflowSlider/WorkFlowStep'
// import { WorkflowSlider } from '@/components/WorkflowSlider'

import { FlyBasePopper } from '@flyele/flyele-components'
import style from './index.module.scss'
import CompleteItem from '../CompleteItem'
import { IDashboardItem } from '@flyele-nx/types'

interface Props {
  item: IDashboardItem
}

export const Item: FC<React.PropsWithChildren<Props>> = ({ item }) => {
  // const { icon } = useHeatIcon(item)
  const icon = ''

  return (
    <CompleteItem
      item={item}
      handleClick={() => {
        console.log('createToolWin')
        // createToolWin({
        //   ref_id: item.task_id,
        //   matter_type: item.matter_type,
        //   cycle: item?.cycle,
        //   from: Enter_page.今日看板
        // })
      }}
    >
      <div className={style.progress}>
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <FlyBasePopper
            placement="auto"
            strategy="fixed"
            trigger="hover"
            showArrow={false}
            content={() => {
              return (
                // <WorkflowStepsDisplayer
                //   currentStepId={item.flow_step_id}
                //   taskId={item.task_id}
                //   forceSmallWidth
                // />
                <div>TODO: </div>
              )
            }}
          >
            <Button size="small" className={style.stepBt} type="primary">
              {item.flow_step_name}
            </Button>
          </FlyBasePopper>
        </div>
        {/* TODO: StatusBar */}
        {/* {item.flow_step_name && item.flow_step_id ? (
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <FlyBasePopper
                placement="auto"
                strategy="fixed"
                trigger="hover"
                showArrow={false}
                content={() => {
                  return (
                    <WorkflowStepsDisplayer
                      currentStepId={item.flow_step_id}
                      taskId={item.task_id}
                      forceSmallWidth
                    />
                  )
                }}
              >
                <Button size="small" className={style.stepBt} type="primary">
                  {item.flow_step_name}
                </Button>
              </FlyBasePopper>
            </div>
          ) : (
            <StatusBar
              isCircleProgress
              task={item as FullViewTaskModel}
              onlyHover
            />
          )} */}

        <img src={icon} alt="" style={{ opacity: !icon ? 0 : 1 }} />
      </div>
    </CompleteItem>
  )
}
