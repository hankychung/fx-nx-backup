import React, { useState } from 'react'
import style from './createModal.module.scss'
import { ModalHeader } from './components/header'
import { TitleInput } from './components/title-input'
import { DescInput } from './components/desc-input'
import { DatePicker } from './components/date-picker'
import { RemindPicker } from './components/remind-picker'
import { RepeatPicker } from './components/repeat-picker'
import { TagMatterBar } from '../tag/tag-matter-bar'
import { QuadrantValue } from '@flyele-nx/constant'
import { PriorityPicker } from './components/priority-picker/PriorityPicker'
import { ProjectSelector } from './components/project-selector'
import { useMemoizedFn } from 'ahooks'
import { IBaseProjectInfo } from '@flyele-nx/types'

interface IProps {
  close: () => void
}

const CreateModal: React.FC<IProps> = ({ close }) => {
  //TODO
  const [showProjectSelector, setShowProjectSelector] = useState(false)

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
    }
  )

  return (
    <div className={style['create-modal']}>
      <ModalHeader close={close} />
      <div className={style.content}>
        <TitleInput placeholder="事项标题" />
        <DescInput placeholder="背景信息/说明（可拖文件到这里）" />
        <TagMatterBar />
        <ProjectSelector
          onChangeProjectAndGrounp={onChangeProjectAndGrounp}
          showProjectSelector={showProjectSelector}
          setShowProjectSelector={setShowProjectSelector}
        />
        <PriorityPicker
          priority_level={priority_level}
          handlePrioritySelectorChange={handlePrioritySelectorChange}
        />
        <DatePicker />
        <RemindPicker />
        <RepeatPicker />
      </div>
      <div className={style.footer}>footer</div>
    </div>
  )
}

export { CreateModal }
