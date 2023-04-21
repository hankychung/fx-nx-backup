import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'
import {
  CheckBoxState,
  CheckColorType,
  CircleCheckBox
} from '../single-circle-check-box'
import styles from './index.module.scss'

/**
 * 纯UI组件
 */

type IProps<T> = {
  id?: string
  data: T
  state?: CheckBoxState
  onClick: (item: T) => void
  className?: string
  active?: boolean
  colorType?: CheckColorType
}

function _CheckItemRow<T>(props: PropsWithChildren<IProps<T>>) {
  const { data, children, state, onClick, className, id, active, colorType } =
    props

  return (
    <div
      id={id}
      style={{ color: state === CheckBoxState.disable ? '#bebebe' : undefined }}
      className={classNames(styles.listItem, className, {
        [styles.listItemActive]: active
      })}
      onClick={(e) => {
        e.stopPropagation()
        onClick(data)
      }}
    >
      {children}
      <div className={styles.check}>
        <CircleCheckBox size={16} state={state} colorType={colorType} />
      </div>
    </div>
  )
}

export const SingleCheckItemRow = React.memo(
  _CheckItemRow
) as typeof _CheckItemRow
