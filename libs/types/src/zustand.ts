interface IUploadFile {
  status: 'pending' | 'success' | 'error'
  fileId: string
  name: string
  progress: number
  abortController: AbortController
  file: File
  uploadDictId: string
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

export { IZustandUploadState }
