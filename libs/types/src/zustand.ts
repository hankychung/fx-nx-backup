interface IUploadFile {
  status: 'pending' | 'success' | 'error'
  fileId: string
}

interface IZustandUploadState {
  uploadDict: {
    [key: string]: IUploadFile[]
  }
}

export { IZustandUploadState }
