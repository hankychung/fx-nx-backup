import React, { memo } from 'react'
import { Popover } from 'antd'
import { TooltipPlacement } from 'antd/lib/tooltip'

import InfosModalLayer from './info-modal-layer/index'

interface Props {
  visible: boolean
  visibleChange?: (value: boolean) => void
  handleClickOnlyOne: (arg0: any) => void
  handleClickAll: (arg0: any) => void
  checkIsFinishLoadChild?: () => void
  children: any
  taskList?: string[]
  typeName?: any
  cycle?: number
  overlayClassName?: string
  //
  popoverPos?: TooltipPlacement
}

const PopoverAcceptOnceMany: React.FC<React.PropsWithChildren<Props>> = ({
  visible,
  visibleChange,
  handleClickOnlyOne,
  handleClickAll,
  checkIsFinishLoadChild = () => {},
  children,
  taskList = [],
  typeName = 'accept',
  popoverPos = 'bottomLeft',
  cycle
}) => {
  const handleVisibleChange = (value: boolean) => {
    console.log('handleVisibleChange', value)

    // console.trace()
    // debugger
    // 假如当关闭气泡框时，则把显示状态置回false
    visibleChange && visibleChange(value)

    // if (value === true) {
    //   checkIsFinishLoadChild()
    // }
  }

  // console.log('taskList', taskList)

  // 气泡框的内容

  return (
    <Popover
      content={() => (
        <InfosModalLayer
          taskList={taskList}
          typeName={typeName}
          handleClickOnlyOne={handleClickOnlyOne}
          handleClickAll={handleClickAll}
        />
      )}
      title={null}
      trigger="click"
      open={visible}
      onOpenChange={handleVisibleChange}
      placement={(popoverPos as TooltipPlacement) || 'topLeft'}
      destroyTooltipOnHide
      overlayInnerStyle={{ padding: 0 }}
    >
      {children}
    </Popover>
  )
}

export default memo(PopoverAcceptOnceMany)
