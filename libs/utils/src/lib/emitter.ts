import { IMittEvent } from '@flyele-nx/types'
import mitt from 'mitt'

const emitter = mitt<IMittEvent>()

export { emitter }
