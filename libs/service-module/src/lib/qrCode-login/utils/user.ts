import { UsercApi } from '@flyele-nx/service'

enum ErrorCodes {
  error = 40006,
  noFound = 40010, // 访问的数据不存在
  success = 0,
  cancelAdminErr = 40038 // 取消责任人，该责任人正在编辑
}

export const getUserInfo = (args: {
  onSuccess?: () => void
  onError?: () => void
}) => {
  const { onSuccess, onError } = args

  UsercApi.getLoginUserInfo()
    .then(async (res) => {
      if (res.code === ErrorCodes.success) {
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
