import { uploadHandler } from '@flyele-nx/zustand-handler'
import style from './index.module.scss'
import { useUploadStore } from '@flyele-nx/zustand-store'
import { getFileIcon, isImage } from '@flyele-nx/utils'
import {
  AddIcon,
  DeleteOrCloseIcon,
  FileAddIcon,
  LoadingIcon
} from '@flyele-nx/icon'
import FilePopover from '../file-popover'
import { useState } from 'react'
import { diskApi } from '@flyele-nx/service'
import { Image } from 'antd'
import { MatterCreateCell } from '@flyele-nx/ui'

interface IProps {
  fileDictId: string
}

const FileDisplay: React.FC<IProps> = (props: IProps) => {
  const { fileDictId } = props
  const fileList = useUploadStore((state) => state.uploadDict[fileDictId]) || []
  const fileDict = useUploadStore((state) => state.fileDict)
  const [imageDict, setImageDict] = useState<Record<string, string>>({})
  const getImageDict = async (fileId: string) => {
    const { name, uploadedFileId, status } = fileDict[fileId]

    if (
      status === 'success' &&
      uploadedFileId &&
      !imageDict[uploadedFileId] &&
      isImage(name)
    ) {
      const ids = fileList.map((i) => fileDict[i].uploadedFileId ?? '')
      const res = await diskApi.getOnlineImage({ ids: ids })

      setImageDict(res.data)
    }
  }

  return (
    <div className={style['file-display']}>
      <div className={style.list}>
        {fileList.map((fileId) => {
          const { name, uploadedFileId, status } = fileDict[fileId]
          const url =
            isImage(name) && uploadedFileId
              ? imageDict[uploadedFileId]
              : getFileIcon(name, 'light')

          getImageDict(fileId)
          return (
            <div key={fileId} className={style.item}>
              <Image
                alt=""
                className={style.file_item__icon}
                src={url}
                preview={isImage(name)}
              />
              <span className={style.file_info__file_name}>{name}</span>
              <DeleteOrCloseIcon
                onClick={() => {
                  uploadHandler.cancel(fileId)
                }}
                className={style.file_item__close}
              />
              {status === 'pending' && (
                <LoadingIcon className={style.file_item__loading} />
              )}
            </div>
          )
        })}
        <FilePopover
          onLocalDoc={(files) => {
            uploadHandler.upload(fileDictId, {
              localFiles: files
            })
          }}
          onFlyeleDoc={(files) => {
            uploadHandler.upload(fileDictId, {
              cloudFiles: files
            })
          }}
        >
          {fileList.length ? (
            <div className={style.add_img_box}>
              <AddIcon color="#ccc" className={style.add_img_box_icon} />
            </div>
          ) : (
            <MatterCreateCell
              isMatterCreate
              img={() => <FileAddIcon color="#060606" width={16} height={16} />}
            >
              <div className={style.file_text_placeholder}>{`文件/图片`}</div>
            </MatterCreateCell>
          )}
        </FilePopover>
      </div>
    </div>
  )
}

export { FileDisplay }
