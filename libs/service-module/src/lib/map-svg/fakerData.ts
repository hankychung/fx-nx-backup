import { TargetLevel, TargetStatus } from './type/target'

interface FakerDataType {
  objective_id: string
  title: string
  state: TargetStatus
  schedule: number
  level: TargetLevel
  children: FakerDataType[]
  superiors: FakerDataType[]
  superior_total: number
  child_toast: number
}

export const FakerData: FakerDataType[] = [
  {
    objective_id: '123123',
    title: '目标1',
    state: TargetStatus.normal,
    schedule: 100,
    level: TargetLevel.personal,
    children: [],
    superiors: [],
    superior_total: 5,
    child_toast: 5
  },
  {
    objective_id: '123',
    title: '目标2',
    state: TargetStatus.normal,
    schedule: 5000,
    level: TargetLevel.company,
    children: [],
    superiors: [],
    superior_total: 5,
    child_toast: 5
  },
  {
    objective_id: '123121',
    title: '目标3',
    state: TargetStatus.normal,
    schedule: 7000,
    level: TargetLevel.part,
    children: [],
    superiors: [],
    superior_total: 5,
    child_toast: 5
  },
  {
    objective_id: '1233',
    title: '目标4',
    state: TargetStatus.normal,
    schedule: 8000,
    level: TargetLevel.part,
    children: [],
    superiors: [],
    superior_total: 5,
    child_toast: 5
  },
  {
    objective_id: '23',
    title: '目标5',
    state: TargetStatus.normal,
    schedule: 9000,
    level: TargetLevel.part,
    children: [],
    superiors: [],
    superior_total: 5,
    child_toast: 5
  }
]
