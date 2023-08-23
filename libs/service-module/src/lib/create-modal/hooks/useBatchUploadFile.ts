import { Canceler } from 'axios'
import { useRef, useState } from 'react'
import { storageApi } from '@flyele-nx/service'

interface UploadResult {
  [key: string]: {
    id: string
    status: 'success' | 'error' | 'initial'
    size: number
  }
}

/**
 * 批量上传，批量失败批量成功，
 * 调用上传方法一定要等到上一次上传结束后再调用新的，否则会导致数据错乱
 */
export const useBatchUploadFile = (storeKey?: string) => {
  const cancelTokenObj = useRef<{ [p in string]: Canceler }>({}) // 取消上传集合
  const files = useRef<{ path: string; file: File }[]>([])
  const uploadRes = useRef<UploadResult>({})

  const [progress, setProgress] = useState(0) // 进度 暂时不可用。

  const replaceFileSizeRef = useRef<{ [p in string]: string }>({}) // 已经替换ajax大小的字段

  const progressRef = useRef<{
    [p in string]: { total: number; loaded: number }
  }>({}) // 文件上传进度信息

  // 重新上传
  const retryUpload = async () => {
    const token = await storageApi.getUploadToken()

    files.current.forEach((file) => {
      const data = uploadRes.current[file.path]

      // 未上传或者上传失败的直接把已经上传的数据置为0
      if (!data || data.status !== 'success') {
        progressRef.current[file.path].loaded = 0
      }
    })

    // uploadProgress() // 更新进度

    return callUpload({ token })
  }

  // 取消上传
  const cancelUpload = () => {
    Object.keys(cancelTokenObj.current).forEach((key) => {
      cancelTokenObj.current[key]()
    })
    cancelTokenObj.current = {}
  }

  /**
   *
   * 给外部的调用
   */
  const batchUpload = async ({
    fileList
  }: {
    fileList?: { path: string; file: File }[]
  }) => {
    setProgress(0) // 重置进度为0

    files.current = fileList || []
    files.current.forEach((file) => {
      progressRef.current[file.path] = { total: file.file.size, loaded: 0 }
    })
    uploadRes.current = {}

    replaceFileSizeRef.current = {}

    try {
      const token = await storageApi.getUploadToken()

      return callUpload({ token })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // 检查是否已经全部上传完成
  const checkUploadAll = () => {
    return files.current.every((file) => {
      const data = uploadRes.current[file.path]

      return data && data.status === 'success'
    })
  }

  const getSize = (path: string) => {
    const item = files.current.find((item) => item.path === path)

    return item?.file.size || 0
  }

  const callUpload = ({ token }: { token: any }) => {
    const p = new Promise<typeof uploadRes.current>((resolve, reject) => {
      // 不确定这样写法是否会多次的调用catch,理论上来说reject被调用之后作用域内的所有代码就应该失效了
      files.current.forEach((item) => {
        // 已经上传成功的不用再次上传，一般用于重新上传的情况
        const data = uploadRes.current[item.path]

        if (data && data.status === 'success') return

        storageApi
          .upload({
            token,
            file: item.file
          })
          .then((res) => {
            if (res.data.code === 0) {
              // 上传完成
              uploadRes.current[item.path] = {
                id: res.data.data.file_id,
                status: 'success',
                size: getSize(item.path)
              }
              // 检查是否都已经全部上传，全部上传完成直接返回

              checkUploadAll() && resolve(uploadRes.current)
            } else {
              uploadRes.current[item.path] = {
                id: '',
                status: 'error',
                size: getSize(item.path)
              }
              cancelUpload() // 调用此函数后会走到catch,所以不会有等待的问题
              reject()
            }
          })
          .catch((err) => {
            // 只要有一个失败就全部失败
            cancelUpload()
            reject(err)
          })
      })
    })

    return p
  }

  return {
    batchUpload,
    cancelUpload,
    retryUpload,
    progress
  }
}
