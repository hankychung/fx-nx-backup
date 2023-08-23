import React, { useState } from 'react'
import style from './createModal.module.scss'
import { ModalHeader } from './components/header'
import { TitleInput } from './components/title-input'
import { DescInput } from './components/desc-input'
import { DropZone } from '@flyele-nx/ui'
import { useCreateFiles } from './hooks/useCreateFiles'

interface IProps {
  close: () => void
}

const CreateModal: React.FC<IProps> = ({ close }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const { fileList, batchUpload } = useCreateFiles()

  console.log('fileList', fileList)

  return (
    <div className={style['create-modal']}>
      <ModalHeader close={close} />
      <div className={style['content-wrap']}>
        <DropZone
          onChange={(_, files) => {
            const fileList = (files ?? []).map((file) => {
              return {
                path: file.webkitRelativePath,
                file: file
              }
            })
            batchUpload({ fileList })
          }}
        >
          <div className={style.content}>
            <TitleInput
              value={title}
              onChange={setTitle}
              placeholder="事项标题"
            />
            <DescInput
              value={desc}
              onChange={setDesc}
              placeholder="背景信息/说明（可拖文件到这里）"
            />
          </div>
          <div className={style.footer}>footer</div>
        </DropZone>
      </div>
    </div>
  )
}

export { CreateModal }
