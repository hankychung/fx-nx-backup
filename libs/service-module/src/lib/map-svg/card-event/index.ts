import { SelectionG } from '../type'
import { styleName } from '../card/css'
import { StopPropagation } from '../utils'
import { onClickExpandBtn, onClickSExpandBtn, onSelect } from './events'

export const bindPublicEvent = (g: SelectionG) => {
  const gExpandBtn = g.select(
    `:scope > g.${styleName.content} > g.${styleName['expand-btn']}`
  )
  gExpandBtn.on('click', onClickExpandBtn)

  const gSExpandBtn = g.select(
    `:scope > g.${styleName.content} > g.${styleName['s-expand-btn']}`
  )
  gSExpandBtn.on('click', onClickSExpandBtn)

  const gBox = g.select<SVGGElement>(
    `:scope > g.${styleName.content} > g.${styleName['g-box']}`
  )

  gBox.on('mousedown', onSelect)

  // gBox.on('dblclick', onBoxClick as d3listener)

  const gTakers = gBox.select<SVGGElement>(
    `:scope > g.${styleName['g-partner']}`
  )

  gTakers.on('click', (e: MouseEvent) => {
    e.stopPropagation()

    gTakers.on('dblclick', StopPropagation)
  })
}
