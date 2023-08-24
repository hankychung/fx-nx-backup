/**
 author: william   email:362661044@qq.com
 create_at:2022/8/11 14:38
 **/

import React, {
  FC,
  KeyboardEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  FlyTextTooltip
} from '@flyele/flyele-components'
import { Placement } from '@popperjs/core/lib/enums'
import { PositioningStrategy } from '@popperjs/core/lib/types'

import styles from './index.module.scss'
import { IProjectGroup } from '@flyele-nx/types'
import { Input, InputRef } from 'antd'
import { globalNxController } from '@flyele-nx/global-processor'
import { CheckBoxState, NORMAL_LEN } from '@flyele-nx/constant'
import { CheckItemRow } from '../CheckItemRow'
import { useMatterGroup } from '../../hooks/useMatterGroup'
import { CircleAdd } from '@flyele-nx/icon'

export type IMatterGroupSelector = {
  projectId: string
  groupId: string
  onUpdateCb: (value: IProjectGroup) => void
  trigger?: 'click' | 'hover'
  placement?: Placement
  strategy?: PositioningStrategy
  disable?: boolean // 禁止选择
  disableCreate?: boolean // 禁止创建
  onVisibleChange?: (visible: boolean) => void
  clickOnHide?: boolean
  popperDistance?: number
  ctrl?: FlyBasePopperCtrl
  mountNode?: (() => HTMLElement | null) | 'currentNode'
}

function _MatterGroupSelector(props: PropsWithChildren<IMatterGroupSelector>) {
  const {
    children,
    trigger,
    placement = 'bottom-start',
    strategy = 'absolute',
    onVisibleChange,
    disable,
    ctrl,
    popperDistance,
    mountNode
  } = props

  const controller = useMemo(() => {
    return ctrl ?? new FlyBasePopperCtrl()
  }, [ctrl])

  return (
    <FlyBasePopper
      mountNode={mountNode}
      popperDistance={popperDistance}
      controller={controller}
      trigger={trigger}
      strategy={strategy}
      showArrow={false}
      placement={placement}
      content={<Content ctrl={controller} {...props} />}
      onVisibleChange={onVisibleChange}
      clickOnHide={trigger === 'click'}
      disable={disable}
    >
      {children}
    </FlyBasePopper>
  )
}

export const MatterGroupSelector = React.memo(_MatterGroupSelector)

type IContent = { ctrl: FlyBasePopperCtrl } & IMatterGroupSelector
const Content: FC<React.PropsWithChildren<IContent>> = (props) => {
  const {
    projectId,
    groupId: _groupId,
    onUpdateCb,
    ctrl,
    disableCreate = false
  } = props

  // 当前选择的 分组
  const [groupId, setGroupId] = useState<string>('')

  useEffect(() => {
    setGroupId(_groupId)
  }, [_groupId])

  // 分组列表
  const { groupList, createGroup } = useMatterGroup({
    projectId
  })

  // 编辑模式
  const [edit, setEdit] = useState(false)

  // 输入框
  const inputRef = useRef<InputRef>(null)

  // 列表
  const listRef = useRef<HTMLDivElement>(null)

  // 设置并选择该分组
  const onSetGroup = async (item: IProjectGroup) => {
    // 是否自动更新
    setGroupId(item.id)
    onUpdateCb(item)
  }

  // 选择了分组
  const onSelect = (item: IProjectGroup) => {
    // 设置分组
    onSetGroup(item)
    setTimeout(() => {
      ctrl.hide()
    }, 50)
  }

  // 编辑模式切换
  const onChangeEdit = useCallback(() => {
    const bool = !edit

    // 如果是编辑模式自动聚焦
    if (bool) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
    setEdit(bool)
  }, [edit])

  const scrollToBottom = () => {
    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current?.scrollHeight,
        left: 0,
        behavior: 'smooth'
      })
    }, 100)
  }

  // 创建并选中分组
  const kePressHandle = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === 'enter') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const name: string = e.target.value
      const data = await createGroup(name)

      if (data) {
        // onSetGroup(data)
        onChangeEdit()

        // 滚到最后
        scrollToBottom()
      }
    }
  }

  return (
    <div className={styles.wrap}>
      <h1>选择分组</h1>
      <div className={styles.content} ref={listRef}>
        {groupList.map((item: any) => {
          return (
            <BuildItem
              onSelect={onSelect}
              key={item.id}
              item={item}
              isChecked={item.id === groupId}
            />
          )
        })}
      </div>
      {/** 创建栏 **/}
      <footer>
        {!edit && (
          <div
            className={styles.create}
            onClick={(event) => {
              event.stopPropagation()
              if (disableCreate) {
                globalNxController.showMsg({
                  msgType: '错误',
                  content: '仅项目创建人可创建分组'
                })
              } else {
                onChangeEdit()
              }
            }}
          >
            <CircleAdd />
            <span>创建分组</span>
          </div>
        )}
        {edit && (
          <div className={styles.edit}>
            <Input
              maxLength={NORMAL_LEN}
              ref={inputRef}
              onKeyPress={kePressHandle}
              placeholder="输入名称，回车创建"
            />
          </div>
        )}
      </footer>
    </div>
  )
}

type IBuildItem = {
  onSelect: (data: IProjectGroup) => void
  isChecked: boolean
  item: IProjectGroup
}
const BuildItem = (props: IBuildItem) => {
  const { item, onSelect, isChecked } = props

  return (
    <CheckItemRow<IProjectGroup>
      className={styles.item}
      state={isChecked ? CheckBoxState.checked : CheckBoxState.unset}
      onClick={onSelect}
      data={item}
    >
      <div className={styles.title}>
        <div className={styles.p}>
          <FlyTextTooltip text={item.name} />
        </div>
      </div>
    </CheckItemRow>
  )
}
