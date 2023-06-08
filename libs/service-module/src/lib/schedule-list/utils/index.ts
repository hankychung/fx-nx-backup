import { IScheduleTask, ScheduleTaskConst } from '@flyele-nx/service'
import { getNowRepeatData, getRepeatTotal, isAlwaysRepeat } from './loopMatter'
import dayjs from 'dayjs'

function getKey(i: Pick<IScheduleTask, 'ref_task_id' | 'repeat_id'>) {
  return `${i.ref_task_id}-${i.repeat_id || ''}`
}

function getParentsCount(task: Pick<IScheduleTask, 'parent_id'>) {
  const { parent_id } = task

  if (!parent_id) return 0

  return parent_id.split(',').length
}

/**
 * 直属关系字典
 */
function getChildrenDict({
  tasks,
  childHandler,
  originalId
}: {
  tasks: IScheduleTask[]
  originalId: string
  childHandler?: (child: IScheduleTask) => void
}) {
  const dict: {
    [k: string]: string[]
  } = {}

  // 潜在父事项id字典
  const parentKey: { [k: string]: boolean } = { [originalId]: true }

  tasks
    .sort((a, b) => getParentsCount(a) - getParentsCount(b))
    .forEach((task) => {
      if (childHandler) {
        childHandler(task)
      }

      const { parent_id, ref_task_id } = task

      parentKey[ref_task_id] = true

      if (parent_id) {
        const parentIds = parent_id.split(',').reverse()

        for (const parentId of parentIds) {
          if (parentKey[parentId]) {
            if (!dict[parentId]) dict[parentId] = []

            dict[parentId].push(ref_task_id)

            return
          }
        }
      }
    })

  return dict
}

const getRepeatTxt = async (task?: IScheduleTask) => {
  const _obj = {
    t_l: '',
    t_r: ''
  }

  if (!task) return _obj

  const { cycle, repeat_type, end_repeat_at } = task

  if (repeat_type) {
    _obj.t_l = `${ScheduleTaskConst.LOOP_MATTER_LABEL[repeat_type as number]}`

    if (isAlwaysRepeat(end_repeat_at || 0)) {
      _obj.t_l += '、一直循环'
    } else {
      const YYYY =
        dayjs.unix(end_repeat_at || 0).format('YYYY') !== dayjs().format('YYYY')
      const M_DD = dayjs.unix(end_repeat_at || 0).format('M月DD日')

      _obj.t_l += `、${
        YYYY ? dayjs.unix(end_repeat_at || 0).format('YYYY年') : ''
      }${M_DD}截止`
    }

    _obj.t_r = `已循环（${
      cycle || getNowRepeatData(task)?.cycle || 0
    }/${await getRepeatTotal(task)}）`
  }
  return _obj
}

export { getKey, getChildrenDict, getRepeatTxt }
