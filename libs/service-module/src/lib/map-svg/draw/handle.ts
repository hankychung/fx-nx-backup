import { draw } from '.'
import { CreateProxy } from '../type/bin'

export const DeleteDom = CreateProxy<string[]>([])

export const afterOperation = () => {
  while (DeleteDom.value.length > 0) {
    document.querySelector(DeleteDom.value.shift() as string)?.remove()
  }

  draw()
}
