import { useUploadStore } from '@flyele-nx/zustand-store'
import { IZustandUploadState, OssToken } from '@flyele-nx/types'
import { produce } from 'immer'
import { diskApi } from '@flyele-nx/service'

class UploadHandler {
  // 上传文件
  async upload(id: string, files: File[]) {
    // 用于端上维护的上传文件id
    const fileIds = files.map(
      (file) => file.name + '-' + Math.random().toString().substring(3, 9)
    )

    // 将文件添加至对应的上传列表
    this.addFiles(id, fileIds)

    // 初始化上传文件/维护上传字典
    const { abortSignals } = this.initFileState({
      uploadDictId: id,
      fileIds,
      files
    })

    const ossToken = await diskApi.getUploadToken()

    files.forEach((file, index) => {
      // 调用api上传
      this.handleUpload({
        file,
        fileId: fileIds[index],
        abortSignal: abortSignals[index],
        ossToken
      })
    })
  }

  // 重试
  async retry(fileId: string) {
    const { uploadDictId, file } = useUploadStore.getState().fileDict[fileId]
    const {
      abortSignals: [abortSignal]
    } = this.initFileState({
      uploadDictId,
      fileIds: [fileId],
      files: [file]
    })

    // 调用api上传
    this.handleUpload({
      file,
      fileId,
      abortSignal
    })
  }

  // 取消上传
  cancel(fileId: string) {
    const { fileDict, uploadDict } = useUploadStore.getState()

    const { status, abortController, uploadDictId } = fileDict[fileId]

    if (status === 'pending') {
      abortController.abort()
    }

    const uploadList = uploadDict[uploadDictId]

    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        state.uploadDict[uploadDictId] = uploadList.filter(
          (id) => id !== fileId
        )
        delete state.fileDict[fileId]
      })
    )
  }

  // 完成或终止, 清除store里的关联数据
  clear(id: string) {
    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        const fileIds = state.uploadDict[id] || []

        fileIds.forEach((fileId) => {
          delete state.fileDict[fileId]
        })

        delete state.uploadDict[id]
      })
    )
  }

  private addFiles(id: string, fileIds: string[]) {
    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        if (!state.uploadDict[id]) {
          state.uploadDict[id] = []
        }

        state.uploadDict[id].push(...fileIds)
      })
    )
  }

  private initFileState({
    uploadDictId,
    fileIds,
    files
  }: {
    uploadDictId: string
    fileIds: string[]
    files: File[]
  }) {
    const abortSignals: AbortSignal[] = []

    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        files.forEach((file, index) => {
          const fileId = fileIds[index]

          const controller = new AbortController()

          const { signal } = controller

          abortSignals.push(signal)

          state.fileDict[fileId] = {
            status: 'pending',
            fileId,
            progress: 0,
            name: file.name,
            abortController: controller,
            file,
            uploadDictId
          }
        })
      })
    )

    return { abortSignals }
  }

  private async handleUpload({
    file,
    fileId,
    abortSignal,
    ossToken
  }: {
    file: File
    fileId: string
    abortSignal: AbortSignal
    ossToken?: OssToken
  }) {
    const token = ossToken || (await diskApi.getUploadToken())

    diskApi
      .upload({
        abortSignal,
        token,
        file,
        uploadProgress: (res) => {
          // 更新进度
          const { loaded, total } = res

          if (total) {
            const percent = Math.round((loaded / total) * 100)

            this.updateProgress({ fileId, percent })
          }
        }
      })
      .then((res) => {
        const uploadedFileId = res?.data?.data?.file_id

        if (uploadedFileId) {
          this.updateStatus(fileId, 'success', {
            uploadedFileId
          })
        } else {
          this.updateStatus(fileId, 'error')
        }
      })
      .catch((e) => {
        console.error('上传文件失败', e, fileId)
        this.updateStatus(fileId, 'error')
      })
  }

  private updateProgress({
    fileId,
    percent
  }: {
    fileId: string
    percent: number
  }) {
    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        state.fileDict[fileId].progress = percent
      })
    )
  }

  private updateStatus(
    fileId: string,
    status: 'success' | 'error',
    options?: { uploadedFileId: string }
  ) {
    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        const info = state.fileDict[fileId]

        state.fileDict[fileId] = {
          ...info,
          status,
          uploadedFileId: options?.uploadedFileId
        }
      })
    )
  }

  static produce() {
    return new UploadHandler()
  }
}

export const uploadHandler = UploadHandler.produce()
