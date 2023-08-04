import { FC, memo } from 'react'
import style from './index.module.scss'
import { HeaderActions } from '../../const'
import { Create } from './components/create'

interface ITab {
  key: HeaderActions
  icon: JSX.Element | string
}

interface IProps {
  actions: ITab[]
}

const _Actions: FC<React.PropsWithChildren<IProps>> = ({ actions }) => {
  return (
    <div className={style.header}>
      {actions.map((item) => {
        if (item.key === HeaderActions.CREATE) {
          return (
            <div key={item.key}>
              <Create />
            </div>
          )
        }
        return (
          <div key={item.key} className={style.item}>
            {item.icon}
          </div>
        )
      })}
    </div>
  )
}

export const Actions = memo(_Actions)
