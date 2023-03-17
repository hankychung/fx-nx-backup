/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from './d3-import'
import { CreateProxy, CreateProxyRefCallBack } from '../type/bin'
import { gEle as target, svgEle } from './element'
import { transitionExtent, zoom, zoomTransform } from './zoom'
import { svg } from './selection'

export const hScrollThumb = CreateProxy<HTMLDivElement | null>(null)
export const hScrollThumbRef =
  CreateProxyRefCallBack<HTMLDivElement>(hScrollThumb)

export const vScrollThumb = CreateProxy<HTMLDivElement | null>(null)
export const vScrollThumbRef =
  CreateProxyRefCallBack<HTMLDivElement>(vScrollThumb)

export const ScrollBarDontMove = CreateProxy(false)

let attachWidth = 0
let attachHeight = 0
let targetWidth = 0
let targetHeight = 0
let scrollThumbWidth = 0
let scrollThumbHeight = 0
let startX = 0
let startY = 0
let isScrollingH = false
let isScrollingV = false
const topToolsHeight = 0

export const hMouseDown = (
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
): void => {
  isScrollingH = true
  startX = e.pageX
  ScrollBarDontMove.value = false
  if (hScrollThumb.value) {
    hScrollThumb.value.classList.add('hover')
  }
}
export const vMouseDown = (
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
): void => {
  isScrollingV = true
  startY = e.pageY
  ScrollBarDontMove.value = false
  if (vScrollThumb.value) {
    vScrollThumb.value.classList.add('hover')
  }
}
export const hMouseMove = (
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
): void => {
  if (!hScrollThumb.value) return

  if (
    !String(hScrollThumb.value.style.width).replace('px', '') ||
    ScrollBarDontMove.value
  ) {
    return
  }
  if (isScrollingH) {
    const { k, x: gX, y } = zoomTransform.value

    const x = e.pageX - startX
    const { width } = target.value?.getBoundingClientRect() as DOMRect
    const { x: _x } = target.value?.getBBox() as DOMRect
    const tW = Math.max(width * 2 + -_x * k, scrollThumbWidth)
    const tbx = gX - (x * tW) / attachWidth

    startX += x

    let left =
      Number(
        hScrollThumb.value.style.transform
          .replace('translateX(', '')
          .replace('px)', '')
      ) + x
    let tbW = Number(hScrollThumb.value.style.width.replace('px', ''))
    if (left < 0) {
      left = 0
      tbW += x
    } else if (left + tbW > attachWidth) {
      tbW = attachWidth - left
    }
    if (tbW < 50) {
      return
    }
    const transformInfo = d3.zoomIdentity.translate(tbx, y).scale(k)

    if (transitionExtent(transformInfo)) {
      hScrollThumb.value.style.width = tbW + 'px'
      hScrollThumb.value.style.transform = `translateX(${left}px)`
      hScrollThumb.value.style.display = 'block'
      zoomTransform.value = transformInfo

      svg.value && zoom.transform(svg.value, zoomTransform.value)
    }
  }
}
export const vMouseMove = (
  e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>
): void => {
  e.stopPropagation()

  if (!vScrollThumb.value) return

  if (
    !String(vScrollThumb.value.style.height).replace('px', '') ||
    ScrollBarDontMove.value
  ) {
    return
  }
  if (isScrollingV) {
    const { k, x, y: gY } = zoomTransform.value

    const y = e.pageY - startY

    const { height } = target.value?.getBoundingClientRect() as DOMRect
    const { y: _y } = target.value?.getBBox() as DOMRect
    const th = Math.max(height * 2 + (-_y + 100) * k, scrollThumbHeight)
    const tby = gY - (y * th) / attachHeight

    startY += y

    let top =
      Number(
        vScrollThumb.value.style.transform
          .replace('translateY(', '')
          .replace('px)', '')
      ) + y
    let tbH = Number(vScrollThumb.value.style.height.replace('px', ''))
    if (top < 0) {
      top = 0
      tbH += y
    } else if (top + tbH > attachHeight) {
      tbH = attachHeight - top
    }
    if (tbH < 50) {
      return
    }
    const transformInfo = d3.zoomIdentity.translate(x, tby).scale(k)
    if (transitionExtent(transformInfo)) {
      vScrollThumb.value.style.height = tbH + 'px'
      vScrollThumb.value.style.transform = `translateY(${top}px)`
      vScrollThumb.value.style.display = 'block'
      zoomTransform.value = transformInfo
      svg.value && zoom.transform(svg.value, zoomTransform.value)
    }
  }
}
export const hMouseUp = (): void => {
  isScrollingH = false
  const { k, x } = zoomTransform.value

  const ox = (target.value?.getBBox().x as number) * k

  const diffX = -ox - x

  const { width: tW, x: tX } = target.value?.getBoundingClientRect() as DOMRect
  targetWidth = tW + Math.abs(diffX)

  if (hScrollThumb.value) {
    if (targetWidth <= attachWidth && tX > 0) {
      hScrollThumb.value.style.display = 'none'
    }
    hScrollThumb.value.classList.remove('hover')
  }
}
export const vMouseUp = (): void => {
  isScrollingV = false
  const { k, y } = zoomTransform.value

  const oy = (target.value?.getBBox().y as number) * k

  const diffY = -oy - y

  const { height: tH, y: tY } = target.value?.getBoundingClientRect() as DOMRect
  targetHeight = tH + Math.abs(diffY)

  if (vScrollThumb.value) {
    if (targetHeight <= attachHeight && tY - topToolsHeight > 0) {
      vScrollThumb.value.style.display = 'none'
    }
    vScrollThumb.value.classList.remove('hover')
  }
}
export const initSize = (): void => {
  attachWidth = (svgEle.value?.getBoundingClientRect().width as number) - 16
  attachHeight = (svgEle.value?.getBoundingClientRect().height as number) - 16
  scrollThumbWidth = hScrollThumb.value?.getBoundingClientRect().width as number
  scrollThumbHeight = vScrollThumb.value?.getBoundingClientRect()
    .height as number
}

