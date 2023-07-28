import { BizApi } from '@flyele-nx/service'
import { GlobalInfoHandler, IContactDict } from '@flyele-nx/service-module'
import { getUserInfoSafely } from './getUserInfo'

export const invalidTaker = {
  avatar: 'https://cdn.flyele.net/resources/default_avatar.png',
  nick_name: 'invalid',
  original_name: 'invalid',
  pinyin: 'invalid',
  remark: 'invalid',
  userId: 'invalidId',
  name: 'invalidId'
}

const initInteract = () => {
  const userInfo = getUserInfoSafely()

  if (!userInfo) return

  BizApi.getInteracts().then((list) => {
    GlobalInfoHandler.updateInteracts(list)

    const dict = list.reduce<IContactDict>(
      (pre, cur) => {
        const { user_id } = cur

        pre[user_id] = cur

        return pre
      },
      { [userInfo.user_id]: userInfo }
    )

    GlobalInfoHandler.updateContactDict(
      new Proxy(dict, {
        get(target: IContactDict, p: string) {
          return target[p] || invalidTaker
        }
      })
    )
  })
}

export { initInteract }
