import React, { MouseEvent } from 'react'
import styles from './index.module.scss'
import { MenuIcon } from '@flyele-nx/icon'
import cs from 'classnames'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  visible: boolean
  openMenu: (e: MouseEvent<HTMLDivElement>) => void
  isDarkMode?: boolean
}

const _MenuBtn = ({ visible, openMenu, isDarkMode = false }: IProps) => {
  const onOpenMenu = useMemoizedFn((e) => {
    e.stopPropagation()
    openMenu(e)
  })

  return (
    <div
      className={cs(styles.menuBtn, {
        [styles.visible]: visible,
        [styles.darkMode]: isDarkMode
      })}
      onClick={onOpenMenu}
    >
      <MenuIcon width={16} height={16} color="#92929D" />
    </div>
  )
}

export const MenuBtn = React.memo(_MenuBtn)
