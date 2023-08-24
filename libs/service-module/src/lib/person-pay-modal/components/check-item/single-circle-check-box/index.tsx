/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 15:49:02
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-04-20 11:49:07
 * @FilePath: /fx-nx/libs/service-module/src/lib/PersonPayModal/components/CheckItem/SingleCircleCheckBox/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { ReactComponent as IMG_CHECKED_TRUE } from '../../../../../assets/payImg/checked.svg'
// import IMG_CHECKED_TRUE_BLUE from '../../../../../assets/payImg/un_checked.svg'
import { ReactComponent as IMG_CHECKED_FALSE } from '../../../../../assets/payImg/un_checked.svg'
// import IMG_CHECKED_FALSE from '../../../../../assets/payImg/un_checked.svg'
import { ReactComponent as IMG_DISABLED } from '../../../../../assets/payImg/member_disable.svg'
import { CheckBoxState, CheckColorType } from '@flyele-nx/constant'

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

  return <div id="circleCheckBox">{_state}</div>
}

export const CircleCheckBox = React.memo(_CircleCheckBox)
