import { SelectionG } from '../type'
import { CreateProxy } from '../type/bin'
import * as d3 from './d3-import'
import { zoom } from './zoom'

export type selectionSvg =
  | d3.Selection<SVGSVGElement, null, null, undefined>
  | undefined
export const svg = CreateProxy<selectionSvg>(undefined, (svg) => {
  if (svg) {
    zoom(svg)
  }
})

export const g = CreateProxy<SelectionG | null>(null)

export type selectionAsstSvg =
  | d3.Selection<SVGSVGElement, unknown, null, undefined>
  | undefined
export const asstSvg = CreateProxy<selectionAsstSvg>(undefined)

export type selectionForeign =
  | d3.Selection<SVGForeignObjectElement, undefined, null, undefined>
  | undefined
export const foreign = CreateProxy<selectionForeign>(undefined)
