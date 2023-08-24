/**
 author: william   email:362661044@qq.com
 create_at:2022/3/17 下午 4:55
 **/
// 考虑兼容性 不用 enum
export type RemindType = 'matter' | 'meeting' | 'all'
// 分类
export type RemindClassify = 'start' | 'end' | 'all' | RemindType

/*********************************** rule key ************************************/
export type startRuleKey = 'start_time' | 'all_day' | 'start_no_remind'
export type endRuleKey = 'end_time' | 'end_all_day' | 'end_no_remind'
export type meetingRuleKey = 'meeting_start'

export type ValidRuleType<T extends RemindClassify> = [T] extends ['start']
  ? startRuleKey
  : [T] extends ['end']
  ? endRuleKey
  : [T] extends ['meeting']
  ? meetingRuleKey
  : [T] extends ['matter']
  ? startRuleKey | endRuleKey
  : startRuleKey | endRuleKey | meetingRuleKey

/*********************************** 值key ************************************/
type startKeyType =
  | 'start_0'
  | 'start_15'
  | 'start_60'
  | 'start_3_hour'
  | 'all_before_1_day_9_00'
  | 'all_day_9_00'
  | 'all_day_18_00'
  | 'start_no_remind'

type endKeyType =
  | 'end_0'
  | 'end_15'
  | 'end_60'
  | 'end_3_hour'
  | 'endall_before_1_day_9_00'
  | 'endall_day_9_00'
  | 'endall_day_18_00'
  | 'end_no_remind'

type meetingKeyType = 'meeting_start_0' | 'meeting_start_5' | 'meeting_start_15'

export type RemindKeyType<T extends RemindClassify> = [T] extends ['start']
  ? startKeyType
  : [T] extends ['end']
  ? endKeyType
  : [T] extends ['matter']
  ? startKeyType | meetingKeyType
  : [T] extends ['meeting']
  ? meetingKeyType
  : startKeyType | endKeyType | meetingKeyType

export type MatterRemindList = [
  RemindKeyType<'start'>[],
  RemindKeyType<'end'>[]
]

export type MeetingRemindList = [RemindKeyType<'meeting'>[], Array<any>]

/*********************************** item ************************************/

export type RemindItemType<T extends RemindClassify> = {
  key: RemindKeyType<T>
  CName: string
  curCName?: string
  timeOffSet: number
  validRule: ValidRuleType<T>
  show?: false
}

export type RemindConfig = {
  startRemind: Array<RemindItemType<'start'>>
  endRemind: Array<RemindItemType<'end'>>
}

export type RemindConfigMeeting = {
  startRemind: Array<RemindItemType<'meeting'>>
  endRemind: []
}
