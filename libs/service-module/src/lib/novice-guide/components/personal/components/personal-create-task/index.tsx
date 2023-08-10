import React, { useState } from 'react'
import { CommonPage } from '../../../common/page'
import { useMemoizedFn } from 'ahooks'
import styles from './index.module.scss'
import { Input, message } from 'antd'
import { AddIcon } from '@flyele-nx/icon'
import cs from 'classnames'
import { FlowOperateType, MatterType, QuadrantValue } from '@flyele-nx/constant'
import { TaskApi } from '@flyele-nx/service'
import { IBatchCreateParams, ICreateParams } from '@flyele-nx/types'
import dayjs from 'dayjs'

interface ITaskOnlyTitle {
  title: string
}

const _PersonalCreateTask = ({
  visible,
  goBack,
  onFinished
}: {
  visible: boolean
  goBack: () => void
  onFinished?: () => void
}) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<ITaskOnlyTitle[]>([
    { title: '' },
    { title: '' }
  ])

  const addMoreTask = useMemoizedFn(() => {
    if (tasks.length >= 20) {
      messageApi.open({
        type: 'error',
        content: '新手引导最多创建20个事项'
      })
      return
    }
    setTasks((prevTasks) => [...prevTasks, { title: '' }])
  })

  const getTaskParams = (data: ITaskOnlyTitle[]): IBatchCreateParams[] => {
    const tasksWithValues = data.filter((task) => task.title !== '')
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
    console.log('@@ goNext tasks', tasks)
    if (loading) return
    setLoading(true)
    try {
      const taskParams = getTaskParams(tasks)
      await TaskApi.batchCreateTask({
        tasks: taskParams
      })

      onFinished && onFinished()
    } catch (e) {
      console.log('创建事项失败', e)
    } finally {
      setLoading(false)
    }
  })

  return (
    <CommonPage
      visible={visible}
      title="你接下来一周要做哪些事情？"
      desc=""
      goBack={goBack}
      goNext={goNext}
      loadingNext={loading}
      nextBtnText="开始使用"
    >
      {contextHolder}
      <div className={styles.personalCreateTaskRoot}>
        {tasks.map((task, index) => (
          <div key={index} className={styles.itemBox}>
            <div className={styles.no}>{index + 1}、</div>
            <Input
              placeholder="请输入任务名称"
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
            />
          </div>
        ))}
        <div className={cs(styles.itemBox, styles.more)} onClick={addMoreTask}>
          <div className={styles.addIcon}>
            <AddIcon width={10} height={10} color="#B4B4B4" />
          </div>
          更多任务
        </div>
      </div>
    </CommonPage>
  )
}

export const PersonalCreateTask = React.memo(_PersonalCreateTask)
