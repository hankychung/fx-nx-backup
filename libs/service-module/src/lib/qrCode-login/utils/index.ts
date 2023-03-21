import { uid } from '@flyele-nx/utils'
import { ILoginKeyParams, IDevice } from '@flyele-nx/service'

class Util {
  async getLoginKeyParams(
    key: string,
    device: Omit<IDevice, 'device_id'>
  ): Promise<ILoginKeyParams> {
    return {
      device: {
        client_version: device.client_version,
        os: device.os,
        platform: device.platform,
        device_name: device.device_name,
        device_id: uid
      },
      last_login_key: key
    }
  }
}

export default new Util()
