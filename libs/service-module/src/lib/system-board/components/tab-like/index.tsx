import React, { FC } from 'react'
import cs from 'classnames'
// import { useTimeTip } from 'hooks/useTimeTip'
// import createToolWin from 'utils/createSmallToolsWin'
// import { useHeatIcon } from 'hooks/useHeatIcon'
// import { getDataset } from 'hooks/useFollow'

import { FlyTextTooltip } from '@flyele/flyele-components'
import style from './index.module.scss'
import Takers from '../takers'
// import { useMessage } from '@flyele-nx/ui'
import { RepeatIcon } from '@flyele-nx/icon'
import { IDashboardItem, IScheduleTask } from '@flyele-nx/types'
import { convertToTask } from '../../utils'
import { StatusBox } from '../../../status-box'

interface IProps {
  item: IDashboardItem
}

export const Item: FC<React.PropsWithChildren<IProps>> = ({ item }) => {
  // const userId = useUserInfoStore.getState().userInfo.user_id

  // const [showMsg] = useMessage()

  // const { txt, delayTxt } = useTimeTip(item)
  const txt = 'txt',
    delayTxt = '延期一天'

  // const { icon } = useHeatIcon(item)
  const icon = ''

  return (
    <div
      className={cs(style.item, 'schedule-item')}
      // {...getDataset(item)}
      onClick={() => {
        // TODO: createToolWin
        console.log('createToolWin')
        // createToolWin({
        //   ref_id: item.task_id,
        //   matter_type: item.matter_type,
        //   from: "今日看板"
        // })
      }}
    >
      <div className={style.lft} style={txt ? {} : { alignItems: 'center' }}>
        {/* <div className={cs(style.lft__order, 'bold')}>{idx}</div> */}

        <div onClick={(e) => e.stopPropagation()}>
          <StatusBox task={convertToTask(item)} />
        </div>

        <div className={style.info}>
          <div className={style.info__title}>
            <FlyTextTooltip strategy="fixed" text={item.title} />
          </div>
          {(!!txt || item.repeat_type) && (
            <div className={style.time}>
              {!!delayTxt && !item.finish_time && (
                <span className={style.delay}>{delayTxt}</span>
              )}
              <span style={{ marginRight: '5px' }}>{txt}</span>
              {/* {!!item.repeat_type && <Icon iconClass="shixiangxunhuan" />} */}
              {!!item.repeat_type && <RepeatIcon />}
            </div>
          )}
        </div>
      </div>

      <div className={style.rgt}>
        <Takers takers={item.takers} />
        {/* {!!icon && <img src={icon} alt="" className={style.icon} />} */}
        <img
          src={icon}
          alt=""
          className={style.icon}
          style={{ opacity: !icon ? 0 : 1 }}
        />
      </div>
    </div>
  )
}
