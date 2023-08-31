import { ChildMatterData } from '@flyele-nx/types'

export const find = (
  data: Array<ChildMatterData>,
  key: string | number | ((item: ChildMatterData) => boolean),
  callback: (
    data: ChildMatterData,
    i: number,
    parentData: Array<ChildMatterData>
  ) => void
) => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]

    const isMatch = typeof key === 'function' ? key(item) : item.key === key

    if (isMatch) {
      callback(item, i, data)
      return
    }
    if (Array.isArray(item.children)) {
      find(item.children, key, callback)
    }
  }
}

/** 用 key 查找子事项 */
export const findChildMatter = (data: Array<ChildMatterData>, key: string) => {
  let res: ChildMatterData | null = null
  let idx = -1

  find(data, key, (i, index) => {
    idx = index
    res = i
  })

  return [res, idx] as [ChildMatterData | null, number]
}

// 找到树下的所有key
export const getAllKeys = <
  T extends { children?: T[]; [key: string]: any },
  K extends keyof T
>(
  arr: T[],
  key: K,
  res: string[] = []
) => {
  arr.forEach((i) => {
    res.push(i[key] as unknown as string)
    if (i.children) {
      getAllKeys(i.children, key, res)
    }
  })
  return res
}
