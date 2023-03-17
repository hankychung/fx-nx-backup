import {
  appendPublic,
  CreateButtons,
  formatTakerList,
  UpdateButtons,
  updatePublic
} from '.'
import { attrBoxRect, attrTrigger } from '../attr'
import {
  attrTargetLevel,
  attrTargetProgress,
  attrTargetStatusText,
  attrTargetText
} from '../attr/target'
import { BindTargetEvent } from '../card-event/target'
import { MapSvgConfig } from '../config'
import { draw } from '../draw'
import { EnterE, GContent, SelectionG } from '../type'
import { Mdata } from '../type/mdata'

import { styleName } from './css'

const addProgress = (gProgress: GContent) => {
  const gProgressAll = gProgress
    .append('rect')
    .attr('class', styleName['g-target-progress-all'])

  gProgressAll.attr('width', 60).attr('height', 6).attr('ry', 3)

  const gProgressNow = gProgress
    .append('rect')
    .attr('class', styleName['g-target-progress-now'])

  gProgressNow.attr('height', 6).attr('ry', 3)

  const gProgressText = gProgress
    .append('text')
    .attr('class', styleName['g-target-progress-text'])
  gProgressText.attr('font-size', 11).attr('transform', `translate(66, 6)`)
}

/**
 * 新建目标节点
 */
const AddTargetCard = (gContent: GContent, d: Mdata) => {
  const padding = MapSvgConfig.TargetPadding

  const gTrigger = gContent.append<SVGRectElement>('rect')
  attrTrigger(gTrigger, padding)

  // --- 绘制内部盒子
  const gBox = gContent.append('g').attr('class', styleName['g-box'])
  const gBoxRect = gBox.append('rect')
  attrBoxRect(gBoxRect, padding, 8)

  // Icon
  const gTargetIcon = gBox.append('g').attr('class', styleName['g-target-icon'])

  const gTargetIconImage = gTargetIcon.append('svg:image')
  gTargetIconImage
    .attr('width', 20)
    .attr('height', 20)
    .attr('xlink:href', '/icons/target-icon.png')

  const oneLineTopMargin = padding + 1
  const left = 28

  // 标题
  const gTargetText = gBox
    .append('g')
    .attr('class', styleName['g-target-text'])
    .attr('transform', `translate(${left}, ${oneLineTopMargin})`)

  const text = gTargetText.append('text').attr('font-size', 13)
  attrTargetText(text)

  const twoLineTopMargin =
    oneLineTopMargin + 5 + (text.node()?.getBBox().height || 18)

  // 当前目标状态
  const gTargetStatus = gBox
    .append('g')
    .attr('class', styleName['g-target-status'])
  const gTargetStatusText = gTargetStatus.append('text').attr('font-size', 11)
  gTargetStatusText.attr('transform', `translate(${left}, ${twoLineTopMargin})`)
  attrTargetStatusText(gTargetStatusText)

  // 进度条
  const gProgress = gBox
    .append('g')
    .attr('class', styleName['g-target-progress'])
  gProgress.attr(
    'transform',
    `translate(${
      (gTargetStatusText.node()?.getComputedTextLength() || 22) + 28 + 8
    }, ${twoLineTopMargin - 6.5})`
  )
  addProgress(gProgress)
  attrTargetProgress(gProgress)

  // 协作人
  const gTakerBox = gBox.append('g').attr('class', styleName['g-partner'])
  formatTakerList(gTakerBox, d)
  gTakerBox.attr('transform', `translate(${left}, ${61 - padding + 1})`)

  // 级别
  const gLevel = gBox.append('g').attr('class', styleName['g-target-level'])
  const gLevelText = gLevel.append('text').attr('font-size', 11)

  attrTargetLevel(gLevelText)
  gLevelText.attr(
    'transform',
    `translate(${193 - padding}, ${62 - padding + 12})`
  )
}

/**
 * 更新目标节点
 */
export const UpdateTargetCard = (gContent: GContent, d: Mdata) => {
  const padding = MapSvgConfig.TargetPadding

  const gTrigger = gContent.select<SVGRectElement>('rect')
  attrTrigger(gTrigger, padding)

  // --- 绘制内部盒子
  const gBox = gContent.select<SVGGElement>(`:scope > g.${styleName['g-box']}`)
  const gBoxRect = gBox.select<SVGRectElement>(':scope > rect')
  attrBoxRect(gBoxRect, padding, 6)

  // --- 标题
  const gText = gBox.select<SVGGElement>(
    `:scope > g.${styleName['g-target-text']}`
  )
  const text = gText.select<SVGTextElement>(':scope > text')
  attrTargetText(text)

  // 状态
  const gStatus = gBox.select<SVGGElement>(
    `:scope > g.${styleName['g-target-status']}`
  )
  const gStatusText = gStatus.select<SVGTextElement>(`:scope > text`)
  attrTargetStatusText(gStatusText)

  // 进度
  const gProgress = gBox.select<SVGGElement>(
    `:scope > g.${styleName['g-target-progress']}`
  )
  attrTargetProgress(gProgress)

  // 协作人
  const gTakerBox = gBox.select<SVGGElement>(
    `:scope > g.${styleName['g-partner']}`
  )
  formatTakerList(gTakerBox, d)

  // 级别
  const gLevel = gBox.select<SVGGElement>(
    `:scope > g.${styleName['g-target-level']}`
  )
  const gLevelText = gLevel.select<SVGTextElement>('text')
  attrTargetLevel(gLevelText)
}

export const enterTargetNode = (enter: EnterE, d: Mdata) => {
  const padding = MapSvgConfig.TargetPadding

  const enterG = enter.append('g')

  appendPublic(enterG)

  // 节点容器
  const gContent = enterG.append('g').attr('class', styleName.content)

  // 创建常态的Card节点
  AddTargetCard(gContent, d)

  CreateButtons(padding, gContent)

  BindTargetEvent(enterG)

  enterG.each((d, i) => {
    if (d.children.length) {
      draw(
        d.children,
        enterG.filter((_a, b) => i === b)
      )
    }

    if (d.superiors.length) {
      draw(
        d.superiors,
        enterG.filter((_a, b) => i === b)
      )
    }
  })
  gContent.raise()
  return enterG
}

export const updateTargetNode = (update: SelectionG, d: Mdata) => {
  const padding = MapSvgConfig.TargetPadding

  updatePublic(update)

  const gContent = update.select<SVGGElement>(`:scope > g.${styleName.content}`)

  UpdateTargetCard(gContent, d)

  UpdateButtons(padding, gContent)

  gContent.raise()
  return update
}
