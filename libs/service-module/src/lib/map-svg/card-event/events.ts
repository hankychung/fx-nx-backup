import { getDataId } from '../draw/get'
import { collapse, collapseS, expand, expandS } from '../draw/handle'
import { Mdata } from '../type/mdata'
import { styleName } from '../card/css'
import { svgEle } from '../d3/element'

export const onClickExpandBtn = async (_e: MouseEvent, d: Mdata) => {
  console.log('onClickExpandBtn')

  if (d.collapse) expand(d.id)
  else collapse(d.id)
}

export const onClickSExpandBtn = async (_e: MouseEvent, d: Mdata) => {
  console.log('onClickSExpandBtn')

  if (d.superior_collapse) expandS(d.id)
  else collapseS(d.id)
}

export function selectGNode(d: Mdata): void {
  if (!svgEle.value) return

  const svgE = svgEle.value

  const ele = svgE.querySelector<SVGGElement>(`g[data-id='${getDataId(d)}']`)

  const oldSele = svgE.getElementsByClassName(styleName.selected)[0]

  if (ele) {
    if (oldSele) {
      if (oldSele !== ele) {
        oldSele.classList.remove(styleName.selected)
        oldSele.classList.remove(styleName.isCreateCard)

        ele.classList.add(styleName.selected)
      }
    } else {
      ele.classList.add(styleName.selected)
    }
  } else {
    throw new Error('selectGNode failed')
  }
}

export const onSelect = (e: MouseEvent, d: Mdata): void => {
  e.stopPropagation()
  selectGNode(d)
}
