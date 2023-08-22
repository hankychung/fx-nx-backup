import React from 'react'
import styles from './bar.module.css'
import a from '../../../../assets/icons/bar_handle.png'
type BarDateHandleProps = {
  x: number
  y: number
  width: number
  height: number
  barCornerRadius: number
  onMouseDown: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void
}
export const BarDateHandle: React.FC<BarDateHandleProps> = ({
  x,
  y,
  width,
  height,
  barCornerRadius,
  onMouseDown
}) => {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        className={styles.barHandle}
        ry={barCornerRadius}
        rx={barCornerRadius}
        onMouseDown={onMouseDown}
      ></rect>
      <image xlinkHref={a} x={x + 4} y={y + 10} height={10} width={4}></image>
    </>
  )
}
