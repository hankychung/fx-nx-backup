import { SelectionG } from '../type'
import { CreateMapProxy, CreateMapProxyValueGet } from '../type/bin'
import * as d3 from './d3-import'
import { zoom } from './zoom'

export type selectionSvg =
  | d3.Selection<SVGSVGElement, null, null, undefined>
  | undefined
export const svg = CreateMapProxy<selectionSvg>((svg, _, key) => {
  if (svg && key) {
    zoom(svg, key)
    svg.on('dblclick.zoom', null)
  }
})
export const svgGet = CreateMapProxyValueGet(svg)

export const g = CreateMapProxy<SelectionG>()
export const gGet = CreateMapProxyValueGet(g)

export type selectionAsstSvg =
  | d3.Selection<SVGSVGElement, unknown, null, undefined>
  | undefined
export const asstSvg = CreateMapProxy<selectionAsstSvg>()
export const asstSvgGet = CreateMapProxyValueGet(asstSvg)

export type selectionForeign =
  | d3.Selection<SVGForeignObjectElement, undefined, null, undefined>
  | undefined
export const foreign = CreateMapProxy<selectionForeign>()
export const foreignGet = CreateMapProxyValueGet(foreign)
