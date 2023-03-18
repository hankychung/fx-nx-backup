/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from './d3-import'
import {
  CreateMapProxy,
  CreateMapProxyValueGet,
  CreateProxy
} from '../type/bin'
import { gEleGet, svgEleGet } from './element'
import {
  transitionExtent,
  zoomMapGet,
  zoomTransform,
  zoomTransformGet
} from './zoom'
import { svgGet } from './selection'

export const hScrollThumbMap = CreateMapProxy<HTMLDivElement | null>()
export const hScrollThumbGet = CreateMapProxyValueGet(hScrollThumbMap)

export const vScrollThumbMap = CreateMapProxy<HTMLDivElement | null>()
export const vScrollThumbGet = CreateMapProxyValueGet(vScrollThumbMap)

export const ScrollBarDontMove = CreateProxy(false)

const attachWidth = CreateMapProxy<number>()
const attachWidthGet = CreateMapProxyValueGet(attachWidth, 0)

const attachHeight = CreateMapProxy<number>()
const attachHeightGet = CreateMapProxyValueGet(attachHeight, 0)

const targetWidth = CreateMapProxy<number>()
const targetWidthGet = CreateMapProxyValueGet(targetWidth, 0)

const targetHeight = CreateMapProxy<number>()
const targetHeightGet = CreateMapProxyValueGet(targetHeight, 0)

const scrollThumbWidth = CreateMapProxy<number>()
const scrollThumbWidthGet = CreateMapProxyValueGet(scrollThumbWidth, 0)

const scrollThumbHeight = CreateMapProxy<number>()
const scrollThumbHeightGet = CreateMapProxyValueGet(scrollThumbHeight, 0)

const startX = CreateMapProxy<number>()
const startXGet = CreateMapProxyValueGet(startX, 0)

const startY = CreateMapProxy<number>()
const startYGet = CreateMapProxyValueGet(startY, 0)

const isScrollingH = CreateMapProxy<boolean>()
const isScrollingHGet = CreateMapProxyValueGet(isScrollingH, false)

const isScrollingV = CreateMapProxy<boolean>()
const isScrollingVGet = CreateMapProxyValueGet(isScrollingV, false)

const topToolsHeight = CreateMapProxy<number>()
const topToolsHeightGet = CreateMapProxyValueGet(topToolsHeight, 0)

