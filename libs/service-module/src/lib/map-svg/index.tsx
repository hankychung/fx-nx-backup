import { cloneDeep } from 'lodash'
import { useMemo, useEffect, useRef } from 'react'
import { Scrollbar } from './components/scrollbar'
import { formatMdata } from './utils/formart'
import {
  asstSvgEleRef,
  foreignEleRef,
  gEleRef,
  svgEleRef,
  wrapperEleRef
} from './d3/element'
import { mmdata } from './draw/const'
import ImData from './draw/ImData'
import { FakerData } from './fakerData'

import './index.scss'
import { styleName } from './card/css'
import { afterOperation } from './draw/handle'

export const MapSvg = () => {
  const initLoading = useRef<boolean>(false)
  const init = () => {
    if (initLoading.current) return

    initLoading.current = true

    setTimeout(() => {
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

      mmdata.value = new ImData(data.slice(0, 2))

      afterOperation()
    }, 1000)
  }

  useEffect(() => {
    init()
  }, [])

  return useMemo(() => {
    return (
      <div className={styleName.container}>
        <div className={styleName['svg-wrapper']} ref={wrapperEleRef}>
          <svg className={styleName.svg} ref={svgEleRef}>
            <g ref={gEleRef}>
              <foreignObject
                className={styleName.AddAndEditWrap}
                ref={foreignEleRef}
              >
                <div />
              </foreignObject>
            </g>
          </svg>
        </div>
        <Scrollbar />

        <svg ref={asstSvgEleRef} className={styleName['asst-svg']} />
      </div>
    )
  }, [])
}
