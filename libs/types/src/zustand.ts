import { ILang } from '@flyele-nx/i18n'

interface IUploadFile {
  status: 'pending' | 'success' | 'error'
  // 用于维护文件字典, 仅前端使用
  fileId: string
  name: string
  progress: number
  abortController?: AbortController
  file?: File
  uploadDictId: string
  // 真实文件id, 传给后端使用, status为success时有值
  uploadedFileId?: string
}

interface IZustandUploadState {
  uploadDict: {
    [key: string]: string[]
  }
  fileDict: {
    [key: string]: IUploadFile
  }
}

interface IZustandGlobalInfo {
  lang: ILang
}

export { IZustandUploadState, IZustandGlobalInfo }
