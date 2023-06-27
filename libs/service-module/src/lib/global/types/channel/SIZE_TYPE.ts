export enum SIZE_TYPE_KEY {
  时间选择 = 'time-selector',
  会议的时间选择 = 'meeting-time-selector',
  提醒时间选择 = 'remind-selector',
  文件选择器 = 'file-selector',
  确认弹窗 = 'model-selector',
  邀请协作人 = 'invite_taker',
  多端提醒 = 'reminder_multiend',
  续费弹窗 = 'pay_modal'
}

export interface ISize {
  w: number
  h: number
}

export const SIZE_CHOICE: { [key: string]: ISize } = {
  [SIZE_TYPE_KEY.时间选择]: {
    w: 375 + 20,
    h: 663
  },
  [SIZE_TYPE_KEY.提醒时间选择]: {
    w: 340, // w: 350,
    h: 680
  },
  [SIZE_TYPE_KEY.会议的时间选择]: {
    w: 500 + 20,
    h: 663
  },
  [SIZE_TYPE_KEY.文件选择器]: {
    w: 590 + 20 + 40,
    h: 633
  },
  [SIZE_TYPE_KEY.确认弹窗]: {
    w: 370 + 20 + 40,
    h: 633
  },
  [SIZE_TYPE_KEY.邀请协作人]: {
    w: 640 + 20,
    h: 690
  },
  [SIZE_TYPE_KEY.多端提醒]: {
    w: 460 + 20,
    h: 680
  },
  [SIZE_TYPE_KEY.续费弹窗]: {
    w: 400,
    h: 663
  }
}
