import React from 'react'
import cs from 'classnames'

import style from './index.module.scss'
import { ICustomDashboardItem } from '@flyele-nx/types'
import { FlyTextTooltip } from '@flyele/flyele-components'
import { RepeatIcon } from '@flyele-nx/icon'
import { StatusBox } from '../../../status-box'

interface Props {
  item: ICustomDashboardItem
}

const Item: React.FC<React.PropsWithChildren<Props>> = ({ item }) => {
  const openSmallTool = () => {
    // TODO: 打开详情
    // createSmallToolsWin({
    //   ref_id: item.task_id,
    //   matter_type: item.matter_type,
    //   from: Enter_page.今日看板,
    //   cycle: item.cycle,
    // })
  }

  return (
    <div
      className={cs(style.item_wrap, 'schedule-item')}
      onClick={openSmallTool}
    >
      <div className={style.left_box}>
        <div
          style={{
            width: 14,
            height: 14,
            alignItems: 'center',
            marginRight: 10,
            display: 'flex'
          }}
          onClick={(e) => {
            // 防止冒泡
            e.stopPropagation()
          }}
        >
          <StatusBox task={{ ...item, ref_task_id: item.task_id }} />
        </div>
        <div
          className={cs(style.title, {
            [style.finished]: item.biz.time_state === 6
          })}
        >
          <div
            style={{
              display: 'inline-block',
              // maxWidth: 'calc(100% - 20px)',
              maxWidth: `calc(100% - ${item.repeat_type ? 20 : 0}px)`,
              verticalAlign: 'middle'
            }}
          >
            <div>
              <FlyTextTooltip text={item.title} strategy="fixed" />
            </div>
          </div>
          {/* {item.title} */}

          {item.repeat_type && <RepeatIcon className={style.loop_icon} />}
        </div>
      </div>
      <div
        className={cs(style.status, {
          [style.finished]: item.biz.time_state === 6,
          [style.delay]: item.biz.time_state === 5
        })}
      >
        {item.biz.time_str}
      </div>
    </div>
  )
}

export default Item
