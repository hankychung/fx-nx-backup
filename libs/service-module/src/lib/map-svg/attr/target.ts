import * as d3 from '../d3/d3-import'
import { textNameSlice } from '.'
import {
  getProgressStatusColor,
  getTargetLevelText,
  getTargetStatusText
} from '../draw/get'
import {
  SelectionG,
  SelectionTargetG,
  SelectionTargetText,
  SelectionText
} from '../type'
import { TargetMdata } from '../type/target'
import { styleName } from '../card/css'

export const attrTargetText = (text: SelectionText) => {
  text
    .text((d) => {
      return d.target_id as unknown as string
    })
    .each(function () {
      textNameSlice(d3.select(this), 184)
    })
}

export const attrTargetLevel = (text: SelectionText) => {
  text.text((d) => {
    const data = d as unknown as TargetMdata

    return getTargetLevelText(data.target_level)
  })
}

export const attrTargetStatusText = (textE: SelectionText) => {
  const text = textE as unknown as SelectionTargetText

  text
    .text((d) => {
      const data = d as unknown as TargetMdata

      return getTargetStatusText(data.target_status).text
    })
    .attr('fill', (d) => {
      const data = d as unknown as TargetMdata

      return getTargetStatusText(data.target_status).color
    })
}

export const attrTargetProgress = (gE: SelectionG) => {
  const g = gE as unknown as SelectionTargetG

  const gProgressAll = g.select<SVGRectElement>(
    `:scope > rect.${styleName['g-target-progress-all']}`
  )

  gProgressAll.attr('fill', (d) => {
    return getProgressStatusColor(d.target_status).all
  })

  const gProgressNow = g.select<SVGRectElement>(
    `:scope > rect.${styleName['g-target-progress-now']}`
  )
  gProgressNow
    .attr('width', (d) => Math.floor(((d.target_progress || 0) / 100) * 60))
    .attr('fill', (d) => getProgressStatusColor(d.target_status).now)

  const gProgressText = g.select<SVGTextElement>(
    `:scope > text.${styleName['g-target-progress-text']}`
  )
  gProgressText.text((d) => {
    return `${d.target_progress}%`
  })
}
