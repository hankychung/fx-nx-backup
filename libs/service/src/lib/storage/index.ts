import { OssToken } from '@flyele-nx/types'
import { service } from '../service'

const UPLOAD_TIMEOUT = 5 * 60 * 1000

class Storage {
  private prefix = 'disk/v2'
  getUploadToken() {
    return service.get<OssToken>({
      url: `${this.prefix}/storage/token`,
      timeout: 10000
    })
  }

  upload = async ({ file, token }: { file: File; token: OssToken }) => {
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
        onUploadProgress(progress) {
          // 原生获取上传进度的事件
          console.log('progress', progress)
          if (progress.lengthComputable) {
            // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
            // 如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
            // callback1(progressEvent)
            //   uploadProgress(progress)
          }
        }
      })
      .then((res) => {
        return res
      })
  }
}

export const storageApi = new Storage()
