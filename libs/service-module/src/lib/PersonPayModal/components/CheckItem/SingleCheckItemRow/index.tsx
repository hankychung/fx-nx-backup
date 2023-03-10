/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 15:49:02
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 15:51:57
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/components/CheckItem/SingleCheckItemRow/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'
import {
  CheckBoxState,
  CheckColorType,
  CircleCheckBox
} from '../SingleCircleCheckBox'
import styles from './index.module.scss'

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
      onClick={() => onClick(data)}
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
