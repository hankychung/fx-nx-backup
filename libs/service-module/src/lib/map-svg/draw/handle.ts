import { draw } from '.'
import { MapSvgConfig } from '../config'
import { d3 } from '../d3'
import { gEleGet, svgEleGet, wrapperEleGet } from '../d3/element'
import { svgGet } from '../d3/selection'
import { zoomMapGet, zoomTransformGet } from '../d3/zoom'
import { CreateProxy } from '../type/bin'
import { Mdata } from '../type/mdata'
import { mmdataGet } from './const'

export const DeleteDom = CreateProxy<string[]>([])

export const afterOperation = (key: string) => {
  const wrapper = wrapperEleGet(key)

  if (wrapper) {
    while (DeleteDom.value.length > 0) {
      wrapper.querySelector(DeleteDom.value.shift() as string)?.remove()
    }
  }

  draw(key)
}

export const expand = (d: Mdata): void => {
  const mmdata = mmdataGet(d.componentKey)

  if (!mmdata) return

  mmdata.expand(d.id)
  afterOperation(d.componentKey)
}

export const expandS = (d: Mdata): void => {
  const mmdata = mmdataGet(d.componentKey)

  if (!mmdata) return

  mmdata.expandS(d.id)
  afterOperation(d.componentKey)
}

export const collapse = (d: Mdata): void => {
  const mmdata = mmdataGet(d.componentKey)

  if (!mmdata) return

  mmdata.collapse(d.id)
  afterOperation(d.componentKey)
}

export const collapseS = (d: Mdata): void => {
  const mmdata = mmdataGet(d.componentKey)

  if (!mmdata) return

  mmdata.collapseS(d.id)
  afterOperation(d.componentKey)
}

export const toCenter = (key: string, isFit = false): void => {
  const svg = svgGet(key)
  const gEle = gEleGet(key)
  const svgEle = svgEleGet(key)
  const zoomT = zoomTransformGet(key)

  if (!svg || !gEle || !svgEle || !zoomT) {
    return
  }
  const gBB = gEle.getBBox()
  const svgBCR = svgEle.getBoundingClientRect()
  const svgCenter = { x: svgBCR.width / 2, y: svgBCR.height / 2 }
  let multiple = isFit
    ? Math.min(svgBCR.width / gBB.width, svgBCR.height / gBB.height)
    : zoomT.k

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

  const zoomFn = zoomMapGet(key)

  zoomFn && zoomFn.transform(svg, center)
}
