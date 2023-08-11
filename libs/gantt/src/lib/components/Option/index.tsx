import { Dropdown } from 'antd'

import { ReactComponent as TableHeader } from '../../../assets/icons/table-header.svg'
import { ReactComponent as DisplayIcon } from '../../../assets/icons/displayIcon.svg'
import { ReactComponent as GroupIcon } from '../../../assets/icons/groupIcon.svg'

import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
// import { DisplayMode } from 'pages/full-dose/components/DisplayMode'
import React, { useState } from 'react'

import { createPortal } from 'react-dom'

import { GroupSelector } from './GroupSelector'
import style from './index.module.scss'
// import Drag from './Drag'

const Option: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [showOption, _setShowOption] = useState(false)

  const ctrl = useController(new FlyBasePopperCtrl())

  return (
    <div id="projectGantt" className={style.optionsHeader}>
      {!children && (
        <>
          <FlyBasePopper
            controller={ctrl}
            useMask
            useMaskClickHide
            showArrow={false}
            placement="bottom-end"
            content={() => (
              <GroupSelector
                handleSelect={() => {
                  ctrl.hide()
                }}
              />
            )}
            destroyPopperOnHide
            trigger="click"
          >
            <div className={style.option}>
              {/* <img src={groupIcon} alt="" /> */}
              <GroupIcon />
              <span className={style['btn-text']}>分区</span>
            </div>
          </FlyBasePopper>
          {/* <div className={style.option}>
            <div
              className={style.display}
              onClick={() => {
                // headersHandler.current?.setShowTip({
                //   hide: true,
                // })
              }}
            >
              <DisplayIcon />
              <span className={style['btn-text']}>显示</span>
            </div>
          </div> */}
        </>
      )}
      <Dropdown
        open={showOption}
        onOpenChange={() => {
          console.log('000')
        }}
        // overlay={buildOptionMain()}
        trigger={['click']}
        overlayStyle={{
          zIndex: 1000
        }}
      >
        {children || (
          <div className={style.option}>
            {/* <img src={tableHeader} alt="" /> */}
            <TableHeader />
            <span className={style['btn-text']}>表头</span>
          </div>
        )}
      </Dropdown>
      {showOption &&
        createPortal(<div className={style['full-mask']} />, document.body)}
    </div>
  )
}

export default Option
