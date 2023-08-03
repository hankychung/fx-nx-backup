import React from 'react'
import style from './bar.module.css'
// import { Popover } from 'antd'
// import { createSVG } from '../../../utils'
import { IFullViewBarTask } from '@flyele-nx/types'

type BarDisplayProps = {
  task?: IFullViewBarTask
  x: number
  y: number
  width: number
  height: number
  isSelected: boolean
  /* progress start point */
  progressX: number
  progressWidth: number
  barCornerRadius: number
  styles: {
    backgroundColor: string
    backgroundSelectedColor: string
    progressColor: string
    progressSelectedColor: string
  }
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void
}
export const BarDisplay: React.FC<BarDisplayProps> = ({
  x,
  y,
  width,
  height,
  isSelected,
  progressX,
  progressWidth,
  barCornerRadius,
  styles,
  onMouseDown,
  task
}) => {
  // const getProcessColor = () => {
  //   return isSelected ? styles.progressSelectedColor : styles.progressColor
  // }

  const getBarColor = () => {
    return '#fff'
  }

  // const group = createSVG("g", {
  //   class: "bar-wrapper",
  //   "data-id": task?.task_id,
  // });

  return (
    <g onMouseDown={onMouseDown}>
      {/* <Popover content={() => <div>999</div>} title="Title" placement='top'> */}
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.barBackground}
      />
      {/* </Popover> */}

      {/* <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      /> */}
    </g>
  )
}
