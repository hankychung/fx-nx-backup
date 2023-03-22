export interface ILoginParams {
  telephone: string // 账号
  verify_code: string // 验证码
}

export interface IUser {
  id: string
  nick_name: string // 昵称
  telephone: string // 手机号
}

export interface ILoginUser extends IUser {
  token: string // token
}
