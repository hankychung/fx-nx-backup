import React, { FC } from 'react'
import cs from 'classnames'
import { FlyTextTooltip } from '@flyele/flyele-components'
import style from './index.module.scss'
import { IDashboardItem } from '@flyele-nx/types'
import { useTimeTip } from '@flyele-nx/utils'
import { StatusBox } from '@flyele-nx/service-module'
import { RepeatIcon } from '@flyele-nx/icon'
import { convertToTask } from '../../utils'
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
          <StatusBox task={convertToTask(item)} />
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
