export interface IPhoneLoginProps {
  title?: string
  btnTitle?: string
  getVerifyCode: (phone: string) => Promise<string>
}
