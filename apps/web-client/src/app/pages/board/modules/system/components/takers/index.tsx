import React, { FC, useEffect, useState } from 'react'
import cs from 'classnames'
// import { useInteractsInfo } from '@/hooks/useInteractsInfo'
import style from './index.module.scss'
import { Taker } from '@flyele-nx/types'
import { useContactStore } from '@flyele-nx/zustand-store'

interface Props {
  takers: Taker[]
}

interface Avatar {
  avatar: string
  isVip?: boolean
  isTeamVip?: boolean
}

const Takers: FC<React.PropsWithChildren<Props>> = ({ takers }) => {
  const [avatars, setAvatars] = useState<Avatar[]>([])

  const { interacts } = useContactStore()

  useEffect(() => {
    if (interacts) {
      // TODO: isTeamVip、isVip
      // const _takers = takers.map((i) => {
      //   const { avatar = '' } =
      //     interacts.find((item) => item.user_id === i.taker_id) || {}

      //   return {
      //     ...i,
      //     avatar,
      //     isTeamVip: false,
      //     isVip: false
      //   }
      // })
      // TODO: 排序
      // bizUtils.sortTaker(_takers).then((res) => {
      //   setAvatars(res)
      // })
      setAvatars(
        takers.map((i) => {
          const { avatar = '' } =
            interacts.find((item) => item.user_id === i.taker_id) || {}

          return {
            avatar,
            isTeamVip: false,
            isVip: false
          }
        })
      )
    }
  }, [interacts, takers])

  return (
    <div className={style.takers}>
      {avatars.slice(0, 3).map(({ avatar, isTeamVip, isVip }, idx) => (
        <div
          className={cs(
            style.cycle,
            isTeamVip
              ? 'global-style-team-vip-min'
              : isVip
              ? 'global-style-person-vip-min'
              : ''
          )}
          key={idx}
          style={{ backgroundImage: `url(${avatar})` }}
        />
      ))}
      {avatars.length > 3 ? (
        <div className={cs(style.cycle, 'bold')}>···</div>
      ) : null}
    </div>
  )
}

export default Takers
