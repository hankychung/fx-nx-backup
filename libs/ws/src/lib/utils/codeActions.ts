import { IWsMsg } from '@flyele-nx/types'
import { emitter } from '@flyele-nx/utils'

const codeActions = new Map<number[], (msg: IWsMsg) => void>([
  [
    /**
     * 缓存增量更新
     */
    [10001],
    async () => {
      emitter.emit('updateDatabase')
    }
  ]
])

export { codeActions }
