import { BaseData, IsMdata, Mdata, MDataTypeEnum } from '../type/mdata'
import { GetCardTypeSize, GetSize, getSize } from '../utils/getSize'
import { flextree, FlextreeNode } from 'd3-flextree'
import { MapSvgConfig } from '../config'
import { FomratMainTimerStr } from '../utils/formart'
import { cloneDeep } from 'lodash'
import { Data } from '../type/data'
import { Processer } from '../type/bin'
import { isSuperiors } from '../utils/is'
import { getPadding } from './get'
import { DeleteDom } from './handle'

// const renewId = (d: Mdata, id: string) => (d.id = id)

/**
 * 布局树
 * @param xGap 每个节点的x间隔
 * @param yGap 每个节点的y间隔
 * @returns
 */
const getLayout = (xGap: number, yGap: number) => {
  return flextree<Mdata>({
    nodeSize: (node) => {
      let size = [0, 0]
      if (node) {
        const _size = getSize(node.data)
        const h = _size.height
        const padding = getPadding(node.data.type) * 2
        size = [_size.width + padding, h + padding]
      }
      const [y, x] = size
      return [x + yGap, y + xGap]
    }
  })
}

/**
 * 遍历数据d，在此过程中会对每个数据调用指定函数，同时删除id为del的数据，不处理被折叠的数据
 * @param d - 数据
 * @param processers - 函数
 * @param id - 新id
 */
const traverse = (d: Mdata, processers: Processer[], id = '0') => {
  processers.forEach((p) => {
    p(d, id)
  })

  const { children, superiors } = d

  if (children) {
    for (let index = 0; index < children.length; ) {
      const child = children[index]

      if (child.id === 'del') {
        children.splice(index, 1)
      } else {
        traverse(child, processers, `${id}-${index}-c`)
        index += 1
      }
    }
  }

  if (superiors) {
    for (let index = 0; index < superiors.length; ) {
      const superior = superiors[index]

      if (superior.id === 'del') {
        superiors.splice(index, 1)
      } else {
        traverse(superior, processers, `${id}-${index}-s`)
        index += 1
      }
    }
  }
}

/**
 * 获取当前Mdata下的最大和最小y
 * @param d
 * @returns
 */
const getMaxAndMinY = (d: Mdata) => {
  const padding = getPadding(d.type) * 2
  const typeSize = GetCardTypeSize(d.type)

  const MaxYset = new Set([d.y + typeSize.height + padding])

  const sMinYset = new Set<number>([])
  const cMinYset = new Set<number>([])

  if (d.isSuperiors) {
    sMinYset.add(d.y)
  } else {
    cMinYset.add(d.y)
  }

  for (const s of d.superiors) {
    const { superiors_min, max } = getMaxAndMinY(s)

    sMinYset.add(superiors_min)
    MaxYset.add(max)
  }

  for (const c of d.children) {
    const { children_min, max } = getMaxAndMinY(c)
    cMinYset.add(children_min)
    MaxYset.add(max)
  }

  const sortMax = [...MaxYset]
  sortMax.sort((a, b) => b - a)

  const sortSMin = [...sMinYset]
  sortSMin.sort((a, b) => {
    return a < b ? -1 : 1
  })

  const sortCMin = [...cMinYset]
  sortCMin.sort((a, b) => {
    return a < b ? -1 : 1
  })

  return {
    max: sortMax[0],
    superiors_min: sortSMin[0],
    children_min: sortCMin[0]
  }
}

/**
 * 处理最大每个根节点之间的值
 */

const addOffsetDataY = (
  d: Mdata,
  options: {
    isSuperiorAdd: boolean
    prevOffset: number
    minCtoRootOffset: number
  }
) => {
  const { prevOffset: _p, minCtoRootOffset } = options

  let prevOffset = _p

  d.y += prevOffset

  if (d.isRoot) {
    d.y += minCtoRootOffset

    prevOffset = d.y
  }

  const allchild = [...d.superiors, ...d.children]

  for (const c of allchild) {
    addOffsetDataY(c, {
      ...options,
      prevOffset
    })
  }

  return undefined
}

/**
 * 获取相对定位
 * @param d Mdata
 */
