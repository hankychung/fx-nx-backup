import React, { PropsWithChildren } from 'react'

import classNames from 'classnames'
import styles from './index.module.scss'
import { CircleCheckBox } from '../../../../../person-pay-modal/components/check-item/single-circle-check-box'
import { CheckBoxState, CheckColorType } from '@flyele-nx/constant'

/**
 * 纯UI组件
 */

type IProps<T = any> = {
  id?: string
  data: T
  state?: CheckBoxState
  onClick: (item: T) => void
  className?: string
  active?: boolean
  colorType?: CheckColorType
  isClickIcon?: boolean
}

function _CheckItemRow<T>(props: PropsWithChildren<IProps<T>>) {
  const {
    data,
    children,
    state,
    onClick,
    className,
    id,
    active,
    colorType,
    isClickIcon
  } = props

  return (
    <div
      id={id}
      style={{ color: state === CheckBoxState.disable ? '#bebebe' : undefined }}
      className={classNames(styles.listItem, className, {
        [styles.listItemActive]: active
      })}
      onClick={() => {
        if (state === CheckBoxState.disable) return
        !isClickIcon && onClick(data)
      }}
    >
      {children}
      <div
        className={styles.check}
        onClick={() => {
          isClickIcon && onClick(data)
        }}
      >
        <CircleCheckBox
          size={20}
          state={state}
          colorType={CheckColorType.GREEN}
        />
      </div>
    </div>
  )
}

export const CheckItemRow = React.memo(_CheckItemRow) as typeof _CheckItemRow
