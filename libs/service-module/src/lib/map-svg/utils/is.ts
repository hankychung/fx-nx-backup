import { Mdata } from '../type/mdata'

/**
 * 判断是否为上级
 * @param id Mdata['id']
 * @returns
 */
export const isSuperiors = (id: Mdata['id']) => {
  return id.split('-').pop() === 's'
}
