import { useState } from 'react'
import { useBatchUploadFile } from './useBatchUploadFile'

export const useCreateFiles = () => {
  const [fileList, setFileList] = useState<File[]>([])
  const { batchUpload } = useBatchUploadFile()
  return {
    fileList,
    batchUpload
  }
}
