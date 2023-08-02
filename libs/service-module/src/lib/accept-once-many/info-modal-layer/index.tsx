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
    title: '是否全部接受?',
    oneBtn: '仅接受当前',
    allBtn: '全部接受',
    txt: ''
  },
  finish: {
    title: '是否全部完成?',
    oneBtn: '仅完成当前',
    allBtn: '全部完成',
    txt: ''
  },
  refused: {
    title: '是否全部拒绝?',
    oneBtn: '仅拒绝当前',
    allBtn: '全部拒绝',
    txt: ''
  },
  hide: {
    title: '是否一并隐藏?',
    oneBtn: '仅隐藏当前',
    allBtn: '一并隐藏',
    txt: ''
  },
  closeTask: {
    title: '是否全部完结?',
    oneBtn: '仅完结当前',
    allBtn: '全部完结',
    txt: '事项内所有协作人将同步完成'
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

  const title = `以下${taskList.length}个下级事项，${charsDict[typeName].title}`

  return (
    <div className={styles.infos_modal_layer}>
      <div className={styles.infos_modal_layer__title}>{title}</div>
      <div className={styles.infos_modal_layer__desc}>
        <span>{charsDict[typeName]?.txt}</span>
      </div>

      {!!cycle && (
        <div className={styles.infos_modal_layer__cycle}>
          <span>{`第${cycle}次循环事项：`}</span>
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