const renewDelta = (d: Mdata) => {
  if (d.parent) {
    d.dx = d.x - d.parent.x

    // const padding = getPadding(d.type) * 2
    // const h = getSize(d).height + padding
    // if (h >= d.height) {
    //   const diffY = d.height / 2
    //   d.y -= diffY
    // }

    d.dy = d.y - d.parent.y
  } else {
    d.dx = 0
    d.dy = 0
  }
}

const layoutHandle = getLayout(MapSvgConfig.xGap, MapSvgConfig.yGap)

/**
 * 将flextree的x,y 提取到 data中，并交换x,y，用于将横向树变换为纵向树
 * @param arr -
 * @param data -
 */
const extractDataFromFlexNode = (
  arr: FlextreeNode<Mdata>[],
  data: BaseData | Mdata
) => {
  const item = arr.find((f) => f.data.id === data.id)

  if (item) {
    data.x = item.y
    data.y = item.x

    if (data.isSuperiors) {
      data.x = -data.x
    }

    if (item.parent && data.parent) {
      data.parent.x = item.parent.y
      data.parent.y = item.parent.x

      if (data.parent.isSuperiors) {
        data.parent.x = -data.parent.x
      }
    }
  }
  if (data.children.length > 0) {
    data.children.forEach((c) => {
      extractDataFromFlexNode(arr, c)
    })
  }
}

/**
 * 刷新xy
 * @param data Mdata
 */
const refreshXy = (data: Mdata) => {
  const root_children = layoutHandle.hierarchy(data)
  layoutHandle(root_children)
  extractDataFromFlexNode(root_children.descendants(), data)
}

// 翻转所有的上级到下级关系
const reverseLevel = (data: Mdata) => {
  ;[data.cache.children, data.children] = [[...data.children], data.superiors]

  for (const d of data.children) {
    reverseLevel(d)
  }
}

const restoreLevel = (data: Mdata) => {
  ;[data.superiors, data.children] = [data.children, [...data.cache.children]]

  for (const d of data.superiors) {
    restoreLevel(d)
  }
}

/**
 * 获取新的xy
 * @param data Mdata
 * @param plugins Processer[]
 */
const renewXY = (data: Mdata, plugins: Processer[]) => {
  traverse(data, plugins)

  // 刷新下级坐标
  refreshXy(data)

  /** 翻转所有的上下级关系 刷新上级的坐标 再翻转回来 */
  reverseLevel(data)
  refreshXy(data)
  restoreLevel(data)

  const temp: Processer[] = [renewDelta]
  traverse(data, temp)
}

class ImData {
  data: Mdata[]
  expandLock: { [key: string]: boolean } = {}

