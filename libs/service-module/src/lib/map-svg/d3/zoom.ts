import { MapSvgConfig } from '../config'
import { CreateProxy } from '../type/bin'
import * as d3 from './d3-import'
import { gEle, svgEle } from './element'
import { watchZoomTransform } from './scrollBar'
import { g, svg } from './selection'

// 平移范围
export const transitionExtent = (transformInfo: d3.ZoomTransform): boolean => {
  if (!svgEle.value || !gEle.value) return false

  const { height: h, width: w } = svgEle.value.getBoundingClientRect()
  const { x: baseX, y: baseY } = gEle.value.getBBox()
  const { height: _h, width: _w } = gEle.value.getBoundingClientRect()
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
export const onZoomFilter = (event: WheelEvent): boolean => {
  // return (!event.ctrlKey ||event.type === 'wheel') && !event.button;

  if (event.type === 'wheel') {
    const { deltaX, deltaY, ctrlKey } = event

    const { x: _x, y: _y, k } = zoomTransform.value
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
    svg.value && zoom.transform(svg.value, t)
    return false
  }
  return !event.ctrlKey && !event.button
}

export const onZoomMove = (e: d3.D3ZoomEvent<SVGSVGElement, null>): void => {
  if (!g.value) {
    return
  }
  let _k = e.transform.k
  if (zoomTransform.value.k !== _k) {
    _k = Number((_k * 100).toFixed(2).replace('.00', ''))
  }
  /* 旧方法 */
  // 限制移动范围
  if (transitionExtent(e.transform)) {
    zoomTransform.value = e.transform
    g.value.attr('transform', e.transform.toString())
  }
}

export const zoomTransform = CreateProxy(
  d3.zoomIdentity,
  (newValue, oldValue) => {
    watchZoomTransform(newValue, oldValue)
  }
)

export const zoom = d3
  .zoom<SVGSVGElement, null>()
  .filter(onZoomFilter)
  .on('zoom', onZoomMove)
  .scaleExtent(MapSvgConfig.scaleExtent)
