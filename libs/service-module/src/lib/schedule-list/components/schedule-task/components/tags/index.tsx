import React from 'react'
import cs from 'classnames'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import { Tooltip } from 'antd'
import TagAutoBar from '../../../../../tag/tag-auto-bar'
import TagContent from '../../../../../tag/tag-content'
import parentStyle from '../../index.module.scss'
import styles from './index.module.scss'
import { useScheduleStore } from '@flyele-nx/global-processor'
import { contextMenuTool } from '../../../../../../index'

interface IPROPTags {
  taskId: string
  wrapClassName?: string
}

export const Tags: React.FC<IPROPTags> = ({ taskId, wrapClassName }) => {
  const task = useScheduleStore((state) => state.taskDict[taskId])
  const isVipSmallTool = false
  const isBoard = true

  const tags = task?.tags || []

  const ctrl = useController(new FlyBasePopperCtrl())

  // 空间成员安排\项目分组\项目成员日程不显示日程
  // 外界靠不住，组件内自己判断
  // if (!tags.length || memberId || groupId) {
  if (!tags.length) {
    return null
  }

  return (
    <div
      className={cs(styles.tagsOuter, wrapClassName, {
        [parentStyle.needLine]: isBoard || isVipSmallTool,
        [styles.needLine]: isBoard || isVipSmallTool
      })}
    >
      <div className={styles.tags}>
        <div className={styles.tagBox}>
          <FlyBasePopper
            controller={ctrl}
            showArrow={false}
            placement="auto"
            strategy="absolute"
            content={() => <TagContent data={task} />}
          >
            <Tooltip
              overlayClassName="antdTagToolTip"
              placement="topLeft"
              title={tags.map((tag) => tag.name).join('、')}
            >
              <div>
                <TagAutoBar
                  tags={tags}
                  onClickItem={(e) => {
                    e.stopPropagation()

                    /**
                     * 如果存在右键菜单，先把菜单关闭了，因为上面阻止冒泡了，所以触发不了关闭右键菜单
                     */
                    const contextMenuVisible = contextMenuTool.getVisible()
                    if (contextMenuVisible) {
                      contextMenuTool.close()
                      return
                    }

                    ctrl.addClickAlwaysHide({ stopPropagation: true }).show()
                  }}
                />
              </div>
            </Tooltip>
          </FlyBasePopper>
        </div>
      </div>
    </div>
  )
}
