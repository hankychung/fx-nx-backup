interface IInviteLinkLongUrl {
  userId: string
  h5Url?: string
  id?: string
  matterType?: number
  isExternal?: boolean
  corpId?: string
}

/** 获取指定长度的数字字符串 */
export const getRandomNumberStr = (len: number) =>
  Array(len)
    .fill(null)
    .map(() => Math.floor(Math.random() * 10))
    .join('')

export const inviteLinkLongUrl = ({
  id,
  h5Url,
  userId,
  matterType,
  isExternal,
  corpId
}: IInviteLinkLongUrl) => {
  const state: string | undefined = {
    10701: 'task',
    10705: 'todo',
    10702: 'meeting',
    10708: 'project',
    100000000000003: 'space',
    10001: 'target'
  }[`${matterType}` as string]

  // 这里要加上 rid  给 h5 去获取信息更新埋点
  const rid = getRandomNumberStr(10)

  let urlParams = `/invite/${state}/?id=${id}&u=${userId}&rid=${rid}`

  if (['project', 'space'].includes(state as string)) {
    // 空间成员邀请分为内部/外部
    urlParams = urlParams.concat(`&memberType=${isExternal ? 2 : 1}`)
  }

  if (corpId) {
    urlParams += `&corp_id=${corpId}`
  }

  const url = `${h5Url}${urlParams}`

  return { url, rid }
}
