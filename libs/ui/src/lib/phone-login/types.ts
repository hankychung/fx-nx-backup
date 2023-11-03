import { ReactElement } from 'react'

export interface IPhoneLoginData {
  telephone: string
  verify_code: string
}

export interface IPhoneLoginProps {
  title?: string | ReactElement
  btnTitle?: string
  getVerifyCode: (phone: string) => Promise<boolean>
  onLogin: (data: IPhoneLoginData) => void
}
