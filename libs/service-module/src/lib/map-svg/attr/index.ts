import { MapSvgConfig } from '../config'
import * as d3 from '../d3/d3-import'
import {
  getAddBtnTransform,
  getDataId,
  getExpandBtnTransform,
  getGTransform,
  getPath,
  getSExpandBtnTransform,
  getSiblingGClass
} from '../draw/get'
import { SelectionG, SelectionRect, Transition } from '../type'
import { IsMdata, Mdata } from '../type/mdata'

import { styleName } from '../card/css'

export const textNameSlice = (
  self: d3.Selection<SVGTextElement, unknown, null, undefined>,
  maxWidth: number,
  options?: { txt?: string; after?: string }
) => {
  let textLength = self ? self.node()?.getComputedTextLength?.() || 0 : 0
  let text = options?.txt || self.text()
  const after = options?.after || '...'

  if (textLength > maxWidth) {
    self.attr('nameslice', '1')
  } else {
    self.attr('nameslice', '')
  }
  while (textLength > maxWidth && text.length > 0) {
    text = text.slice(0, -1)
    self.text(text + after)
    textLength = self ? self.node()?.getComputedTextLength?.() || 0 : 0
  }
}

export const attrG = (g: SelectionG, tran?: Transition): void => {
  const g1 = g
    .attr('class', (d) => getSiblingGClass(d).join(' '))
    .attr('data-id', getDataId)

  const g2 = tran ? g1.transition(tran) : g1
  g2.attr('transform', getGTransform)
}

export const attrTrigger = (rect: SelectionRect, padding: number): void => {
  const w = MapSvgConfig.addBtnSide + MapSvgConfig.addBtnRect.margin
  const p = padding * 2
  rect
    .attr('class', styleName.trigger)
    .attr('x', (d) => -padding)
    .attr('y', -padding)
    .attr('width', (d) =>
      d._children?.length > 0 || d.children?.length > 0
        ? d.width + p + w
        : d.width
    )
    .attr('height', (d) => d.typeSize.height)
}

export const attrPath = (
  p: d3.Selection<SVGPathElement, Mdata, SVGGElement, IsMdata>,
  tran?: Transition
): void => {
  const p1 = p
    .attr('stroke', '#8793A5')
    .attr('stroke-width', MapSvgConfig.branch)

  if (tran) {
    const p2 = p1.transition(tran)
    // if (changeSharpCorner.value) {
    //   // 只有在改变sharpCorner的时候才应该调用
    //   p2.attrTween('d', pathTween)
    // } else {
    p2.attr('d', getPath)
    // }
  } else {
    p1.attr('d', getPath)
  }
}

export const attrLine = (
  line: d3.Selection<SVGLineElement, Mdata, SVGGElement, IsMdata>
): void => {
  line
    .attr('x1', (d) => {
      return d.isSuperiors ? 0 : d.width
    })
    .attr('x2', (d) => {
      return d.isSuperiors ? -40 : d.width + 40
    })
    .attr('y1', (d) => d.typeSize.height / 2)
    .attr('y2', (d) => d.typeSize.height / 2)
    .attr('display', (d) => {
      if (d.isSuperiors) {
        return d.superiors.length || d.superior_total ? 'block' : 'none'
      }

      return d.children.length || d.child_total ? 'block' : 'none'
    })
}

export const attrSExpandBtn = (g: SelectionG) => {
  g.attr('transform', (d) => getSExpandBtnTransform(d)).style(
    'display',
    (d) => {
      if (!d.isRoot && !d.isSuperiors) {
        return 'none'
      }
      return d.superior_total || d.superiors.length || d._superiors.length
        ? 'block'
        : 'none'
    }
  )

  g.select(':scope > text').text((d) =>
    !d.superior_collapse && d.superiors.length
      ? '—'
      : String(d._superiors.length || d.superior_total)
  )
}

export const attrExpandBtn = (g: SelectionG, trp: number): void => {
  g.attr('transform', (d) => getExpandBtnTransform(d, trp)).style(
    'display',
    (d) => {
      if (d.isSuperiors) {
        return 'none'
      }

      return d.children.length || d._children.length || d.child_total
        ? 'block'
        : 'none'
    }
  )

  g.select(':scope > text').text((d) =>
    !d.collapse && d.children.length
      ? '—'
      : String(d._children.length || d.child_total)
  )
}

export const attrAddBtn = (g: SelectionG, trp: number): void => {
  g.attr('transform', (d) => getAddBtnTransform(d, trp)).attr(
    'display',
    'block'
  )
}

export const attrBoxRect = (
  rect: SelectionRect,
  padding: number,
  radius = 4
): void => {
  rect
    .attr('x', -padding)
    .attr('y', -padding)
    .attr('rx', radius)
    .attr('ry', radius)
    .attr('width', (d) => d.width + padding * 2)
    .attr('height', (d) => d.typeSize.height + padding * 2)
}
