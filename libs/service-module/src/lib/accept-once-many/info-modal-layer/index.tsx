import { I18N } from '@flyele-nx/i18n'
import React, { useState, useEffect, useMemo } from 'react'
import { Tree } from 'antd'
import styles from './index.module.scss'
import { addKey } from '../utils'
import { useScheduleStore } from '@flyele-nx/global-processor'
import { ILocalTask } from '@flyele-nx/types'

export enum charsType {
  'accept',
  'finish'
}

export const charsDict = {
  // 批量接受的文案
  accept: {
    title: I18N.common.areAllConnected,
    oneBtn: I18N.common.acceptOnlyTheCurrent,
    allBtn: I18N.common.acceptAll,
    txt: ''
  },
  finish: {
    title: I18N.common.areAllCompleted2,
    oneBtn: I18N.common.onlyCompleteTheCurrent2,
    allBtn: I18N.common.allCompleted2,
    txt: ''
  },
  refused: {
    title: I18N.common.whetherToRejectAll,
    oneBtn: I18N.common.onlyRejectTheCurrent,
    allBtn: I18N.common.rejectAll,
    txt: ''
  },
  hide: {
    title: I18N.common.isItHiddenTogether,
    oneBtn: I18N.common.hideOnlyTheCurrent,
    allBtn: I18N.common.hideTogether,
    txt: ''
  },
  closeTask: {
    title: I18N.common.areAllCompleted,
    oneBtn: I18N.common.onlyCompleteTheCurrent,
    allBtn: I18N.common.allCompleted,
    txt: I18N.common.allWithinTheMatter
  }
}

interface PropLayer {
  typeName: keyof typeof charsDict
  taskList: Array<string>
  handleClickOnlyOne: () => void
  handleClickAll: () => void
  cycle?: number
}

const InfosModalLayer: React.FC<React.PropsWithChildren<PropLayer>> = ({
  typeName = 'accept',
  taskList,
  cycle,
  handleClickOnlyOne,
  handleClickAll
}) => {
  const [taskListInside, setTaskListInside] = useState<Array<ILocalTask>>([])
  const taskDict = useScheduleStore((state) => state.taskDict)
  useEffect(() => {
    const list = taskList.map((i) => taskDict[i])

    setTaskListInside(list)
  }, [taskList, taskDict])

  /** 注册了 key 的数据 */
  const treeData = useMemo(() => addKey(taskListInside), [taskListInside])

  const title = I18N.template?.(I18N.common.theFollowingDec, {
    val1: taskList.length,
    val2: charsDict[typeName].title
  })

  return (
    <div className={styles.infos_modal_layer}>
      <div className={styles.infos_modal_layer__title}>{title}</div>
      <div className={styles.infos_modal_layer__desc}>
        <span>{charsDict[typeName]?.txt}</span>
      </div>

      {!!cycle && (
        <div className={styles.infos_modal_layer__cycle}>
          <span>{I18N.template?.(I18N.common.cycl, { val1: cycle })}</span>
        </div>
      )}

      <div className={styles.infos_modal_layer__list}>
        <Tree
          blockNode
          showIcon={false}
          treeData={treeData}
          defaultExpandAll
          defaultExpandParent
          selectable={false}
          titleRender={(data) => {
            return (
              <div key={data.key} className={styles.node}>
                {data.title as string}
              </div>
            )
          }}
        />
      </div>

      <div className={styles.infos_modal_layer__footer}>
        <button
          type="button"
          className={styles.infos_modal_layer__footer__btn_only}
          onClick={(e) => {
            e.stopPropagation()
            handleClickOnlyOne()
          }}
        >
          {charsDict[typeName].oneBtn}
        </button>
        <button
          type="button"
          className={styles.infos_modal_layer__footer__btn_all}
          onClick={(e) => {
            e.stopPropagation()
            handleClickAll()
          }}
        >
          {charsDict[typeName].allBtn}
        </button>
      </div>
    </div>
  )
}

export default InfosModalLayer