const winResize = () => initSize()

export const onMountedFn = (): void => {
  initSize()
  window.addEventListener('mouseup', hMouseUp)
  window.addEventListener('mouseup', vMouseUp)
  window.addEventListener('mousemove', hMouseMove)
  window.addEventListener('mousemove', vMouseMove)
  window.addEventListener('resize', winResize)
}
export const onBeforeUnmountFn = (): void => {
  window.removeEventListener('mouseup', hMouseUp)
  window.removeEventListener('mouseup', vMouseUp)
  window.removeEventListener('mousemove', hMouseMove)
  window.removeEventListener('mousemove', vMouseMove)
  window.removeEventListener('resize', winResize)
}

const setHScrollPostion = (): void => {
  if (!hScrollThumb.value) return

  const { width: tW, x: tX } = target.value?.getBoundingClientRect() as DOMRect
  let left = tX
  if (left > 0 && left + tW < attachWidth) {
    hScrollThumb.value.style.display = 'none'
    return
  }
  let gW = attachWidth - 16
  if (left < 0) {
    left = Math.abs(left)
    gW += left
  } else if (left + tW > attachWidth) {
    gW += left + tW - attachWidth
    left = 0
  }
  const ratioX = left / gW
  const tbw = (attachWidth * attachWidth) / gW
  hScrollThumb.value.style.transform = `translateX(${ratioX * attachWidth}px)`
  hScrollThumb.value.style.width = tbw + 'px'
  hScrollThumb.value.style.display = 'block'
  scrollThumbWidth = gW
}

const setVScrollPostion = (): void => {
  if (!vScrollThumb.value) return

  const { height: tH, y: tY } = target.value?.getBoundingClientRect() as DOMRect
  let top = tY - topToolsHeight
  if (top > 0 && top + tH < attachHeight) {
    vScrollThumb.value.style.display = 'none'
    return
  }
  let gH = attachHeight
  if (top < 0) {
    top = Math.abs(top)
    gH += top
  } else if (top + tH > attachHeight) {
    gH += top + tH - attachHeight
    top = 0
  }
  const ratioY = top / gH
  const tbh = (attachHeight * attachHeight) / gH
  vScrollThumb.value.style.transform = `translateY(${ratioY * attachHeight}px)`
  vScrollThumb.value.style.height = tbh + 'px'
  vScrollThumb.value.style.display = 'block'

  scrollThumbHeight = gH
}

export const watchZoomTransform = (
  val: d3.ZoomTransform,
  old: d3.ZoomTransform
): void => {
  if (!old || !val) return

  if (val.toString() !== old.toString()) {
    if (!isScrollingH) {
      setHScrollPostion()
    }
    if (!isScrollingV) {
      setVScrollPostion()
    }
  }
}
