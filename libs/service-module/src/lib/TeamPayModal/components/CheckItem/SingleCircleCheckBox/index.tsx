import React from 'react'
import IMG_CHECKED_TRUE from '../../../../../assets/payImg/checked.svg'
// import IMG_CHECKED_TRUE_BLUE from '@/assets/payImg/un_checked.svg'
import IMG_CHECKED_FALSE from '../../../../../assets/payImg/un_checked.svg'
// import IMG_DISABLED from '@/assets/payImg/un_checked.svg'

export enum CheckBoxState {
  checked = 'checked',
  disable = 'disable',
  unset = 'unset'
}

export enum CheckColorType {
  GREEN = '',
  BLUE = 'BLUE'
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
    disable: IMG_CHECKED_TRUE
  }[state]

  return (
    <>
      <img style={{ width: size, height: size }} alt="" src={_state} />
    </>
  )
}

export const CircleCheckBox = React.memo(_CircleCheckBox)
