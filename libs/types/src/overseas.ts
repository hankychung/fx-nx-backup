import { IDevice } from './user'

export interface IOverseasLogin {
  device: IDevice
  mima: string
  youxiang: string
}

export interface IOverseasCreateAccount {
  mima: string
  yanzhengma?: string
  yonghuming: string
  youxiang: string
}

export interface IOverseasGetCode {
  youjianleixing: 1 | 2 //邮件类型，1->验证码，2->找回密码
  youxiang: string
}

export interface IResetPassword {
  mima: string
  yanzhengma?: string
  youxiang?: string
  code?: string
}
