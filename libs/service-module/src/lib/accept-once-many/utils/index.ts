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

export const addKey = (arr: any[]) => {
  if (!arr?.length) return []
  const list: any = []
  arr.forEach((item) => {
    // item.key = item.task_id
    list.push({ ...item, key: item.ref_task_id })
    if (item.children) addKey(item.children)
  })

  return list
}

// 将平铺列表转化为树结构
export const getListToTree = (
  list: Array<{ task_id: string; parent_id: string }>
) => {
  const levelList = list.map((v) => {
    const parent_ids = v.parent_id.split(',').reverse()

    return {
      ...v,
      parent_ids,
      children: [] as any[],
      remove: false
    }
  })

  for (const t of levelList) {
    for (const id of t.parent_ids) {
      const p = levelList.find((v) => v.task_id === id)

      if (!p) {
        continue
      }

      p.children.push(t)

      t.remove = true

      break
    }
  }

  return levelList.filter((v) => !v.remove)
}
