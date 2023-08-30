import { FlyDoc } from '@flyele-nx/types'
import { FileItem } from '../file-item'
import style from './index.module.scss'
import { DeleteOrCloseIcon } from '@flyele-nx/icon'

interface IProps {
  list: FlyDoc[]
  onDel?: (item: FlyDoc) => void
}

export const Target = ({ list, onDel }: IProps) => {
  return (
    <div className={style.container}>
      {list.map((item) => {
        return (
          <div className={style.item} key={item.file_id}>
            <FileItem item={item} />
            <DeleteOrCloseIcon
              onClick={() => {
                onDel?.(item)
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )
      })}
    </div>
  )
}
