import { d3 } from '.'
import { SelectionG } from '../type'
import { CreateMapProxy, CreateMapProxyValueGet } from '../type/bin'
import { onMountedFn } from './scrollBar'
import { g, svg } from './selection'

export const svgEle = CreateMapProxy<SVGSVGElement | null>((nV, _, key) => {
  if (nV && key) svg[key] = d3.select(nV)
})
export const svgEleGet = CreateMapProxyValueGet(svgEle)

export const gEle = CreateMapProxy<SVGGElement | null>((nV, _, key) => {
  if (nV && key) g[key] = d3.select(nV) as unknown as SelectionG
})
export const gEleGet = CreateMapProxyValueGet(gEle)

export const wrapperEle = CreateMapProxy<HTMLDivElement | null>(
  (_, __, key) => {
    if (key) {
      onMountedFn(key)
    }
  }
)
export const wrapperEleGet = CreateMapProxyValueGet(wrapperEle)

export const asstSvgEle = CreateMapProxy<SVGSVGElement | null>()
export const asstSvgEleGet = CreateMapProxyValueGet(asstSvgEle)

export const foreignEle = CreateMapProxy<SVGForeignObjectElement | null>()
export const foreignEleGet = CreateMapProxyValueGet(foreignEle)

// export const gEleRef = CreateProxyRefCallBack<SVGGElement>(gEle)
// export const wrapperEleRef = CreateProxyRefCallBack<HTMLDivElement>(wrapperEle)
// export const asstSvgEleRef = CreateProxyRefCallBack<SVGSVGElement>(asstSvgEle)
// export const foreignEleRef =
//   CreateProxyRefCallBack<SVGForeignObjectElement>(foreignEle)
