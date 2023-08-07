import {
  PersonVipIcon,
  PersonIcon,
  DiamondSpaceIcon,
  PersonFreeIcon
} from '@flyele-nx/icon'
import { useMemo } from 'react'

interface IProps {
  type: 'vip' | 'space' | 'private' | 'normal' | 'free'
  size?: number
}

export const Diamond = (props: IProps) => {
  const size = props.size || 20

  const icon = useMemo(() => {
    switch (props.type) {
      case 'vip':
        return <PersonVipIcon />
      case 'space':
        return <DiamondSpaceIcon />
      case 'free':
        return <PersonFreeIcon />
      case 'normal':
      default:
        return <PersonIcon />
    }
  }, [props.type])

  return <div style={{ width: size, height: size }}>{icon}</div>
}
