import { useUploadStore } from '@flyele-nx/zustand-store'
import { IZustandUploadState, OssToken } from '@flyele-nx/types'
import { produce } from 'immer'
import { storageApi } from '@flyele-nx/service'

class UploadHandler {
  // 上传文件
  async upload(id: string, file: File) {
    // 临时的上传文件id
    const fileId = file.name + Math.random().toString().substring(3, 8)

    // 维护上传字典
    const { abortSignal } = this.initFileState({ id, fileId, name: file.name })

    // 调用api上传
    this.handleUpload({
      token: await storageApi.getUploadToken(),
      file,
      fileId,
      abortSignal
    })
  }

  private initFileState({
    id,
    fileId,
    name
  }: {
    id: string
    fileId: string
    name: string
  }) {
    const controller = new AbortController()

    const { signal } = controller

    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        if (!state.uploadDict[id]) {
          state.uploadDict[id] = []
        }

        state.uploadDict[id].push(fileId)

        state.fileDict[fileId] = {
          status: 'pending',
          fileId,
          progress: 0,
          name,
          abortController: controller
        }
      })
    )

    return { abortSignal: signal }
  }

  private handleUpload({
    token,
    file,
    fileId,
    abortSignal
  }: {
    token: OssToken
    file: File
    fileId: string
    abortSignal: AbortSignal
  }) {
    storageApi
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
      .then(() => {
        this.updateStatus(fileId, 'success')
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

  private updateStatus(fileId: string, status: 'success' | 'error') {
    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        const info = state.fileDict[fileId]

        state.fileDict[fileId] = {
          ...info,
          status
        }
      })
    )
  }

  static produce() {
    return new UploadHandler()
  }
}

export const uploadHandler = UploadHandler.produce()
