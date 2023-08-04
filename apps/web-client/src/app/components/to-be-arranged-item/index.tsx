import React, { FC, useEffect, useState } from 'react'
import { FlyAvatarGroup, FlyTextTooltip } from '@flyele/flyele-components'
import cs from 'classnames'
import style from './index.module.scss'
import { StatusBox } from '@flyele-nx/service-module'
import { IDashboardItem } from '@flyele-nx/types'
// const unfinishedState = [10301, 10402]

interface Props {
  item: IDashboardItem
  handleClick: () => void
}

const ToBeArrangedItem: FC<Props> = ({ item, handleClick }) => {
  const [showTimeSelector, setShowTimeSelector] = useState(false)
  // const [needChooseTime, setNeedChooseTime] = useState(true)
  // const { getAvatar } = useInteractsInfo()
  const [sortedTakersList, setSortedTakersList] = useState([])

  /**
   * 获取头像
   */
  // const avatars = useMemo(() => {
  //   // TODO 缺少排序相关字段，届时需要使用bizUtils.sortTaker排序
  //   return (item.takers ?? []).map((i: any) => ({
  //     ...i,
  //     src: getAvatar(i.taker_id),
  //   }))
  // }, [item.takers, getAvatar])

  // 协作人展示排序
  // useEffect(() => {
  //   const avatars = (item.takers ?? []).map((i: any) => ({
  //     ...i,
  //   }))

  //   // bizUtils.sortTaker(avatars).then((res) => {
  //   //   setSortedTakersList(res)
  //   // })
  // }, [getAvatar, item.takers])

  return (
    <div
      className={cs(
        style.complete,
        { [style.completeHover]: showTimeSelector },
        'schedule-item'
      )}
      // {...getDataset(item)}
      onClick={() => {
        if (showTimeSelector) return //时间提醒开启状态不允许跳转
        handleClick()
      }} // 提到这个地方触发，不然在行内上下有 10px 的空白区域是点击不了的
    >
      <div className={style.lft}>
        <div>
          <StatusBox task={item as any} />
        </div>

        <div className={style.info}>
          <div className={style.info__title}>
            <FlyTextTooltip strategy="fixed" text={item.title} />
          </div>
        </div>
      </div>
      <div className={style.rgt}>
        <div
          className={cs(style.time, { [style.timeOpacity]: !showTimeSelector })}
          onClick={(e) => {
            e.stopPropagation()

            setShowTimeSelector(true)
          }}
        >
          {/* <img width="17px" src={timeicon} alt="" /> */}
          <i className={cs(style.time_icon, 'iconfont icon-shijian')} />
        </div>
        <div className={style.avatar}>
          <FlyAvatarGroup list={sortedTakersList} />
        </div>
      </div>
      {/*  */}
      {/* <ComposeMatterTimeAndExecuteTime
        show={showTimeSelector}
        onClose={() => setShowTimeSelector(false)}
        task={taskTime}
        dispatch_id={item.dispatch_id}
        onUpdateMatterTimeSuc={() => updateRouter()}
        needShake
      /> */}
      {/*  */}
    </div>
  )
}

export default ToBeArrangedItem
