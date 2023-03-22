import { GContent, SelectionG } from '../type'
import * as d3 from '../d3/d3-import'
import { Mdata, MdataTaker } from '../type/mdata'
import {
  attrExpandBtn,
  attrG,
  // attrLine,
  attrPath,
  attrSExpandBtn
} from '../attr'
import { expandIcon, getPathIcon } from '../svg-icon'
import { getTakerId, getTextSize } from '../draw/get'
import { styleName } from './css'
import addTakerIcon from '../../../assets/icons/map-svg-icon/add-taker.png'

export const makeTransition = (
  dura: number,
  easingFn: (normalizedTime: number) => number
): d3.Transition<d3.BaseType, Mdata, null, undefined> => {
  return d3
    .transition<Mdata>()
    .duration(dura)
    .ease(easingFn) as unknown as d3.Transition<
    d3.BaseType,
    Mdata,
    null,
    undefined
  >
}

export const appendPublic = (enterG: SelectionG) => {
  attrG(enterG)
  // 绘制线
  attrPath(enterG.append('path').attr('class', styleName['none-fill']))

  // const line = enterG.append('line')
  // attrLine(line)
}

export const updatePublic = (update: SelectionG) => {
  const tran = makeTransition(500, d3.easePolyOut)
  attrG(update, tran)
  attrPath(update.select<SVGPathElement>(':scope > path'), tran)
  // attrLine(update.select<SVGLineElement>(':scope > line'))
}

export const CreateButtons = (Padding: number, gContent: SelectionG) => {
  // 绘制折叠按钮
  let gExpandBtn
  let gSExpandBtn
  if (gContent.data().length > 0) {
    gExpandBtn = appendExpandBtn(gContent)
    gSExpandBtn = appendExpandBtn(gContent)
  }
  if (gExpandBtn) {
    gExpandBtn.attr('class', styleName['expand-btn'])
    attrExpandBtn(gExpandBtn, Padding)
  }
  if (gSExpandBtn) {
    gSExpandBtn.attr('class', styleName['s-expand-btn'])
    attrSExpandBtn(gSExpandBtn)
  }
}

export const UpdateButtons = (Padding: number, gContent: SelectionG) => {
  const gExpandBtn = gContent.select<SVGGElement>(
    `g.${styleName['expand-btn']}`
  )
  if (gExpandBtn) attrExpandBtn(gExpandBtn, Padding)

  const gSExpandBtn = gContent.select<SVGGElement>(
    `g.${styleName['s-expand-btn']}`
  )
  if (gSExpandBtn) attrSExpandBtn(gSExpandBtn)
}

export const appendExpandBtn = (g: SelectionG): SelectionG => {
  const expandBtn = g.append('g').attr('cursor', 'pointer')

  const ExpandBtnPath = expandBtn.append('path')
  getPathIcon(expandIcon, ExpandBtnPath)

  expandBtn.append('text').attr('fill', '#fff').style('font-size', '8px')

  return expandBtn
}

export const appendAddBtn = (g: SelectionG): SelectionG => {
  const addBtn = g
    .append('g')
    .attr('cursor', 'pointer')
    .attr('class', styleName['add-btn'])

  const img = addBtn.append('svg:image')
  img
    .attr('xlink:href', '/icons/add-btn-icon.png')
    .attr('width', 14)
    .attr('height', 14)

  addBtn
    .append('circle')
    .attr('cx', 7)
    .attr('cy', 7)
    .attr('r', 7)
    .attr('fill', 'rgba(0,0,0,0)')

  return addBtn
}

// 协作人列表
export const formatTakerList = (g: GContent, d: Mdata) => {
  if (!g.node()) {
    console.log(g, d)
    return
  }

  const nowNumber = Number(String(g.attr('data-number')))
  const length = d.takers?.length || 0

  // 如果当前渲染的数量是 0，并且当前的协作人数量是 0，那么就不用重复渲染
  if (!isNaN(nowNumber) && nowNumber === 0 && length === 0) {
    return
  }

  // 如果数量不同，直接重渲染
  if (!isNaN(nowNumber) && nowNumber !== length) {
    g.selectChildren().remove()
    g.attr('data-number', null)

    formatTakerList(g, d)
    return
  }

  const renderTaker: MdataTaker[] = []

  if (d.takers) {
    renderTaker.push(...d.takers.slice(0, 2))
  }

  // 如果是NaN，说明是第一次渲染
  if (isNaN(nowNumber)) {
    g.attr('data-number', length)

    if (length && d.takers) {
      renderTaker.forEach((v, i) => {
        // 整体盒子
        const gTakerBox = g.append('g')
        gTakerBox.attr('class', 'taker-item')
        gTakerBox.attr('data-key', getTakerId(v))
        if (i > 0)
          gTakerBox.attr('transform', `translate(${i * 16 - 3 * i}, 0)`)

        // 背景填充块 + 边框
        const gRect = gTakerBox.append('rect')
        gRect
          .attr('width', 16)
          .attr('height', 16)
          .attr('fill', '#fff')
          .attr('ry', '8')

        // 头像
        const gAvatar = gTakerBox.append('svg:image')
        gAvatar.attr('class', 'taker-avatar')
        gAvatar
          .attr('xlink:href', v.avatar ? v.avatar + `?s=${Date.now()}` : '')
          .attr('clip-path', 'inset(0% round 15px)')
          .attr('width', 15)
          .attr('height', 15)
          .attr('transform', 'translate(1, 1)')
      })

      if (length > 2) {
        const text = `+${length - 2}`
        // 渲染数字
        const width = getTextSize(text, 10).width

        // 数字盒子
        const gTakerNumberBox = g.append('g')
        gTakerNumberBox.attr('class', 'taker-number')
        gTakerNumberBox.attr('transform', `translate(${2 * 16 - 3 * 2}, 0)`)

        // 数字填充背景
        const gRect = gTakerNumberBox.append('rect')
        gRect
          .attr('fill', '#fff')
          .attr('ry', 12)
          .attr('width', width + 2)
          .attr('height', 16)

        // 数字文案
        const gText = gTakerNumberBox.append('text')
        gText
          .text(text)
          .attr('font-size', 10)
          .attr('transform', 'translate(2, 12)')
      }
    } else {
      // 新增协作人盒子
      const gAddBox = g.append('g')
      gAddBox.attr('class', 'add-taker-btn')

      // 新增协作人填充
      const gRect = gAddBox.append('rect')
      gRect
        .attr('width', 16)
        .attr('height', 16)
        .attr('ry', 10)
        .attr('fill', '#fff')

      // 新增协作人图标
      const gIcon = gAddBox.append('svg:image')
      gIcon
        .attr('xlink:href', addTakerIcon)
        .attr('width', 16)
        .attr('height', 16)
    }

    return
  }

  // const gPartners = g.select<SVGGElement>(":space > .taker-item")

  // gPartners.each(function (_, i) {
  //   const self = d3.select(this)
  //   const key = self.attr('data-key')

  //   // 判断key是否发生变化，如果发生变化的话
  //   if (getTakerId(renderTaker[i]) !== key) {
  //     const gAvatar = self.select(".taker-avatar")
  //     gAvatar.attr('xlink:href', renderTaker[i].avatar)
  //   }
  // })
}
