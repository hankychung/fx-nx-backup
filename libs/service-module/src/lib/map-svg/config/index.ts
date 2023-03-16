import { TwoNumber } from '../type/data'

const rootTextRectPadding = 10
const yGap = 30
const textRectPadding = Math.min(yGap / 2 - 1, rootTextRectPadding)

const addBtnRect = { side: 12, padding: 1, margin: 12 }
const addBtnSide = addBtnRect.side + addBtnRect.padding * 2
const expandBtnRect = { width: 14, height: 27, radius: 4 }

export const MapSvgConfig = {
  xGap: 70,
  yGap,
  // 线粗细
  branch: 1,
  // 缩放范围
  scaleExtent: [0.2, 2] as TwoNumber,
  // 目标卡片padding
  TargetPadding: 14,

  rootTextRectPadding,
  textRectPadding,
  addBtnRect,
  addBtnSide,
  expandBtnRect
}
