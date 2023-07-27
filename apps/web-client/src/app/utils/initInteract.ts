import { BizApi } from '@flyele-nx/service'
import { GlobalInfoHandler, IContactDict } from '@flyele-nx/service-module'

const initInteract = () => {
  BizApi.getInteracts().then((list) => {
    console.log('@list', list)
    GlobalInfoHandler.updateInteracts(list)

    const dict = list.reduce<IContactDict>((pre, cur) => {
      const { user_id } = cur

      pre[user_id] = cur

      return pre
    }, {})

    GlobalInfoHandler.updateContactDict(
      new Proxy(dict, {
        get(target: IContactDict, p: string) {
          // TODO: fix here
          return target[p] || {}
        }
      })
    )
  })
}

export { initInteract }
