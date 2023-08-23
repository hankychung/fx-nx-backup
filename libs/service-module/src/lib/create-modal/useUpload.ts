import { useState } from 'react'

interface FileWithType extends File {
  type: 'image' | 'doc' | 'ppt' | 'excel' | 'txt' | 'pdf'
}

interface UploadProgress {
  file: FileWithType
  progress: number
}

export function useFileUpload() {
  const [filesList, setFilesList] = useState<FileWithType[]>([])

  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])

  const [error, setError] = useState<string | null>(null)

  const upload = async (files: FileWithType[]) => {
    try {
      // ...omitted for brevity
    } catch (error) {
      setError('上传失败')
    }
  }

  const deleteFile = (file: FileWithType) => {
    setFilesList((prev) => prev.filter((f) => f !== file))
  }

  return {
    filesList,
    uploadProgress,
    error,
    upload,
    deleteFile
  }
}

function setUploadProgress(prev: UploadProgress[]) {
  // ...
}

function getFileType(file: File) {
  // ...
}
