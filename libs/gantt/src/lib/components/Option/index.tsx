import { I18N, isCN } from '@flyele-nx/i18n'
import { ReactComponent as GroupIcon } from '../../../assets/icons/groupIcon.svg'
import { ReactComponent as DisplayIcon } from '../../../assets/icons/displayIcon.svg'

import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import groupSelected from '../../../assets/icons/mode-group-selected.svg'
import groupUnselected from '../../../assets/icons/mode-group-unselected.svg'
import flatSelected from '../../../assets/icons/mode-flat-selected.svg'
import flatunSelected from '../../../assets/icons/mode-flat-unselected.svg'
import chosenIcon from '../../../assets/icons/chosen.svg'
import React, { useState } from 'react'

import { createPortal } from 'react-dom'

import { GroupSelector } from './GroupSelector'
import style from './index.module.scss'
import { FullShowMode } from '@flyele-nx/constant'
import cs from 'classnames'

const Option: React.FC<
  React.PropsWithChildren<{ setFullShowMode: (_: FullShowMode) => void }>
> = ({ children, setFullShowMode }) => {
  const [showOption, _setShowOption] = useState(false)
  const [mode, setMode] = useState(FullShowMode.group)
  const ctrl = useController(new FlyBasePopperCtrl())
  const controller = useController(new FlyBasePopperCtrl())
  const arr = [
    {
      groupMode: groupSelected,
      faltMode: groupUnselected,
      title: I18N.common.convergenceDisplay,
      info: I18N.common.recurringMattersOnly,
      anotherInfo: I18N.common.collectionOfDescendantsMatters,
      key: FullShowMode.group
    },
    {
      faltMode: flatSelected,
      groupMode: flatunSelected,
      title: I18N.common.tileDisplay,
      info: I18N.common.circularEventDisplay,
      anotherInfo: I18N.common.listOfDescendantsMatters,
      key: FullShowMode.flat
    }
  ]

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
              <span className={style['btn-text']}>{I18N.common.group_by}</span>
            </div>
          </FlyBasePopper>
          <FlyBasePopper
            trigger="click"
            placement="bottom"
            showArrow={false}
            controller={controller}
            content={() => {
              return (
                <div
                  className={style.wrapper}
                  style={{ width: isCN ? '' : '403px' }}
                >
                  <div className={cs(style.title, 'bold')}>
                    {I18N.common.eventDisplayModule}
                  </div>
                  {arr.map(
                    ({
                      groupMode,
                      faltMode,
                      title,
                      info,
                      anotherInfo,
                      key
                    }) => (
                      <div
                        className={cs(style.mode, {
                          [style['mode-gray']]: mode !== key
                        })}
                        key={key}
                        onClick={() => {
                          if (key === mode) return
                          setFullShowMode(key)
                          setMode(key)
                          // fulldoseHandlerCtx.current?.setShowMode(key)
                          controller.hide()
                        }}
                      >
                        <img
                          src={
                            mode === FullShowMode.group ? groupMode : faltMode
                          }
                          alt=""
                        />
                        <div>
                          <div className={cs(style.sub, 'bold')}>
                            {mode === key ? (
                              <img
                                src={chosenIcon}
                                alt=""
                                className={style.icon}
                              />
                            ) : (
                              <div className={style.icon} />
                            )}
                            <span>{title}</span>
                          </div>
                          <div className={style.info}>{info}</div>
                          <div className={style.info}>{anotherInfo}</div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )
            }}
          >
            <div className={style.option}>
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
            </div>
          </FlyBasePopper>
        </>
      )}
      {/* <Dropdown
        open={showOption}
        onOpenChange={() => {
          console.log('000')
        }}
        overlay={buildOptionMain()}
        trigger={['click']}
        overlayStyle={{
          zIndex: 1000
        }}
      >
        {children || (
          <div className={style.option}>
            <img src={tableHeader} alt="" />
            <TableHeader />
            <span className={style['btn-text']}>表头</span>
          </div>
        )}
      </Dropdown> */}
      {showOption &&
        createPortal(<div className={style['full-mask']} />, document.body)}
    </div>
  )
}

export default Option
