interface IUploadFile {
  status: 'pending' | 'success' | 'error'
  fileId: string
  name: string
  progress: number
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
