import { IScheduleTask } from '@flyele-nx/service'

export interface ILocalTask extends IScheduleTask {
  fromExecuate?: boolean
}
