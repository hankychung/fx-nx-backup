import { debounce } from 'lodash'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { zoomTransform } from '../../d3/zoom'
import { useGetMapProxyState } from '../../hooks/proxyToState'
import styles from './index.module.scss'

interface ZoomToastProps {
  componentKey: string
}

export const ZoomToast = (props: ZoomToastProps) => {
  const { componentKey } = props

  const { state: zoomSize } = useGetMapProxyState(
    zoomTransform,
    componentKey,
    (v) => Math.floor((v?.k || 0.02) * 100)
  )

  const [show, setShow] = useState(false)

  const close = useMemo(() => debounce(() => setShow(false), 1500), [])

  useEffect(() => {
    if (!show) {
      setShow(true)
    }
    close()
  }, [zoomSize])

  return (
    <div>
      {show ? (
        <div className={styles.ZoomToast}>
          <div>{zoomSize}%</div>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}
