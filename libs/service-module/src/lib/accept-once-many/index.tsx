import React, { memo } from 'react'
import { Popover } from 'antd'
import { TooltipPlacement } from 'antd/lib/tooltip'

import InfosModalLayer, { charsDict } from './info-modal-layer/index'

interface Props {
  visible: boolean
  visibleChange?: (value: boolean) => void
  handleClickOnlyOne: () => void
  handleClickAll: () => void
  checkIsFinishLoadChild?: () => void
  taskList?: string[]
  typeName?: keyof typeof charsDict
  cycle?: number
  overlayClassName?: string
  popoverPos?: TooltipPlacement
}

const PopoverAcceptOnceMany: React.FC<React.PropsWithChildren<Props>> = ({
  visible,
  visibleChange,
  handleClickOnlyOne,
  handleClickAll,
  children,
  taskList = [],
  typeName = 'accept',
  popoverPos = 'bottomLeft'
}) => {
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
      onOpenChange={visibleChange}
      placement={(popoverPos as TooltipPlacement) || 'topLeft'}
      destroyTooltipOnHide
      overlayInnerStyle={{ padding: 0 }}
    >
      {children}
    </Popover>
  )
}

export const AcceptOnceMany = memo(PopoverAcceptOnceMany)
