import { d3 } from '.'
import { SelectionG } from '../type'
import { CreateProxy, CreateProxyRefCallBack } from '../type/bin'
import { onMountedFn } from './scrollBar'
import { g, svg } from './selection'

export const svgEle = CreateProxy<SVGSVGElement | null>(null, (value) => {
  if (value) svg.value = d3.select(value)
})
export const svgEleRef = CreateProxyRefCallBack<SVGSVGElement>(svgEle)

export const gEle = CreateProxy<SVGGElement | null>(null, (value) => {
  if (value) g.value = d3.select(value) as unknown as SelectionG
})

export const gEleRef = CreateProxyRefCallBack<SVGGElement>(gEle)

export const wrapperEle = CreateProxy<HTMLDivElement | null>(null, () => {
  onMountedFn()
})
export const wrapperEleRef = CreateProxyRefCallBack<HTMLDivElement>(wrapperEle)

export const asstSvgEle = CreateProxy<SVGSVGElement | null>(null)
export const asstSvgEleRef = CreateProxyRefCallBack<SVGSVGElement>(asstSvgEle)

export const foreignEle = CreateProxy<SVGForeignObjectElement | null>(null)
export const foreignEleRef =
  CreateProxyRefCallBack<SVGForeignObjectElement>(foreignEle)
