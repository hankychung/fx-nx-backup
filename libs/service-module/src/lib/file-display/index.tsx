import { uploadHandler } from '@flyele-nx/zustand-handler'
import style from './index.module.scss'
import { useUploadStore } from '@flyele-nx/zustand-store'

interface IProps {
  fileDictId: string
}

const FileDisplay: React.FC<IProps> = () => {
  const fileList = useUploadStore((state) => state.uploadDict['create']) || []
  const fileDict = useUploadStore((state) => state.fileDict)

  return (
    <div className={style['file-display']}>
      <div>file display</div>
      <div className={style.list}>
        {fileList.map((fileId) => {
          const { name, progress, status, abortController } = fileDict[fileId]

          return (
            <div key={fileId}>
              <div>{`name: ${name}`}</div>
              <div>{`percent: ${progress}%`}</div>
              <div>{`status: ${status}`}</div>
              <div onClick={() => abortController.abort()}>cancel</div>
              {status === 'error' && (
                <div onClick={() => uploadHandler.retry(fileId)}>retry</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { FileDisplay }
