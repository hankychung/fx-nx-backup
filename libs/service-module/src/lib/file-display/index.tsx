import { uploadHandler } from '@flyele-nx/zustand-handler'
import style from './index.module.scss'
import { useUploadStore } from '@flyele-nx/zustand-store'
import { getFileIcon } from '@flyele-nx/utils'
import { Close } from '@flyele-nx/icon'

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
          const { name } = fileDict[fileId]

          return (
            <div key={fileId} className={style.item}>
              <img
                alt=""
                className={style.file_item__icon}
                src={getFileIcon(name, 'light')}
              />
              <span className={style.file_info__file_name}>{name}</span>
              <Close className={style.file_item__close} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { FileDisplay }