  private getSize: GetSize
  private MdataDefaultValue = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    px: 0,
    py: 0,
    width: 0,
    height: 0,
    componentKey: '',
    isRoot: false,
    cache: {
      superiors: [] as Mdata[],
      _superiors: [] as Mdata[],
      children: [] as Mdata[],
      _children: [] as Mdata[]
    },
    superiors: [] as Mdata[],
    _superiors: [] as Mdata[],
    children: [] as Mdata[],
    _children: [] as Mdata[]
  }

  constructor(componentKey: string, d: Data[]) {
    this.MdataDefaultValue.componentKey = componentKey

    this.getSize = getSize
    this.data = []

    for (const v of d) {
      this.data.push(this.createMdataFromData(v, '0'))
    }

    this.renew()
  }

  createMdataFromData(
    rawData: Data,
    id: string,
    parent: IsMdata = null
  ): Mdata {
    const {
      title,
      takers,
      children_total,
      superiors_total,
      collapse,
      superior_collapse,
      children: rawChildren,
      superiors: rawSuperiors,

      start_time,
      start_time_full_day,
      end_time,
      end_time_full_day,

      target_level,
      target_status,
      target_progress,
      target_id,

      // test 数据
      test_type,
      card_type
    } = rawData

    let isRoot = false

    let type = MDataTypeEnum.matter
    if (test_type) type = test_type
    if (card_type) type = card_type

    if (!isNaN(Number(id)) && type === MDataTypeEnum.target) {
      id = `${target_id}-${id}`

      isRoot = true
    }

    let depth = '0'

    if (parent?.depth) {
      depth = `${Number(parent.depth.split('-')[0]) + 1}-${
        isSuperiors(id) ? 's' : 'c'
      }`
    }

    const data = Object.assign(cloneDeep(this.MdataDefaultValue), {
      id,
      title,
      parent,
      type,
      depth,
      isRoot,
      isSuperiors: isSuperiors(id),
      typeSize: GetCardTypeSize(type),

      timer: '',
      start_time,
      start_time_full_day,
      end_time,
      end_time_full_day,

      target_level,
      target_status,
      target_progress,
      target_id,

      takers,

      cache: {},

      children_total,
      collapse: collapse as boolean,

      superiors_total,
      superior_collapse: superior_collapse
    })

    data.timer = FomratMainTimerStr(data)

    const { width, height } = this.getSize(data)

    data.height = height
    data.width = width

    // 下级
    if (rawChildren) {
      rawChildren.forEach((c, j) => {
        const _c = this.createMdataFromData(c, `${id}-${j}-c`, data)
        if (!data.collapse) {
          data.children.push(_c)
        } else {
          data._children.push(_c)
        }
      })

      if (data.children.length || data._children.length) {
        delete data.children_total
      }
    }

    // 上级
    if (rawSuperiors) {
      rawSuperiors.forEach((c, j) => {
        const _c = this.createMdataFromData(c, `${id}-${j}-s`, data)
        if (!data.superior_collapse) {
          data.superiors.push(_c)
        } else {
          data._superiors.push(_c)
        }
      })

      if (data._superiors.length || data.superiors.length) {
        delete data.superiors_total
      }
    }

    return data
  }

  renew(...plugins: Processer[]) {
    for (const d of this.data) {
      renewXY(d, plugins)
    }

    for (let i = 1; i < this.data.length; i++) {
      const prev = this.data[i - 1]
      const now = this.data[i]

      const { max } = getMaxAndMinY(prev)

      const { superiors_min, children_min } = getMaxAndMinY(now)

      const minCtoRootOffset =
        now.y - Math.min(superiors_min || 0, children_min || 0)

      const isSuperiorAdd = Boolean(
        now.superiors.length &&
          now.children.length &&
          superiors_min > children_min
      )

      addOffsetDataY(now, {
        isSuperiorAdd,
        prevOffset: max + MapSvgConfig.yGap,
        minCtoRootOffset
      })
    }
  }

  find(id: string, data = this.data): IsMdata {
    // 根据id找到数据

    if (!data) return null

    const all: Mdata[] = []

    const isS = isSuperiors(id)

    let findD

    for (const d of data) {
      if (d.id === id) {
        findD = d
        break
      }

      if (isS) {
        all.push(...d.superiors)
      } else {
        all.push(...d.children)
      }
    }

    if (!findD) {
      findD = this.find(id, all)
    }

    return findD
  }

  expand(id: string): IsMdata {
    return this.eoc(id, false)
  } //
  collapse(id: string): IsMdata {
    return this.eoc(id, true)
  }
  expandS(id: string): IsMdata {
    return this.eoc(id, false, { isSuperiors: true })
  }
  collapseS(id: string): IsMdata {
    return this.eoc(id, true, { isSuperiors: true })
  }

  /**
   * 展开或折叠(expand or collapse)
   */
  eoc(
    id: string,
    collapse: boolean,
    options?: { plugins?: Processer[]; isSuperiors?: boolean }
  ): IsMdata {
    const d = this.find(id)

    const { plugins = [], isSuperiors } = options || {}

    if (d) {
      if (isSuperiors) {
        if (d.superior_collapse === collapse) return d
        // 赋值
        d.superior_collapse = collapse
        // 置换
        ;[d._superiors, d.superiors] = [d.superiors, d._superiors]
      } else {
        // 当展开折叠不变的情况下 不需要执行赋值和置换操作
        if (d.collapse === collapse) return d
        // 赋值
        d.collapse = collapse
        // 置换
        ;[d._children, d.children] = [d.children, d._children]
      }

      if (collapse) {
        const childs = isSuperiors ? d._superiors : d._children

        for (const { id } of childs) {
          DeleteDom.value.push(`g[data-id='${id}']`)
        }
      }

      this.renew(...plugins)
    }
    return d
  }
}

export default ImData
