import React from 'react'
import styles from './bar.module.css'
import a from '../../../../assets/icons/bar_handle.png'
import cs from 'classnames'
type BarDateHandleProps = {
  x: number
  y: number
  width: number
  height: number
  barCornerRadius: number
  isFinish: boolean
  isShowDrop: boolean
  onMouseDown: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void
}
export const BarDateHandle: React.FC<BarDateHandleProps> = ({
  x,
  y,
  width,
  height,
  barCornerRadius,
  isFinish,
  onMouseDown,
  isShowDrop
}) => {
  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        className={cs(
          styles.barHandle,
          { [styles.overHandle]: isFinish },
          { [styles.isMoveHandle]: isShowDrop }
        )}
        ry={barCornerRadius}
        rx={barCornerRadius}
        onMouseDown={onMouseDown}
      ></rect>
      <image
        xlinkHref={a}
        x={x + 2}
        y={y + 10}
        height={10}
        width={4}
        className={cs(styles.barHandle, { [styles.isMoveHandle]: isShowDrop })}
      ></image>
    </g>
  )
}
