/**
 * 根据(头像)字段获取图片路径
 * @param key_name 头像名
 */
export const getSpaceAvatarUrl = (key_name = '') => {
  let urlObj = {
    normal: '',
    active: ''
  }

  if (key_name) {
    urlObj = {
      normal: `https://cdn.flyele.net/resources/PC/space/${key_name}.png`,
      active: `https://cdn.flyele.net/resources/PC/space/${key_name}_color.png`
    }
  }
  return urlObj
}
