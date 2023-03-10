/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 15:49:02
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-10 15:54:12
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/components/CheckItem/SingleCircleCheckBox/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import IMG_CHECKED_TRUE from '../../../../../assets/payImg/checked.svg'
// import IMG_CHECKED_TRUE_BLUE from '../../../../../assets/payImg/un_checked.svg'
import IMG_CHECKED_FALSE from '../../../../../assets/payImg/un_checked.svg'
// import IMG_DISABLED from '../../../../../assets/payImg/un_checked.svg'

export enum CheckBoxState {
  checked = 'checked',
  disable = 'disable',
  unset = 'unset',
}

export enum CheckColorType {
  GREEN = '',
  BLUE = 'BLUE',
}

type IProps = {
  state?: CheckBoxState
  size?: number
  colorType?: CheckColorType
}

function _CircleCheckBox(props: IProps) {
  const { state = CheckBoxState.unset, size = 16, colorType = '' } = props

  const _state = {
    checked:
      colorType === CheckColorType.BLUE ? IMG_CHECKED_TRUE : IMG_CHECKED_TRUE,
    unset: IMG_CHECKED_FALSE,
    disable: IMG_CHECKED_TRUE,
  }[state]

  return (
    <>
      <img style={{ width: size, height: size }} alt="" src={_state} />
    </>
  )
}

export const CircleCheckBox = React.memo(_CircleCheckBox)
