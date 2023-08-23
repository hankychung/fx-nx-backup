import { OssToken } from '@flyele-nx/types'
import { service } from '../service'

const UPLOAD_TIMEOUT = 5 * 60 * 1000

class Storage {
  private prefix = 'disk/v2'
  getUploadToken() {
    return service.getRaw<OssToken>({
      url: `${this.prefix}/storage/token`,
      timeout: 10000
    })
  }

  upload = async ({
    file,
    token,
    uploadProgress
  }: {
    file: File
    token: OssToken
    uploadProgress: (progress: ProgressEvent) => void
  }) => {
    const { callback, dir, policy, accessid, signature, host } = token

    let name: string = file.name

    const formData = new FormData()

    const arr = name.split('.')
    const ext = arr.pop()

    if (arr.length) {
      name = `${arr.join('.').substr(0, 30)}.${ext}`
    } else {
      name = name.substr(0, 30)
    }

    formData.append('callback', callback)
    formData.append('key', dir + name)
    formData.append('policy', policy)
    formData.append('OSSAccessKeyId', accessid)
    formData.append('signature', signature)
    formData.append('success_action_status', '200')

    formData.append('file', file)

    const axiosHeader = {
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'max-age=604800'
    }

    return service
      .axios({
        method: 'post',
        data: formData,
        headers: axiosHeader,
        url: host,
        timeout: UPLOAD_TIMEOUT,
        onUploadProgress: uploadProgress
      })
      .then((res) => {
        return res
      })
  }
}

export const storageApi = new Storage()
