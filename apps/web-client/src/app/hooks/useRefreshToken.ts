import { UsercApi, service } from '@flyele-nx/service'

export const useRefreshToken = () => {
  UsercApi.refreshToken()
    .then((res) => {
      // 更新token
      console.log('new token', res)
    })
    .catch((e) => {
      console.error('refresh token error', e)
      // 清除token
    })
}
