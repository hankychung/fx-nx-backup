import { objectiveApi } from '@flyele-nx/api'
import { draw } from '.'
import { MapSvgConfig } from '../config'
import { d3 } from '../d3'
import { gEleGet, svgEleGet, wrapperEleGet } from '../d3/element'
import { svgGet } from '../d3/selection'
import { zoomMapGet, zoomTransformGet } from '../d3/zoom'
import { CreateProxy } from '../type/bin'
import { Mdata } from '../type/mdata'
import { formatMdata } from '../utils/formart'
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

  if (!mmdata || mmdata.expandLock[d.id]) return

  mmdata.expandLock[d.id] = true

  if (d._children.length) {
    mmdata.expand(d.id)
    afterOperation(d.componentKey)
    mmdata.expandLock[d.id] = false
  } else {
    objectiveApi
      .getSnapList({ objective_id: d.target_id as unknown as string })
      .then((data) => {
        const datas = formatMdata(data)

        for (const [index, value] of Object.entries(datas.children)) {
          d._children.push(
            mmdata.createMdataFromData(value, `${d.id}-${Number(index)}-c`, d)
          )
        }

        console.log('_children', datas, data, d)

        delete d.children_total

        mmdata.expand(d.id)
        afterOperation(d.componentKey)
      })
      .finally(() => {
        mmdata.expandLock[d.id] = false
      })
  }
}

export const expandS = (d: Mdata): void => {
  const mmdata = mmdataGet(d.componentKey)

  if (!mmdata || mmdata.expandLock[d.id]) return
  mmdata.expandLock[d.id] = true

  if (d._superiors.length) {
    mmdata.expandS(d.id)
    afterOperation(d.componentKey)
    mmdata.expandLock[d.id] = false
  } else {
    objectiveApi
      .getSnapList({ objective_id: d.target_id as unknown as string })
      .then((data) => {
        const datas = formatMdata(data)

        for (const [index, value] of Object.entries(datas.superiors)) {
          d._superiors.push(
            mmdata.createMdataFromData(value, `${d.id}-${Number(index)}-s`, d)
          )
        }

        console.log('_superiors', datas, data, d)

        delete d.superiors_total

        mmdata.expandS(d.id)
        afterOperation(d.componentKey)
      })
      .finally(() => {
        mmdata.expandLock[d.id] = false
      })
  }
}

export const collapse = (d: Mdata): void => {
  const mmdata = mmdataGet(d.componentKey)

  if (!mmdata || mmdata.expandLock[d.id]) return

  mmdata.collapse(d.id)
  afterOperation(d.componentKey)
}

export const collapseS = (d: Mdata): void => {
  const mmdata = mmdataGet(d.componentKey)

  if (!mmdata || mmdata.expandLock[d.id]) return

  mmdata.collapseS(d.id)
  afterOperation(d.componentKey)
}

export const toCenter = (
  key: string,
  isFit = false,
  options?: { max?: number }
): void => {
  const { max } = options || {}

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

  console.log('toCenter', multiple)

  if (isFit) {
    multiple = Math.max(multiple, MapSvgConfig.scaleExtent[0])
  }

  console.log('toCenter isFit', multiple)

  if (max) {
    multiple = Math.min(max, multiple)
  }

  console.log('toCenter max', multiple)

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
