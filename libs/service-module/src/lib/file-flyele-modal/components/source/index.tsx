import { FileItem } from '../file-item'
import { FlyDoc } from '@flyele-nx/types'
import style from './index.module.scss'
import { RadioUncheck, Radiocheck } from '@flyele-nx/icon'

interface IProps {
  onCheck?: (item: FlyDoc) => void
  onDel?: (item: FlyDoc) => void
  containerRef: React.RefObject<HTMLDivElement>
  dataSource: FlyDoc[]
  target: FlyDoc[]
}

export const Source = ({
  onCheck,
  onDel,
  containerRef,
  dataSource,
  target
}: IProps) => {
  return (
    <div className={style.container} ref={containerRef}>
      {dataSource.map((item) => {
        const check = target.find((i) => i.file_id === item.file_id)
        return (
          <div
            className={style.item}
            key={item.file_id}
            onClick={() => (check ? onDel?.(item) : onCheck?.(item))}
          >
            {check ? (
              <Radiocheck className={style.icon} color="#1DD2C1" />
            ) : (
              <RadioUncheck className={style.icon} />
            )}
            <FileItem item={item} />
          </div>
        )
      })}
    </div>
  )
}
