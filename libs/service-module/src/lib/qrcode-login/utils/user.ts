import { UsercApi, IUserInfo } from '@flyele-nx/service'

export const getUserInfo = (args: {
  onSuccess?: (data?: IUserInfo) => void
  onError?: () => void
}) => {
  const { onSuccess, onError } = args

  UsercApi.getLoginUserInfo()
    .then(async (res) => {
      if (res) {
        try {
          onSuccess && onSuccess(res?.data)
        } catch (e) {
          console.log('user login logic error', e)
        }
      }
    })
    .catch((err) => {
      console.log('获取登录用户失败', err)

      onError && onError()
    })
}