export const hMouseDown = (
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
  key: string
): void => {
  isScrollingH[key] = true
  startX[key] = e.pageX
  ScrollBarDontMove.value = false

  const hScrollThumb = hScrollThumbGet(key)

  if (hScrollThumb) {
    hScrollThumb.classList.add('hover')
  }
}
export const vMouseDown = (
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
  key: string
): void => {
  isScrollingV[key] = true
  startY[key] = e.pageY
  ScrollBarDontMove.value = false

  const vScrollThumb = vScrollThumbGet(key)

  if (vScrollThumb) {
    vScrollThumb.classList.add('hover')
  }
}
export const hMouseMove = (
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
  key: string
): void => {
  const hScrollThumb = hScrollThumbGet(key)

  if (!hScrollThumb) return

  if (
    !String(hScrollThumb.style.width).replace('px', '') ||
    ScrollBarDontMove.value
  ) {
    return
  }
  const isScrollingHnum = isScrollingHGet(key)
  const zoomT = zoomTransformGet(key)
  const target = gEleGet(key)
  const scrollThumbW = scrollThumbWidthGet(key)
  const attachW = attachWidthGet(key)

  if (isScrollingHnum && zoomT) {
    const { k, x: gX, y } = zoomT
    const startXnum = startXGet(key)

    const x = e.pageX - startXnum
    const { width } = target?.getBoundingClientRect() as DOMRect
    const { x: _x } = target?.getBBox() as DOMRect
    const tW = Math.max(width * 2 + -_x * k, scrollThumbW)
    const tbx = gX - (x * tW) / attachW

    startX[key] = startXnum + x

    let left =
      Number(
        hScrollThumb.style.transform
          .replace('translateX(', '')
          .replace('px)', '')
      ) + x

    let tbW = Number(hScrollThumb.style.width.replace('px', ''))

    if (left < 0) {
      left = 0
      tbW += x
    } else if (left + tbW > attachW) {
      tbW = attachW - left
    }
    if (tbW < 50) {
      return
    }

    const transformInfo = d3.zoomIdentity.translate(tbx, y).scale(k)

    if (transitionExtent(key, transformInfo)) {
      hScrollThumb.style.width = tbW + 'px'
      hScrollThumb.style.transform = `translateX(${left}px)`
      hScrollThumb.style.display = 'block'

      zoomTransform[key] = transformInfo

      const svg = svgGet(key)
      const zoomFn = zoomMapGet(key)

      svg && zoomFn?.transform(svg, transformInfo)
    }
  }
}
export const vMouseMove = (
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>,
  key: string
): void => {
  e.stopPropagation()

  const vScrollThumb = vScrollThumbGet(key)

  if (!vScrollThumb) return

  if (
    !String(vScrollThumb.style.height).replace('px', '') ||
    ScrollBarDontMove.value
  ) {
    return
  }
  const isScrollingVv = isScrollingVGet(key)

  if (isScrollingVv) {
    const zoomT = zoomTransformGet(key)
    const target = gEleGet(key)

    if (!zoomT) return

    const attachH = attachHeightGet(key)
    const scrollThumbH = scrollThumbHeightGet(key)
    const startYnum = startYGet(key)

    const { k, x, y: gY } = zoomT

    const y = e.pageY - startYnum

    const { height } = target?.getBoundingClientRect() as DOMRect
    const { y: _y } = target?.getBBox() as DOMRect
    const th = Math.max(height * 2 + (-_y + 100) * k, scrollThumbH)
    const tby = gY - (y * th) / attachH

    startY[key] = startYnum + y

    let top =
      Number(
        vScrollThumb.style.transform
          .replace('translateY(', '')
          .replace('px)', '')
      ) + y
    let tbH = Number(vScrollThumb.style.height.replace('px', ''))
    if (top < 0) {
      top = 0
      tbH += y
    } else if (top + tbH > attachH) {
      tbH = attachH - top
    }
    if (tbH < 50) {
      return
    }

    const transformInfo = d3.zoomIdentity.translate(x, tby).scale(k)

    if (transitionExtent(key, transformInfo)) {
      vScrollThumb.style.height = tbH + 'px'
      vScrollThumb.style.transform = `translateY(${top}px)`
      vScrollThumb.style.display = 'block'

      zoomTransform[key] = transformInfo

      const svg = svgGet(key)
      const zoomFn = zoomMapGet(key)

      svg && zoomFn?.transform(svg, transformInfo)
    }
  }
}

export const hMouseUp = (key: string): void => {
  isScrollingH[key] = false

  const zoomT = zoomTransformGet(key)
  const target = gEleGet(key)

  if (!zoomT) return

  const { k, x } = zoomT

  const ox = (target?.getBBox().x as number) * k

  const diffX = -ox - x

  const { width: tW, x: tX } = target?.getBoundingClientRect() as DOMRect
  targetWidth[key] = tW + Math.abs(diffX)

  const hScrollThumb = hScrollThumbGet(key)

  if (hScrollThumb) {
    if (targetWidthGet(key) <= attachWidthGet(key) && tX > 0) {
      hScrollThumb.style.display = 'none'
    }
    hScrollThumb.classList.remove('hover')
  }
}

export const vMouseUp = (key: string): void => {
  isScrollingV[key] = false

  const zoomT = zoomTransformGet(key)
  const target = gEleGet(key)

  if (!zoomT || !target) return

  const { k, y } = zoomT

  const oy = (target?.getBBox().y as number) * k

  const diffY = -oy - y

  const { height: tH, y: tY } = target?.getBoundingClientRect() as DOMRect
  targetHeight[key] = tH + Math.abs(diffY)

  const vScrollThumb = vScrollThumbGet(key)

  if (vScrollThumb) {
    if (
      targetHeightGet(key) <= attachHeightGet(key) &&
      tY - (topToolsHeightGet(key) as unknown as number) > 0
    ) {
      vScrollThumb.style.display = 'none'
    }
    vScrollThumb.classList.remove('hover')
  }
}

