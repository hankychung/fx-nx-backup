import { draw } from '.'
import { MapSvgConfig } from '../config'
import { d3 } from '../d3'
import { gEle, svgEle } from '../d3/element'
import { svg } from '../d3/selection'
import { zoom, zoomTransform } from '../d3/zoom'
import { CreateProxy } from '../type/bin'
import { mmdata } from './const'

export const DeleteDom = CreateProxy<string[]>([])

export const afterOperation = () => {
  while (DeleteDom.value.length > 0) {
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

export const toCenter = (isFit = false): void => {
  if (!svg.value || !gEle.value || !svgEle.value) {
    return
  }
  const gBB = gEle.value.getBBox()
  const svgBCR = svgEle.value.getBoundingClientRect()
  const svgCenter = { x: svgBCR.width / 2, y: svgBCR.height / 2 }
  let multiple = isFit
    ? Math.min(svgBCR.width / gBB.width, svgBCR.height / gBB.height)
    : zoomTransform.value.k

  if (isFit) {
    multiple = Math.max(multiple, MapSvgConfig.scaleExtent[0])
  }

  const gCenter = {
    x: (gBB.width * multiple) / 2,
    y: (gBB.height * multiple) / 2
  }

  const center = d3.zoomIdentity
    .translate(
      -gBB.x * multiple + svgCenter.x - gCenter.x,
      -gBB.y * multiple + svgCenter.y - gCenter.y
    )
    .scale(multiple)
  zoom.transform(svg.value, center)
}
