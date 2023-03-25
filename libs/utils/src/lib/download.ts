/**
 * 下载后端直接文件url的形式
 */
export const downloadUrl = (fileUrl: string, fileName?: string) => {
  const a = document.createElement('a')
  a.href = fileUrl

  if (fileName) {
    a.download = fileName
  }

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
