import { scaleTo, zoomTransform, zoomTransformGet } from '../../d3/zoom'
import { useGetMapProxyState } from '../../hooks/proxyToState'
import { ReactComponent as FullScreenIcon } from '../../../../assets/icons/map-svg-icon/full-screen.svg'
import { ReactComponent as PlusZoomIcon } from '../../../../assets/icons/map-svg-icon/plus-zoom-button.svg'
import { ReactComponent as ReduceZoomIcon } from '../../../../assets/icons/map-svg-icon/reduce-zoom-button.svg'
import { FlyBasePopper } from '@flyele/flyele-components'
import { Slider } from 'antd'
import { MapSvgConfig } from '../../config'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useMemoizedFn } from 'ahooks'
import { wheelPreventDefault } from '../../utils'

const marks = {
  100: '0'
}

interface SvgControllerPropx {
  componentKey: string
}

export const SvgController = (props: SvgControllerPropx) => {
  const { componentKey } = props

  const { state: zoomSize } = useGetMapProxyState(
    zoomTransform,
    componentKey,
    (v) => Math.floor((v?.k || 0.02) * 100)
  )

  const sliderScaleTo = useMemoizedFn((v: number) => {
    scaleTo(componentKey, v / 100)
  })

  const changeZoomSize = (v: number) => {
    const zoomTransform = zoomTransformGet(componentKey)

    const next = (zoomTransform?.k || 0.2) * 100 + v

    if (next > 200 || next < 20) {
      return
    }

    sliderScaleTo(next)
  }

  const content = () => {
    return (
      <div className={styles.UtilList} ref={wheelPreventDefault}>
        <div className={classNames(styles.UtilItem, styles.slider)}>
          <ReduceZoomIcon
            className={styles.SliderIcon}
            onClick={() => {
              changeZoomSize(-1)
            }}
          />

          <Slider
            marks={marks}
            style={{ flex: 1 }}
            min={MapSvgConfig.scaleExtent[0] * 100}
            max={MapSvgConfig.scaleExtent[1] * 100}
            value={zoomSize || 20}
            onChange={sliderScaleTo}
            tooltip={{
              formatter: null
            }}
          />

          <PlusZoomIcon
            className={styles.SliderIcon}
            onClick={() => {
              changeZoomSize(1)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.SvgController} ref={wheelPreventDefault}>
      <div className={styles.smallShow}>
        <div className={styles.zoomSizeValue}>
          <FlyBasePopper
            placement="top"
            showArrow={false}
            trigger="click"
            content={content}
            onVisibleChange={(boolean) => {
              if (boolean) {
                const mask = document.querySelector(
                  'div[data-id="popper-mask"]'
                ) as HTMLDivElement

                wheelPreventDefault(mask)
              }
            }}
          >
            <span>{zoomSize}%</span>
          </FlyBasePopper>
        </div>
        <FullScreenIcon className={styles.windowFullScreen} />
      </div>
    </div>
  )
}
