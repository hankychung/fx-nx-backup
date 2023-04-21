import { ObjectiveSnapMapParams } from '@flyele-nx/api'
import { MapSvgGetAvatarProxyFunc, OpenTargetCardFunc } from './system'

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
  getAvatar: MapSvgGetAvatarProxyFunc
}
