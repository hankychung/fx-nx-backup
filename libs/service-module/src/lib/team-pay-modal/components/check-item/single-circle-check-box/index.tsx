import React from 'react'
// import IMG_DISABLED from '@/assets/payImg/un_checked.svg'
import { ReactComponent as IMG_CHECKED_TRUE } from '../../../../../assets/payImg/checked.svg'
// import IMG_CHECKED_TRUE_BLUE from '../../../../../assets/payImg/un_checked.svg'
import { ReactComponent as IMG_CHECKED_FALSE } from '../../../../../assets/payImg/un_checked.svg'
import { ReactComponent as IMG_DISABLED } from '../../../../../assets/payImg/member_disable.svg'
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
  const { state = CheckBoxState.unset, colorType = '' } = props

  const _state = {
    checked:
      colorType === CheckColorType.BLUE ? (
        <IMG_CHECKED_TRUE width={16} height={16}></IMG_CHECKED_TRUE>
      ) : (
        <IMG_CHECKED_TRUE width={16} height={16}></IMG_CHECKED_TRUE>
      ),
    unset: <IMG_CHECKED_FALSE width={16} height={16}></IMG_CHECKED_FALSE>,
    disable: <IMG_DISABLED width={16} height={16}></IMG_DISABLED>
  }[state]

  return <div>{_state}</div>
}

export const CircleCheckBox = React.memo(_CircleCheckBox)
