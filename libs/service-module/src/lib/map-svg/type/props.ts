import { ObjectiveSnapMapParams } from '@flyele-nx/api'
import { OpenTargetCardFunc } from './system'

export interface MapSvgRef {
  refresh: () => void
}

export class InitMapSvgRef {
  refresh() {
    // 刷新
  }
}

export interface MavpSvgProps extends ObjectiveSnapMapParams {
  openTargetCard: OpenTargetCardFunc
}
