import { draw } from '.'
import { CreateProxy } from '../type/bin'
import { mmdata } from './const'

export const DeleteDom = CreateProxy<string[]>([])

export const afterOperation = () => {
  while (DeleteDom.value.length > 0) {
    // const dom = document.querySelector(DeleteDom.value.shift() as string)

    document.querySelector(DeleteDom.value.shift() as string)?.remove()
  }

  draw()
}

export const expand = (id: string): void => {
  if (!mmdata.value) return

  mmdata.value.expand(id)
  afterOperation()
}

export const expandS = (id: string): void => {
  if (!mmdata.value) return

  mmdata.value.expandS(id)
  afterOperation()
}

export const collapse = (id: string): void => {
  if (!mmdata.value) return

  mmdata.value.collapse(id)
  afterOperation()
}

export const collapseS = (id: string): void => {
  if (!mmdata.value) return

  mmdata.value.collapseS(id)
  afterOperation()
}
