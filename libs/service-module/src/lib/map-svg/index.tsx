import { useMemo, useEffect, useRef } from 'react'
import { objectiveApi } from '@flyele-nx/api'
import { Scrollbar } from './components/scrollbar'
import { formatMdata } from './utils/formart'
import { asstSvgEle, foreignEle, gEle, svgEle, wrapperEle } from './d3/element'
import { mmdata, mmdataGet } from './draw/const'
import ImData from './draw/ImData'

import './index.scss'
import { styleName } from './card/css'
import { afterOperation, DeleteDom, toCenter } from './draw/handle'
import { SvgController } from './components/svg-controller'
import { ReactComponent as EmptyBg } from '../../assets/icons/map-svg-icon/empty-bg.svg'
import { ForwardRefRenderFunction } from 'react'
import { MapSvgRef, MavpSvgProps } from './type/props'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import { useState } from 'react'
import { zoomTransform } from './d3/zoom'
import { d3 } from './d3'
import { wheelPreventDefault } from './utils'
import { ZoomToast } from './components/zoom-toast'
import { useMemoizedFn } from 'ahooks'
import { openTargetCardProxy } from './utils/system'

const MapSvgRender: ForwardRefRenderFunction<MapSvgRef, MavpSvgProps> = (
  props,
  ref
) => {
  const { ref_id, type, openTargetCard } = props

  const [initKey] = useState(
    String(Math.floor(Math.random() * 100000000000000))
  )

  const empty = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)

  const init = useMemoizedFn(async () => {
    const emptyBox = empty.current
    const wrapperBox = wrapper.current

    if (emptyBox) emptyBox.style.display = 'none'
    if (wrapperBox) wrapperBox.style.display = 'block'

    const oldMdata = mmdataGet(initKey)

    if (oldMdata?.data.length) {
      DeleteDom.value.push(...oldMdata.data.map((v) => `g[data-id='${v.id}']`))
    }

    zoomTransform[initKey] = d3.zoomIdentity

    const data = []

    const list = await objectiveApi.getSnapMap({ ref_id, type })

    for (const d of list) {
      data.push(formatMdata(d))
    }

    console.log(data)

    if (data.length === 0 && emptyBox) {
      if (emptyBox) emptyBox.style.opacity = 'block'
      if (wrapperBox) wrapperBox.style.opacity = 'none'
    }

    mmdata[initKey] = new ImData(initKey, data)

    afterOperation(initKey)

    toCenter(initKey, true, { max: 1 })
  })

  useEffect(() => {
    openTargetCardProxy.value = openTargetCard

    return () => {
      openTargetCardProxy.value = (target_id: string) => {
        console.log(target_id)
      }
    }
  }, [])

  useEffect(() => {
    init()
  }, [])

  useImperativeHandle(
    ref,
    () => {
      return {
        refresh: init
      }
    },
    []
  )

  return useMemo(() => {
    return (
      <div className={styleName.container} ref={wheelPreventDefault}>
        <div
          className={styleName['svg-all-wrapper']}
          style={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            '--shadow-key': `url(#shadow-${initKey})`
          }}
          ref={wrapper}
        >
          <div
            className={styleName['svg-wrapper']}
            ref={(dom) => (wrapperEle[initKey] = dom)}
          >
            <svg
              className={styleName.svg}
              data-componentkey={initKey}
              ref={(dom) => (svgEle[initKey] = dom)}
            >
              <defs>
                <filter id={`shadow-${initKey}`} width="200%" height="200%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="3"
                    flood-color="#000"
                    flood-opacity="0.1"
                  />
                </filter>
              </defs>
              <g ref={(dom) => (gEle[initKey] = dom)}>
                <foreignObject
                  className={styleName.AddAndEditWrap}
                  ref={(dom) => (foreignEle[initKey] = dom)}
                >
                  <div />
                </foreignObject>
              </g>
            </svg>
          </div>
          <Scrollbar componentKey={initKey} />
          <svg
            ref={(dom) => (asstSvgEle[initKey] = dom)}
            className={styleName['asst-svg']}
          />
          <SvgController componentKey={initKey} />
          <ZoomToast componentKey={initKey} />
        </div>

        <div ref={empty} className={styleName.emptyBox}>
          <EmptyBg className={styleName.emptyBg} />
          <div>暂无目标图谱</div>
        </div>
      </div>
    )
  }, [])
}

export const MapSvg = forwardRef(MapSvgRender)