const initSize = (key: string): void => {
  const svgEle = svgEleGet(key)

  if (!svgEle) return

  const hScrollThumb = hScrollThumbGet(key)
  const vScrollThumb = vScrollThumbGet(key)

  attachWidth[key] = (svgEle.getBoundingClientRect().width as number) - 16
  attachHeight[key] = (svgEle.getBoundingClientRect().height as number) - 16
  scrollThumbWidth[key] = hScrollThumb?.getBoundingClientRect().width as number
  scrollThumbHeight[key] = vScrollThumb?.getBoundingClientRect()
    .height as number
}

const winResizeMap: { [key: string]: () => void } = {}

export const onMountedFn = (key: string): void => {
  const svgEle = svgEleGet(key)

  if (!svgEle) return

  winResizeMap[key] = () => initSize(key)

  initSize(key)

  svgEle.addEventListener('mouseup', () => hMouseUp(key))
  svgEle.addEventListener('mouseup', () => vMouseUp(key))
  svgEle.addEventListener('mousemove', (e) => hMouseMove(e, key))
  svgEle.addEventListener('mousemove', (e) => vMouseMove(e, key))
  svgEle.addEventListener('resize', winResizeMap[key])
}
export const onBeforeUnmountFn = (key: string): void => {
  // window.removeEventListener('mouseup', hMouseUp)
  // window.removeEventListener('mouseup', vMouseUp)
  // window.removeEventListener('mousemove', hMouseMove)
  // window.removeEventListener('mousemove', vMouseMove)
  // window.removeEventListener('resize', winResizeMap[key])
}

const setHScrollPostion = (key: string): void => {
  const target = gEleGet(key)
  const hScrollThumb = hScrollThumbGet(key)

  if (!hScrollThumb || !target) return

  const attachW = attachWidthGet(key)

  const { width: tW, x: tX } = target?.getBoundingClientRect() as DOMRect

  let left = tX
  if (left > 0 && left + tW < attachW) {
    hScrollThumb.style.display = 'none'
    return
  }
  let gW = attachW - 16
  if (left < 0) {
    left = Math.abs(left)
    gW += left
  } else if (left + tW > attachW) {
    gW += left + tW - attachW
    left = 0
  }
  const ratioX = left / gW
  const tbw = (attachW * attachW) / gW

  hScrollThumb.style.transform = `translateX(${ratioX * attachW}px)`
  hScrollThumb.style.width = tbw + 'px'
  hScrollThumb.style.display = 'block'

  scrollThumbWidth[key] = gW
}

const setVScrollPostion = (key: string): void => {
  const target = gEleGet(key)

  const vScrollThumb = vScrollThumbGet(key)

  if (!vScrollThumb || !target) return

  const topToolsH = topToolsHeightGet(key)

  const { height: tH, y: tY } = target?.getBoundingClientRect() as DOMRect
  let top = tY - topToolsH

  if (top > 0 && top + tH < attachHeightGet(key)) {
    vScrollThumb.style.display = 'none'
    return
  }

  let gH = attachHeightGet(key)

  if (top < 0) {
    top = Math.abs(top)
    gH += top
  } else if (top + tH > attachHeightGet(key)) {
    gH += top + tH - attachHeightGet(key)
    top = 0
  }
  const ratioY = top / gH
  const tbh = (attachHeightGet(key) * attachHeightGet(key)) / gH

  vScrollThumb.style.transform = `translateY(${
    ratioY * attachHeightGet(key)
  }px)`

  vScrollThumb.style.height = tbh + 'px'
  vScrollThumb.style.display = 'block'

  scrollThumbHeight[key] = gH
}

export const watchZoomTransform = (
  val: d3.ZoomTransform,
  old: d3.ZoomTransform,
  key: string
): void => {
  if (!old || !val) return

  if (val.toString() !== old.toString()) {
    const isScrollingH = isScrollingHGet(key)
    if (!isScrollingH) {
      setHScrollPostion(key)
    }
    const isScrollingV = isScrollingVGet(key)
    if (!isScrollingV) {
      setVScrollPostion(key)
    }
  }
}
