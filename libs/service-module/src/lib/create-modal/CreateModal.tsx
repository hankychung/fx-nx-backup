import React, { useState } from 'react'
import style from './createModal.module.scss'
import { ModalHeader } from './components/header'
import { TitleInput } from './components/title-input'
import { DescInput } from './components/desc-input'
import { DropZone } from '@flyele-nx/ui'
import { TaskTimePicker } from './components/task-time-picker'
import { RemindPicker } from './components/remind-picker'
import { RepeatPicker } from './components/repeat-picker'
import { TagMatterBar } from '../tag/tag-matter-bar'
import { QuadrantValue } from '@flyele-nx/constant'
import { PriorityPicker } from './components/priority-picker/PriorityPicker'
import { uploadHandler } from '@flyele-nx/zustand-handler'
import { FileDisplay } from '../file-display'
import { ProjectSelector } from './components/project-selector'
import { useMemoizedFn } from 'ahooks'
import { IBaseProjectInfo } from '@flyele-nx/types'
import { ChildMatter } from './components/child-matter'
import { MemberBar } from './components/member-bar'

const FILE_DICT_ID = 'create'

interface IProps {
  close: () => void
}

const CreateModal: React.FC<IProps> = ({ close }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [takers, setTakers] = useState<string[]>([])

  //TODO
  const [showProjectSelector, setShowProjectSelector] = useState(false)
  const [project, setProject] = useState<IBaseProjectInfo>()

  //控制事项选择下拉
  const [priority_level, setPriority_level] = useState(
    QuadrantValue.no_important_no_urgent
  )

  const handlePrioritySelectorChange = (val: QuadrantValue) => {
    setPriority_level(val)
  }

  const onChangeProjectAndGrounp = useMemoizedFn(
    (project: IBaseProjectInfo, groupId: string) => {
      //TODO:JC.....
      // if (project.project_id !== projectInfo?.project_id) {
      //   onChangeProject(project, projectInfo)
      // }
      // setData.setGroupId(groupId)
      onChangeProject(project)
    }
  )

  const onChangeProject = (project: IBaseProjectInfo) => {
    setProject(project)
  }

  return (
    <div className={style['create-modal']}>
      <ModalHeader close={close} />
      <div className={style['content-wrap']}>
        <DropZone
          onChange={(_, files) => {
            files &&
              uploadHandler.upload(FILE_DICT_ID, {
                localFiles: files
              })
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
            <FileDisplay fileDictId={FILE_DICT_ID} />
            <TagMatterBar />
            <ProjectSelector
              project={project}
              onChangeProjectAndGrounp={onChangeProjectAndGrounp}
              showProjectSelector={showProjectSelector}
              setShowProjectSelector={setShowProjectSelector}
              onChangeProject={(_project) => {
                console.log('_project', _project)
                onChangeProject(_project)
              }}
            />

            <PriorityPicker
              priority_level={priority_level}
              handlePrioritySelectorChange={handlePrioritySelectorChange}
            />
            <TaskTimePicker />
            <RemindPicker />
            <RepeatPicker />
            <ChildMatter />
            <MemberBar onChange={setTakers} takers={takers} />
          </div>
          <div className={style.footer}>footer</div>
        </DropZone>
      </div>
    </div>
  )
}

export { CreateModal }
