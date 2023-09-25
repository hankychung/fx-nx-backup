import { uid } from '@flyele-nx/utils'
import { ILoginKeyParams, IDevice } from '@flyele-nx/service'
import { IOverseasLogin } from '@flyele-nx/types'

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

  async getEmailLoginParams(
    device: Omit<IDevice, 'device_id'>,
    email: string,
    password?: string
  ): Promise<IOverseasLogin> {
    return {
      mima: password || '',
      youxiang: email,
      device: (await this.getLoginKeyParams('', device)).device
    }
  }
}

export default new Util()
