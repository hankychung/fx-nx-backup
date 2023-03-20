import { uid } from '@flyele-nx/utils'
import { ILoginKeyParams } from '@flyele-nx/service'

class Util {
  async getLoginKeyParams(key: string): Promise<ILoginKeyParams> {
    return {
      device: {
        // TODO 版本号
        client_version: '',
        os: '',
        platform: 'pc',
        device_name: '',
        device_id: uid
      },
      last_login_key: key
    }
  }
}

export default new Util()
