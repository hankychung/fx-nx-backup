import { NormalItem } from '../normal-item'
import { RoutePath } from '../../../../../routes/const'

interface IItemByTabKey {
  items: RoutePath[]
}

export const ItemByTabKey = ({ items }: IItemByTabKey) => {
  return (
    <>
      {items.map((key) => {
        return <NormalItem key={key} tabKey={key} />
      })}
    </>
  )
}
