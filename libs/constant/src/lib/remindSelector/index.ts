import { RemindConfig, RemindConfigMeeting, ValidRuleType } from './model'

export const MAX_CUSTOM_REMIND_TOTAL = 5
export const DEFAULT_CUSTOM_REMIND_TOTAL = 5 // 1

export const matterRule: ValidRuleType<'matter'>[] = [
  'start_time',
  'start_no_remind',
  'all_day',
  'end_time',
  'end_no_remind',
  'end_all_day'
]

export const defaultSelector: RemindConfig = {
  startRemind: [
    {
      key: 'start_0',
      CName: '开始时提醒',
      timeOffSet: 0,
      validRule: 'start_time'
    },
    {
      key: 'start_15',
      CName: '开始前15分钟提醒',
      timeOffSet: 15 * 60,
      validRule: 'start_time'
    },
    {
      key: 'start_60',
      CName: '开始前1小时提醒',
      timeOffSet: 60 * 60,
      validRule: 'start_time'
    },
    // 1.7优化
    {
      key: 'start_3_hour',
      CName: '开始前3小时提醒',
      timeOffSet: 60 * 60 * 3,
      validRule: 'start_time'
    },
    // 全天事项
    {
      key: 'all_before_1_day_9_00',
      CName: '开始前一天9:00提醒',
      curCName: '提前一天9:00提醒',
      timeOffSet: -1090,
      validRule: 'all_day'
    },
    {
      key: 'all_day_9_00',
      CName: '开始当天9:00提醒',
      curCName: '当天9:00提醒',
      timeOffSet: -90,
      validRule: 'all_day'
    },
    {
      key: 'all_day_18_00',
      CName: '开始当天18:00提醒',
      curCName: '当天18:00提醒',
      timeOffSet: -18,
      validRule: 'all_day'
    },
    {
      key: 'start_no_remind',
      CName: '开始不提醒',
      curCName: '不提醒',
      timeOffSet: -1,
      validRule: 'start_no_remind',
      show: false // 是否显示到界面上（from: v.17）, v1.7把不提醒归类到一个按钮上了
    }
  ],
  endRemind: [
    { key: 'end_0', CName: '截止时提醒', timeOffSet: 0, validRule: 'end_time' },
    {
      key: 'end_15',
      CName: '截止前15分钟提醒',
      timeOffSet: 15 * 60,
      validRule: 'end_time'
    },
    {
      key: 'end_60',
      CName: '截止前1小时提醒',
      timeOffSet: 60 * 60,
      validRule: 'end_time'
    },
    // 1.7优化
    {
      key: 'end_3_hour',
      CName: '截止前3小时提醒',
      timeOffSet: 60 * 60 * 3,
      validRule: 'end_time'
    },
    // 全天事项
    {
      key: 'endall_before_1_day_9_00',
      CName: '截止前一天9:00提醒',
      timeOffSet: -1090,
      validRule: 'end_all_day'
    },
    {
      key: 'endall_day_9_00',
      CName: '截止当天9:00提醒',
      timeOffSet: -90,
      validRule: 'end_all_day'
    },
    {
      key: 'endall_day_18_00',
      CName: '截止当天18:00提醒',
      timeOffSet: -18,
      validRule: 'end_all_day'
    },
    {
      key: 'end_no_remind',
      CName: '截止不提醒',
      curCName: '不提醒',
      timeOffSet: -1,
      validRule: 'end_no_remind',
      show: false // 是否显示到界面上（from: v.17）, v1.7把不提醒归类到一个按钮上了
    }
  ]
}

export const MeetingDefaultSelector: RemindConfigMeeting = {
  startRemind: [
    {
      key: 'meeting_start_0',
      CName: '准点提醒',
      timeOffSet: 0,
      validRule: 'meeting_start'
    },
    {
      key: 'meeting_start_5',
      CName: '会前5分钟提醒',
      timeOffSet: 5 * 60,
      validRule: 'meeting_start'
    },

    {
      key: 'meeting_start_15',
      CName: '会前15分钟提醒',
      timeOffSet: 15 * 60,
      validRule: 'meeting_start'
    }
  ],
  endRemind: []
}

export const defaultCustomTotalList = [
  {
    tip: '自定义提醒',
    totalTxt: '1个',
    total: DEFAULT_CUSTOM_REMIND_TOTAL,
    checked: true
  },
  {
    tip: '自定义提醒',
    totalTxt: '5个',
    total: MAX_CUSTOM_REMIND_TOTAL,
    checked: false
  }
]
