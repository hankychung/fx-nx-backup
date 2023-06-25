import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import cs from 'classnames'
import { Tooltip } from 'antd'
import {
  getDate_validity_low_date,
  getScheduleDate,
  MatterTimeSectionType
} from '../../../../utils/getDateText'
import { useMemoizedFn } from 'ahooks'
import alertIcon from '../../../../../../assets/icons/gif/alert.gif'
import { isHighlight } from '../../../../utils/tools'
import dayjs from 'dayjs'
import { getRepeatDelayTotal } from '../../../../utils'
import parentStyle from '../../index.module.scss'
import styles from './index.module.scss'
import { useScheduleStore } from '../../../../../store/useScheduleStore'
import {
  RepeatDelayIcon,
  CycleCardIcon,
  CycleCardDarkIcon
} from '@flyele-nx/icon'
import { loopStuff } from '../../../../utils/loop/loopStuff'
import { useUserInfoStore } from '../../../../../store/useUserInfoStore'

interface IPROPTime {
  taskId: string
  curTime: number // 当前时间, 今天的时间
  isDarkMode?: boolean
  dateStr: string
  onlyRepeat?: boolean
  isSpets?: boolean
}

export const Time: React.FC<IPROPTime> = ({
  taskId,
  curTime,
  isDarkMode = false,
  dateStr,
  onlyRepeat = false,
  isSpets = false
}) => {
  const userId = useUserInfoStore((state) => state.userInfo.user_id)
  const task = useScheduleStore((state) => state.taskDict[taskId])
  const [visible, setVisible] = useState(false)
  // const groupIdCtx = useContext(GroupIdCtx)
  // const memberIdCtx = useContext(MemberIdCtx)
  const [repeatTotal, setRepeatTotal] = useState<number | string>(0)

  const repeatDelayTotal = getRepeatDelayTotal({ rawTask: task, userId })

  const getNowRepeatData = (task: IScheduleTask) => {
    return task.repeat_list?.find?.((v) => v.repeat_id === task?.repeat_id)
  }

  useEffect(() => {
    if (!task?.repeat_type) {
      setRepeatTotal(0)
      return
    }
    loopStuff.getValue(task).then((res) => {
      setRepeatTotal(res.count)
    })
  }, [task])

  const date = useMemo(() => {
    return dayjs(dateStr).unix()
  }, [dateStr])

  const isCreator = useMemo(() => {
    return task.creator_id === userId
  }, [task.creator_id, userId])

  const matterType = useMemo(() => {
    return task.matter_type
  }, [task.matter_type])

  const repeatType = useMemo(() => {
    return task.repeat_type || 0
  }, [task.repeat_type])

  // 时间提醒
  const isToday = useMemo(
    () => (date ? dayjs.unix(date).isSame(dayjs.unix(curTime), 'date') : false),
    [curTime, date]
  )
  const isRemindType = useMemo(() => {
    if (matterType === undefined) return false

    return [
      ScheduleTaskConst.MatterType.timeCollect,
      ScheduleTaskConst.MatterType.calendar,
      ScheduleTaskConst.MatterType.meeting,
      ScheduleTaskConst.MatterType.matter
    ].includes(matterType)
  }, [matterType])

  const isRemind =
    isRemindType && isToday && !task.finish_time && !!isHighlight(task, curTime)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    // 每次进来判断是否在震动，是的话3秒后取消动画
    if (isRemind) {
      timer = setTimeout(() => {
        const icons = document.querySelectorAll(
          '.icon-naozhong'
        ) as NodeListOf<HTMLDivElement>

        ;(Array.from(icons) || []).forEach((icon) => {
          icon.style.animation = 'none'
        })
      }, 3000)
    }
    // 发送给mini临时提醒
    if (isRemind) {
      console.log('@@@ 发送给 今日/月视图 mini临时提醒', isRemind, task)

      // 今日mini窗体提醒
      // ipcRenderer.invoke('vipSmallToolsWin', {
      //   name: VipSmallIpcEvents.REMINDTASK,
      //   task
      // })
      // // 月视图mini窗体提醒
      // ipcRenderer.invoke('vipSmallToolsWinOnly', {
      //   name: VipSmallIpcEvents.REMINDTASK,
      //   task
      // })
      // end
    }

    return () => {
      timer && clearTimeout(timer)
    }
  }, [isRemind, task])

  const { txt, delayTxt } = useMemo(() => {
    // const pathnames = history.location.pathname.split('/')

    // const isTeamSchedule = pathnames.includes('team_schedule')
    const isTeamSchedule = false

    // const isProjectPage =
    //   pathnames.includes('project') && pathnames.includes('detail')

    // const isGroup = location.href.includes('isGroup=1')

    // 是否在项目分组页面里
    // 是否在成员日程 并且 该task是未完成的
    // 是否工作流事项
    if (
      // (isProjectPage && isGroup) ||
      (task.flow_step_id && !task.finish_time) ||
      (isTeamSchedule && !task.finish_time)
    ) {
      if (task.start_time === 0) {
        // 当在事项详情窗口清空时间时，start_time 会等于 0，不处理的话下面函数会返回错误的 1970年 时间
        return { txt: '' }
      }

      let params: MatterTimeSectionType = task

      const target = getNowRepeatData(task)

      if (target) {
        params = target
      }

      const txts = getDate_validity_low_date(params, {
        notToday: true,
        curTime,
        needDelay: isTeamSchedule,
        SameMonth: true
      })

      return {
        txt: txts.output,
        delayTxt: txts.delayTxt
      }
    }

    return getScheduleDate({
      item: task,
      selectDate: date,
      curTime,
      isTeamSchedule
    })
  }, [task, date, curTime])

  const getCycle = useMemoizedFn(() => {
    if (task.cycle) return task.cycle

    return getNowRepeatData(task)?.cycle || 0
  })

  const editTime = useMemoizedFn((e: MouseEvent) => {
    e.stopPropagation()

    // 已完成不可设置时间
    if (task.finish_time) {
      return
    }

    // 无需处理的事项判断自己是否未协作人
    if (
      // 作为创建人可以修改时间
      !isCreator &&
      // ((groupIdCtx && !task.dispatch_id) || memberIdCtx !== userId) &&
      task.matter_type === ScheduleTaskConst.MatterType.matter &&
      !task.takers?.find((taker) => taker.taker_id === userId)
    ) {
      // showMsg({ msgType: '错误', content: '非协作人无法修改时间' })
      return
    }

    let remindAt = {}

    // 项目事项分组里的task没有remind_at
    if (task.remind_at) {
      remindAt = {
        ...task.remind_at,
        start_remind: task.remind_at.start_remind
      }
    }

    console.log('@@ remindAt 后面进入修改', remindAt)
  })

  const getTimerStr = useMemo(() => {
    // 时间区域出现待安排字段时机 双无的事项类型&&非循环&&非工作流
    if (
      !task?.start_time &&
      !task?.start_time &&
      !task?.repeat_type &&
      !task?.flow_step_id
    )
      return '待安排' //新增无时间显示待安排
    return '无时间'
  }, [task.flow_step_id, task.repeat_type, task.start_time])

  const showTxt = useMemo(() => {
    return (
      (txt || getTimerStr) +
      (ScheduleTaskConst.MatterType.calendar === matterType
        ? ' 来自本地日历'
        : '')
    )
  }, [getTimerStr, matterType, txt])

  const tooltipTxt = useMemo(() => {
    if (!repeatType) return showTxt

    const current = getCycle()

    return `${showTxt} 第${current}次 / 共${repeatTotal}次`
  }, [repeatType, showTxt, getCycle, repeatTotal])

  const buildRepeatIcon = useMemo(() => {
    if (repeatDelayTotal) {
      return (
        <div className={styles.repeatDelayTotalBox}>
          <RepeatDelayIcon width="1em" height="1em" />
          <div style={{ marginLeft: '3px' }}>{repeatDelayTotal}</div>
        </div>
      )
    }

    return isDarkMode ? (
      <div className={styles.repeatIcon}>
        <CycleCardDarkIcon width={13} height={13} />
      </div>
    ) : (
      <div className={styles.repeatIcon}>
        <CycleCardIcon width={13} height={13} />
      </div>
    )
  }, [isDarkMode, repeatDelayTotal])

  if (!showTxt && !repeatType) {
    return null
  }

  if (onlyRepeat && !!repeatType) {
    return (
      <div
        className={cs(styles.timeRange, {
          [styles.darkMode]: isDarkMode
        })}
      >
        <div className={cs(styles.scheduleTime, styles.scheduleTimeText)}>
          {buildRepeatIcon}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cs(styles.timeRange, styles.board, parentStyle.needLine, {
        [styles.darkMode]: isDarkMode,
        [styles.isFinish]: task.finish_time,
        [styles.notHover]: isSpets
      })}
      onClick={editTime}
    >
      {/* 补坑 2.1新增时间提醒icon */}
      {isRemind && (
        <div className={styles.timeRemindOIcon}>
          <img src={alertIcon} alt="" />
        </div>
      )}

      {!!delayTxt && <div className={styles.warnText}>{delayTxt}</div>}
      {task.finish_time ? (
        <div className={styles.scheduleTime}>
          <div className={styles.scheduleTimeText}>{showTxt}</div>
          {!!repeatType && buildRepeatIcon}
        </div>
      ) : (
        <Tooltip
          open={visible}
          title={tooltipTxt}
          onOpenChange={(v) => {
            if (v) return
            setVisible(v)
          }}
        >
          <div
            onMouseEnter={(event) => {
              const ev = event.target as HTMLElement
              const ev_parentElement = ev.parentElement?.parentElement
              const ev_weight = ev_parentElement?.scrollWidth ?? 0 // 文本的实际宽度
              const content_weight = ev_parentElement?.clientWidth ?? 0 // 文本的可视宽度

              // 2.1 PC-4797 当时间显示不完整且为循环事项时，弹气泡
              setVisible(() => !!task.repeat_type || ev_weight > content_weight)
            }}
            className={styles.scheduleTime}
          >
            <div className={styles.scheduleTimeText}>{showTxt}</div>
            {!!repeatType && buildRepeatIcon}
          </div>
        </Tooltip>
      )}
    </div>
  )
}
