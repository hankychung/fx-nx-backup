import React, { useState } from 'react'
import style from './createModal.module.scss'
import { ModalHeader } from './components/header'
import { TitleInput } from './components/title-input'
import { DescInput } from './components/desc-input'
import { DropZone } from '@flyele-nx/ui'
import { useCreateFiles } from './hooks/useCreateFiles'
import { DatePicker } from './components/date-picker'
import { RemindPicker } from './components/remind-picker'
import { RepeatPicker } from './components/repeat-picker'
import { TagMatterBar } from '../tag/tag-matter-bar'
import { QuadrantValue } from '@flyele-nx/constant'
import { PriorityPicker } from './components/priority-picker/PriorityPicker'

interface IProps {
  close: () => void
}

const CreateModal: React.FC<IProps> = ({ close }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const { fileList, batchUpload } = useCreateFiles()

  const [priority_level, setPriority_level] = useState(
    QuadrantValue.no_important_no_urgent
  )

  const handlePrioritySelectorChange = (val: QuadrantValue) => {
    setPriority_level(val)
  }

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
            <TagMatterBar />
            <PriorityPicker
              priority_level={priority_level}
              handlePrioritySelectorChange={handlePrioritySelectorChange}
            />
            <DatePicker />
            <RemindPicker />
            <RepeatPicker />
          </div>
          <div className={style.footer}>footer</div>
        </DropZone>
      </div>
    </div>
  )
}

export { CreateModal }
