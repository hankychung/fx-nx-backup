import { bindPublicEvent } from '.'
import { SelectionG } from '../type'

export const BindTargetEvent = (enterG: SelectionG) => {
  bindPublicEvent(enterG)
}
