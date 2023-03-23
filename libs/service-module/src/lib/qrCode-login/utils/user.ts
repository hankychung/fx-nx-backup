import { UsercApi } from '@flyele-nx/service'

export const getUserInfo = (args: {
  onSuccess?: () => void
  onError?: () => void
}) => {
  const { onSuccess, onError } = args

  UsercApi.getLoginUserInfo()
    .then(async (res) => {
      if (res) {
        try {
          onSuccess && onSuccess()
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
