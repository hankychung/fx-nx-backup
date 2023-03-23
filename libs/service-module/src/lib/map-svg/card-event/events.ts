import { getDataId } from '../draw/get'
import { collapse, collapseS, expand, expandS } from '../draw/handle'
import { Mdata } from '../type/mdata'
import { styleName } from '../card/css'
import { svgEleGet } from '../d3/element'
import { debounce } from 'lodash'
import { openCardWin } from '../utils/system'

export const onClickExpandBtn = async (_e: MouseEvent, d: Mdata) => {
  if (d.collapse || d.children_total) expand(d)
  else collapse(d)
}

export const onClickSExpandBtn = async (_e: MouseEvent, d: Mdata) => {
  if (d.superior_collapse || d.superiors_total) expandS(d)
  else collapseS(d)
}

export function selectGNode(d: Mdata): void {
  const key = d.componentKey

  const svgE = svgEleGet(key)

  if (!svgE) return

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

export const onBoxClick = debounce((_e: MouseEvent, d: Mdata): void => {
  openCardWin(d)
}, 300)
