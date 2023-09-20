import { I18N } from '@flyele-nx/i18n'
import React, { useEffect, useRef, useState } from 'react'
import { CommonPage } from '../../../common/page'
import { useMemoizedFn, useUpdateEffect } from 'ahooks'
import styles from './index.module.scss'
import { Input } from 'antd'
import type { InputRef } from 'antd'
import { AddIcon } from '@flyele-nx/icon'
import cs from 'classnames'
import { FlowOperateType, MatterType, QuadrantValue } from '@flyele-nx/constant'
import { TaskApi } from '@flyele-nx/service'
import { IBatchCreateParams } from '@flyele-nx/types'
import dayjs from 'dayjs'
import { globalNxController } from '@flyele-nx/global-processor'

interface ITaskOnlyTitle {
  title: string
}

const _PersonalCreateTask = ({
  visible,
  goBack,
  onFinished,
  onGoHome
}: {
  visible: boolean
  goBack: () => void
  onFinished?: () => void
  onGoHome?: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<ITaskOnlyTitle[]>([
    { title: '' },
    { title: '' }
  ])
  const inputRefList = useRef<InputRef[]>([])

  const addMoreTask = useMemoizedFn(() => {
    if (tasks.length >= 20) {
      globalNxController.showMsg({
        msgType: '错误',
        content: I18N.common.noviceGuide
      })
      return
    }
    setTasks((prevTasks) => [...prevTasks, { title: '' }])
  })

  const getTaskParams = (data: ITaskOnlyTitle[]): IBatchCreateParams[] => {
    const tasksWithValues = data.filter((task) => task.title.trim() !== '')
    return tasksWithValues.map((item, index) => {
      return {
        temp_id: `task${index}`,
        title: item.title,
        matter_type: MatterType.matter,
        priority_level: QuadrantValue.no_important_no_urgent,
        repeat_type: 0,
        is_dispatch: 0,
        operate_type: FlowOperateType.AND,
        start_time_full_day: 2,
        start_time: dayjs().startOf('day').unix(),
        end_time: dayjs().endOf('day').unix(),
        end_time_full_day: 2,
        widget: {
          execute_addr: false,
          remind: true,
          repeat: true,
          time: true
        }
      }
    })
  }

  const goNext = useMemoizedFn(async () => {
    if (loading) return
    setLoading(true)

    try {
      const taskParams = getTaskParams(tasks)
      if (taskParams.length) {
        await TaskApi.batchCreateTask({
          tasks: taskParams
        })
      }

      onFinished && onFinished()
      onGoHome && onGoHome()
    } catch (e) {
      console.log('创建事项失败', e)
    } finally {
      setLoading(false)
    }
  })

  const onPressEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (inputRefList.current[index + 1]) {
      inputRefList.current[index + 1].focus()
    } else {
      addMoreTask()
    }
  }

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRefList.current[0]?.focus()
      }, 800)
    }
  }, [visible])

  useUpdateEffect(() => {
    const length = tasks.length
    if (length) {
      inputRefList.current[length - 1]?.focus()
    }
  }, [tasks.length])

  return (
    <CommonPage
      visible={visible}
      title={I18N.common.yourNextStep}
      desc=""
      goBack={goBack}
      goNext={goNext}
      loadingNext={loading}
      nextBtnText={I18N.common.gettingStarted}
    >
      <div className={styles.personalCreateTaskRoot}>
        {tasks.map((task, index) => (
          <div key={index} className={styles.itemBox}>
            <div className={styles.no}>{index + 1}、</div>
            <Input
              ref={(ref) => ref && (inputRefList.current[index] = ref)}
              placeholder={I18N.common.pleaseEnterATask}
              value={task.title}
              onChange={(e) => {
                const updatedTasks = [...tasks]
                updatedTasks[index].title = e.target.value
                setTasks(updatedTasks)
              }}
              bordered={false}
              maxLength={300}
              style={{
                fontSize: '16px'
              }}
              onPressEnter={(e) => {
                onPressEnter(e, index)
              }}
            />
          </div>
        ))}
        <div className={cs(styles.itemBox, styles.more)} onClick={addMoreTask}>
          <div className={styles.addIcon}>
            <AddIcon width={10} height={10} color="#B4B4B4" />
          </div>
          {I18N.common.moreTasks}
        </div>
      </div>
    </CommonPage>
  )
}

export const PersonalCreateTask = React.memo(_PersonalCreateTask)
