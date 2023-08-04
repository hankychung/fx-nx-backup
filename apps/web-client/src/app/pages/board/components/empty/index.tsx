import React, { FC, CSSProperties } from 'react'
import style from './index.module.scss'

enum NullKey {
  ACCEPT = 'ACCEPT',
  DISPATCH = 'DISPATCH',
  LIKE = 'LIKE',
  PERSONAL = 'PERSONAL'
}

const TXT = '空空如也'

// const dict = {
//   [NullKey.ACCEPT]: {
//     icon: acceptIcon,
//     txt: TXT,
//   },
//   [NullKey.DISPATCH]: {
//     icon: dispatchIcon,
//     txt: TXT,
//   },
//   [NullKey.LIKE]: {
//     icon: likeIcon,
//     txt: TXT,
//   },
//   [NullKey.PERSONAL]: {
//     icon: likeIcon,
//     txt: TXT,
//   },
// }

const Empty: FC<React.PropsWithChildren<{ style?: CSSProperties }>> = ({
  style: innserStyle = {}
}) => {
  return (
    <div className={style.nothing} style={innserStyle}>
      {/* <img src={dict[type].icon} alt="" />
      <div>{dict[type].txt}</div> */}
      {TXT}
    </div>
  )
}

export { Empty, NullKey }
