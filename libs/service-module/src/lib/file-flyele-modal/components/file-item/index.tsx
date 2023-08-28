import { memo } from 'react'
import style from './index.module.scss'
import { FlyTextTooltip } from '@flyele/flyele-components'
import { FlyDoc } from '@flyele-nx/types'
import { getFileIcon } from '@flyele-nx/utils'

interface IProps {
  item: FlyDoc
}

const _FileItem = ({ item }: IProps) => {
  return (
    <div className={style.container}>
      <img
        className={style.icon}
        src={getFileIcon(item.file_name, 'small')}
        alt=""
      />
      <div className={style.info}>
        <FlyTextTooltip className={style.info_title} text={item.file_name} />
        <span className={style.info_desc}>{item.flyele_name}</span>
      </div>
    </div>
  )
}

export const FileItem = memo(_FileItem)
