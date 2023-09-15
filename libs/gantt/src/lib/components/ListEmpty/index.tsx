// import { Table } from 'antd'
import { I18N } from '@flyele-nx/i18n'
import React from 'react'
import EmptyStand from '../../../assets/icons/empty_stand.png'
import styles from './index.module.scss'

export type ListEmptyProps = {
  onCreate?: () => void
  isCanOperated?: () => boolean
}

const ListEmpty: React.FC<React.PropsWithChildren<ListEmptyProps>> = () => {
  // const { project, updateTaskTree, groupReducer, getProjectStats } = useContext(
  //   Context
  // )

  // const { show } = useProjectMatter({
  //   path: ImportEnterPath.project_matter_list_page,
  //   spaceId: project.workspace_id,
  //   projectTitle: project.project_name,
  //   projectId: project.project_id,
  //   onCallBack(task_ids) {
  //     groupReducer.createGroupTaskById(task_ids)
  //     // 更新事项
  //     updateTaskTree(task_ids.join(','), false)

  //     // 更新关联数据
  //     getProjectStats()
  //   },
  // })

  /**
   * 导入事项
   */
  // const onImport = () => {
  //   if (isCanOperated && !isCanOperated()) return
  //   show()
  // }

  return (
    <div className={styles.empty}>
      <img className={styles.empty__img} src={EmptyStand} alt="empty" />
      <div className={styles.empty__hint}>{I18N.common.noMattersAtPresent}</div>
      {/* <div className={styles.empty__handle}>
        <div onClick={onCreate} className={styles.empty__handle__create}>
          创建事项
        </div>
        <div onClick={onImport} className={styles.empty__handle__import}>
          导入事项
        </div>
      </div> */}
    </div>
  )
}

export default React.memo(ListEmpty)
