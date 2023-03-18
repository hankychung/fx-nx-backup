import { MapSvgConfig } from '../config'
import { CreateMapProxy, CreateMapProxyValueGet } from '../type/bin'
import * as d3 from './d3-import'
import { gEleGet, svgEleGet } from './element'
import { watchZoomTransform } from './scrollBar'
import { gGet, selectionSvg, svgGet } from './selection'

// 平移范围
export const transitionExtent = (
  key: string,
  transformInfo: d3.ZoomTransform
): boolean => {
  const svgEle = svgEleGet(key)
  const gEle = gEleGet(key)

  if (!gEle || !svgEle) return false

  const { height: h, width: w } = svgEle.getBoundingClientRect()
  const { x: baseX, y: baseY } = gEle.getBBox()
  const { height: _h, width: _w } = gEle.getBoundingClientRect()
  const { k, x, y } = transformInfo
  const minLeft = Math.abs(k * Math.abs(baseX) - x)
  const minTop = Math.abs(k * Math.abs(baseY) - y)
  const width = Math.max(w, _w)
  const height = Math.max(h, _h)
  if (
    minLeft < width * 2 &&
    minLeft >= -width * 2 &&
    minTop < height * 2.5 &&
    minTop >= -height * 2
  ) {
    return true
  }
  return false
}

// 双指移动
export const onZoomFilter = (event: WheelEvent, key: string): boolean => {
  if (event.type === 'wheel' && key) {
    const zoomTransform = zoomTransformGet(key)

    if (!zoomTransform) return false

    const { deltaX, deltaY, ctrlKey } = event

    const { x: _x, y: _y, k } = zoomTransform
    let x = _x,
      y = _y
    if (ctrlKey) {
      // 缩放
      return true
    } else {
      // 移动
      x += -deltaX
      y += -deltaY
    }

    const t = d3.zoomIdentity.translate(x, y).scale(k)

    const svg = svgGet(key)
    const zoomFn = zoomMapGet(key)

    svg && zoomFn && zoomFn.transform(svg, t)
    return false
  }
  return !event.ctrlKey && !event.button
}

export const onZoomMove = (
  e: d3.D3ZoomEvent<SVGSVGElement, null>,
  key: string
): void => {
  const g = gGet(key)
  const zoomT = zoomTransformGet(key)

  if (!g || !zoomT) return

  let _k = e.transform.k
  if (zoomT.k !== _k) {
    _k = Number((_k * 100).toFixed(2).replace('.00', ''))
  }
  /* 旧方法 */
  // 限制移动范围
  if (transitionExtent(key, e.transform)) {
    zoomTransform[key] = e.transform
    g.attr('transform', e.transform.toString())
  }
}

export const scaleTo = (key: string, k: number) => {
  const svg = svgGet(key)
  const gEle = gEleGet(key)
  const svgEle = svgEleGet(key)

  const zoomFn = zoomMapGet(key)

  if (!svg || !gEle || !svgEle || !zoomFn) {
    return
  }

  zoomFn.scaleTo(svg, k)
}

export const zoomTransform = CreateMapProxy<d3.ZoomTransform>((nV, oV, key) => {
  if (key) {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      watchZoomTransform(nV, oV, key)
    })
  }
})
export const zoomTransformGet = CreateMapProxyValueGet(zoomTransform)

type d3ZoomBehavior = d3.ZoomBehavior<SVGSVGElement, null>
export const zoomMap = CreateMapProxy<d3ZoomBehavior>()
export const zoomMapGet = CreateMapProxyValueGet(zoomMap)

export const zoom = (svg: selectionSvg, key: string) => {
  if (!svg) return

  zoomMap[key] = d3
    .zoom<SVGSVGElement, null>()
    .filter((e) => onZoomFilter(e, key))
    .on('zoom', (e) => onZoomMove(e, key))
    .scaleExtent(MapSvgConfig.scaleExtent)

  const zoomFn = zoomMapGet(key)

  if (zoomFn) zoomFn(svg)
}
