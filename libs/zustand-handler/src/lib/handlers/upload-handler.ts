import { useUploadStore } from '@flyele-nx/zustand-store'
import { IZustandUploadState } from '@flyele-nx/types'
import { produce } from 'immer'

class UploadHandler {
  // 获取上传列表
  getUploadList(id: string) {
    return useUploadStore.getState().uploadDict[id]
  }

  // 添加上传文件
  upload(id: string, file: File) {
    useUploadStore.setState(
      produce((state: IZustandUploadState) => {
        state.uploadDict[id].push({
          fileId: file.name,
          status: 'pending'
        })
      })
    )
  }

  static produce() {
    return new UploadHandler()
  }
}

export const uploadHandler = UploadHandler.produce()
