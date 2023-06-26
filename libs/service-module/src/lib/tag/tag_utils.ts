/**
 author: william   email:362661044@qq.com
 create_at:2021/10/20 下午 3:48
 **/
import { CSSProperties } from 'react'
import { TagModel, TagConst } from '@flyele-nx/service'

export type IColorInfo = {
  text: string
  bg: string
  finished: CSSProperties
  dragging: CSSProperties
}

type IColorMap = Map<TagConst.TagWidgetColor, IColorInfo>

export class TagUtils {
  static readonly colors: IColorMap = new Map<
    TagConst.TagWidgetColor,
    IColorInfo
  >([
    [
      TagConst.TagWidgetColor.red,
      {
        text: '#F54930',
        bg: '#FFE7E3',
        finished: {
          color: 'rgba(253, 164, 178, 1)',
          backgroundColor: 'rgba(255, 242, 240, 1)'
        },
        dragging: { color: 'white', backgroundColor: 'rgba(254, 77, 77, 1)' }
      }
    ],
    [
      TagConst.TagWidgetColor.orange,
      {
        text: '#E88200',
        bg: '#FFF2D1',
        finished: {
          color: 'rgba(255, 210, 153, 1)',
          backgroundColor: 'rgba(255, 248, 232, 1)'
        },
        dragging: { color: 'white', backgroundColor: 'rgba(255, 172, 68, 1)' }
      }
    ],
    [
      TagConst.TagWidgetColor.green,
      {
        text: '#10AB9C',
        bg: '#E1F8F6',
        finished: {
          color: 'rgba(159, 219, 127, 1)',
          backgroundColor: 'rgba(245, 251, 239, 1)'
        },
        dragging: { color: 'white', backgroundColor: 'rgba(65, 183, 0, 1)' }
      }
    ],
    [
      TagConst.TagWidgetColor.blue,
      {
        text: '#356DEF',
        bg: '#E4ECFF',
        finished: {
          color: 'rgba(167, 197, 255, 1)',
          backgroundColor: 'rgba(240, 245, 255, 1)'
        },
        dragging: { color: 'white', backgroundColor: 'rgba(93, 123, 255, 1)' }
      }
    ],
    [
      TagConst.TagWidgetColor.purple,
      {
        text: '#8F57EF',
        bg: '#F3ECFF',
        finished: {
          color: 'rgba(195, 160, 255, 1)',
          backgroundColor: 'rgba(249, 245, 255, 1)'
        },
        dragging: { color: 'white', backgroundColor: 'rgba(135, 65, 255, 1)' }
      }
    ]
  ])

  // 兜底和兼容转化
  static checkColorKey(key: TagConst.TagWidgetColor): TagConst.TagWidgetColor {
    let _key = TagConst.TagWidgetColor.green

    if (TagUtils.colors.has(key)) {
      _key = key
    } else if (Object.keys(TagConst.TagWidgetColor).includes(key as any)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _key = TagConst.TagWidgetColor[key as any]
    }
    return _key
  }

  static getColor(key: TagConst.TagWidgetColor): IColorInfo {
    return TagUtils.colors.get(TagUtils.checkColorKey(key))!
  }

  static getTextColor(key: TagConst.TagWidgetColor) {
    return TagUtils.colors.get(TagUtils.checkColorKey(key))!.text
  }

  static getBgColor(key: TagConst.TagWidgetColor) {
    return TagUtils.colors.get(TagUtils.checkColorKey(key))?.bg
  }

  // ['red','orange',.....]
  static getColorList() {
    const obj = Object.fromEntries(TagUtils.colors)

    return Object.keys(obj)
  }

  /**
   *  [{name:xx,id:1...},{name:xx,id:2...}] => {1:{name:xx,id:1...},2:{name:xx,id:2...}}
   * **/
  static transformTagsMap(tags: TagModel[]): Map<string, TagModel> {
    const tagListMap = new Map<string, TagModel>()

    tags.forEach((item) => {
      tagListMap.set(item.id, item)
    })
    return tagListMap
  }

  /**
   *  [1,2,3,4] => [{name:xx,id:1...},{name:xx,id:2...}]
   * **/
  static keysTransFormTag(tags: TagModel[], keys: string[]): TagModel[] {
    if (tags.length === 0 || keys.length === 0) return []
    const _map = TagUtils.transformTagsMap(tags)

    return keys.map((item) => _map.get(item)!)
  }

  /***
   *  计算差值
   *  oldKeys =  ['1', '2', '3']
   *  newKeys =  ['4', '1', '5', '2', '9']
   *
   *  result===>
   *
   *  addKeys: ["4", "5", "9"]  removeKeys: ["3"]
   *
   * **/
  static differenceKeys({
    oldKeys,
    newKeys
  }: {
    oldKeys: string[]
    newKeys: string[]
  }): {
    removeKeys: string[]
    addKeys: string[]
  } {
    // 初始化
    const removeKeys: string[] = []
    const addKeys: string[] = []

    // 没有值情况
    if (oldKeys.length === 0 && newKeys.length === 0)
      return { removeKeys, addKeys }

    // 只有 oldKeys 移除全部
    if (oldKeys.length > 0 && newKeys.length === 0)
      return { removeKeys: oldKeys, addKeys }

    // 只有 newKeys 添加全部
    if (newKeys.length > 0 && oldKeys.length === 0)
      return { removeKeys, addKeys: newKeys }

    const maxLength = Math.max(newKeys.length, oldKeys.length)

    for (let i = 0; i < maxLength; i++) {
      const _newKey = newKeys[i]
      const _oldKey = oldKeys[i]

      // 如果都存在不做处理
      if (!(oldKeys.includes(_newKey) && newKeys.includes(_oldKey))) {
        // 如果存在差异

        if (!oldKeys.includes(_newKey) && _newKey) addKeys.push(_newKey)

        if (!newKeys.includes(_oldKey) && _oldKey) removeKeys.push(_oldKey)
      }
    }
    return { removeKeys, addKeys }
  }

  // 随机颜色
  static randomColor(): TagConst.TagWidgetColor {
    const colors = Object.values(TagConst.TagWidgetColor)

    const min = 0

    const max = colors.length - 1

    const r = Math.floor(Math.random() * (max - min + 1)) + min

    return colors[r]
  }

  // 循环颜色
  static loopColor(current: TagConst.TagWidgetColor): TagConst.TagWidgetColor {
    const colors = Object.values(TagConst.TagWidgetColor)

    const index = colors.indexOf(current)

    const _i = index + 1 > colors.length - 1 ? 0 : index + 1

    return colors[_i]
  }
}
