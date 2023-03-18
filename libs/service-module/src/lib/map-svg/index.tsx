import { cloneDeep } from 'lodash'
import { useMemo, useEffect, useRef } from 'react'
import { Scrollbar } from './components/scrollbar'
import { formatMdata } from './utils/formart'
import { asstSvgEle, foreignEle, gEle, svgEle, wrapperEle } from './d3/element'
import { mmdata } from './draw/const'
import ImData from './draw/ImData'
import { FakerData } from './fakerData'

import './index.scss'
import { styleName } from './card/css'
import { afterOperation, toCenter } from './draw/handle'
import { SvgController } from './components/svg-controller'
import { ForwardRefRenderFunction } from 'react'
import { MapSvgRef } from './type/props'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import { useState } from 'react'
import { zoomTransform } from './d3/zoom'
import { d3 } from './d3'
import { wheelPreventDefault } from './utils'

const MapSvgRender: ForwardRefRenderFunction<MapSvgRef> = (props, ref) => {
  const [initKey] = useState(
    String(Math.floor(Math.random() * 100000000000000))
  )

  const initLoading = useRef<boolean>(false)

  const init = () => {
    setTimeout(() => {
      zoomTransform[initKey] = d3.zoomIdentity

      const data = []
      const clone = cloneDeep(FakerData)

      for (const d of clone) {
        d.children = new Array(Math.floor(Math.random() * 0 + 3))
          .fill('')
          .map((v) => {
            const objective_id = String(
              Math.floor(Math.random() * 100000000000)
            )

            const newd = { ...cloneDeep(FakerData[0]), objective_id }

            newd.children = new Array(Math.floor(Math.random() * 4 + 1))
              .fill('')
              .map((v) => {
                const objective_id = String(
                  Math.floor(Math.random() * 100000000000)
                )

                return { ...cloneDeep(FakerData[0]), objective_id }
              })

            return newd
          })

        d.superiors = new Array(Math.floor(Math.random() * 0 + 3))
          .fill('')
          .map((v) => {
            const objective_id = String(
              Math.floor(Math.random() * 100000000000)
            )

            const newd = { ...cloneDeep(FakerData[0]), objective_id }

            newd.superiors = new Array(Math.floor(Math.random() * 4 + 1))
              .fill('')
              .map((v) => {
                const objective_id = String(
                  Math.floor(Math.random() * 100000000000)
                )

                return { ...cloneDeep(FakerData[0]), objective_id }
              })

            return newd
          })

        data.push(formatMdata(d))
      }

      mmdata[initKey] = new ImData(initKey, data.slice(0, 4))

      afterOperation(initKey)

      toCenter(initKey, true)
    }, 1000)
  }

  useEffect(() => {
    if (initLoading.current) return

    initLoading.current = true
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
          className={styleName['svg-wrapper']}
          ref={(dom) => (wrapperEle[initKey] = dom)}
        >
          <svg
            className={styleName.svg}
            data-componentkey={initKey}
            ref={(dom) => (svgEle[initKey] = dom)}
          >
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
      </div>
    )
  }, [])
}

export const MapSvg = forwardRef(MapSvgRender)
