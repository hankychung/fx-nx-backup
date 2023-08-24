import { useUploadStore } from '@flyele-nx/zustand-store'
import { IZustandUploadState } from '@flyele-nx/types'
import { produce } from 'immer'
import { storageApi } from '@flyele-nx/service'

class UploadHandler {
  // 上传文件
  async upload(id: string, file: File) {
    // 用于端上维护的上传文件id
    const fileId = file.name + Math.random().toString().substring(3, 8)

    // 将文件添加至对应的上传列表
    this.addFile(id, fileId)

    // 初始化上传文件/维护上传字典
    const { abortSignal } = this.initFileState({
      uploadDictId: id,
      fileId,
      name: file.name,
      file
    })

    // 调用api上传
    this.handleUpload({
      file,
      fileId,
      abortSignal
    })
  }

  async retry(fileId: string) {
    const fileInfo = useUploadStore.getState().fileDict[fileId]
    const { abortSignal } = this.initFileState(fileInfo)

    // 调用api上传
    this.handleUpload({
      file: fileInfo.file,
      fileId,
      abortSignal
    })
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

  private addFile(id: string, fileId: string) {
    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        if (!state.uploadDict[id]) {
          state.uploadDict[id] = []
        }

        state.uploadDict[id].push(fileId)
      })
    )
  }

  private initFileState({
    uploadDictId,
    fileId,
    name,
    file
  }: {
    uploadDictId: string
    fileId: string
    name: string
    file: File
  }) {
    const controller = new AbortController()

    const { signal } = controller

    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        state.fileDict[fileId] = {
          status: 'pending',
          fileId,
          progress: 0,
          name,
          abortController: controller,
          file,
          uploadDictId
        }
      })
    )

    return { abortSignal: signal }
  }

  private async handleUpload({
    file,
    fileId,
    abortSignal
  }: {
    file: File
    fileId: string
    abortSignal: AbortSignal
  }) {
    const token = await storageApi.getUploadToken()

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
