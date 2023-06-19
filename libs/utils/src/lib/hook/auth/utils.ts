/**
 author: william   email:362661044@qq.com
 create_at:2022/6/2 上午 10:49
 **/

export const createInfinite = (num: number | undefined) => {
  if (num) {
    return num === -1 ? Number.POSITIVE_INFINITY : num
  }
  return Number.POSITIVE_INFINITY
}
