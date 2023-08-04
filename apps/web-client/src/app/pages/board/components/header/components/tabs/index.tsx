import { RoutePath } from '../../../../../../../../../../apps/web-client/src/app/routes/const'
import { FC, memo } from 'react'
import style from './index.module.scss'
import cs from 'classnames'

interface ITab {
  txt: string
  key: RoutePath
}

interface IProps {
  tabs: ITab[]
  activeTab: RoutePath
  onChange: (key: RoutePath) => void
}

const _Tabs: FC<React.PropsWithChildren<IProps>> = ({
  tabs,
  onChange,
  activeTab
}) => {
  return (
    <div className={style.header}>
      {tabs.map((item) => {
        return (
          <div
            key={item.key}
            className={cs(style.item, {
              [style.activeItem]: activeTab === item.key
            })}
            onClick={() => onChange(item.key)}
          >
            {item.txt}
          </div>
        )
      })}
    </div>
  )
}

export const Tabs = memo(_Tabs)
