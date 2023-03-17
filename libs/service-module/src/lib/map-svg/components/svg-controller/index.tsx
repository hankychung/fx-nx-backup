import { scaleTo, zoomTransform } from '../../d3/zoom'
import { useGetProxyState } from '../../hooks/proxyToState'
import { ReactComponent as FullScreenIcon } from '../../../../assets/icons/map-svg-icon/full-screen.svg'
import { ReactComponent as PlusZoomIcon } from '../../../../assets/icons/map-svg-icon/plus-zoom-button.svg'
import { ReactComponent as ReduceZoomIcon } from '../../../../assets/icons/map-svg-icon/reduce-zoom-button.svg'
import { FlyBasePopper } from '@flyele/flyele-components'
import { Slider } from 'antd'
import { MapSvgConfig } from '../../config'
import styles from './index.module.scss'
import classNames from 'classnames'

const marks = {
  100: '0'
}

export const SvgController = () => {
  const { state: zoomSize } = useGetProxyState(zoomTransform, (v) =>
    Math.floor(v.k * 100)
  )

  const preventDefault = (dom: HTMLElement | HTMLDivElement | null) => {
    dom?.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault()
      },
      { passive: false }
    )
  }

  const sliderScaleTo = (v: number) => {
    scaleTo(v / 100)
  }

  const changeZoomSize = (v: number) => {
    const next = (zoomTransform.value.k || 0.2) * 100 + v

    if (next > 200 || next < 20) {
      return
    }

    sliderScaleTo(next)
  }

  const content = () => {
    return (
      <div className={styles.UtilList} ref={preventDefault}>
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
    <div className={styles.SvgController} ref={preventDefault}>
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

                preventDefault(mask)
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
