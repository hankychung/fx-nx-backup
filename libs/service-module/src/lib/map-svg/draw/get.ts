import { MapSvgConfig } from '../config'
import { linkHorizontal } from '../d3'
import { asstSvg, selectionAsstSvg } from '../d3/selection'
import { EnterE } from '../type'
import { TwoNumber } from '../type/data'
import { Mdata, MdataTaker, MDataTypeEnum } from '../type/mdata'
import { TargetLevel, TargetStatus } from '../type/target'

export const getGTransform = (d: Mdata): string => {
  // return `translate(${d.x},${d.y})`
  if (d.isRoot) {
    return `translate(${d.x},${d.y})`
  }
  return `translate(${d.dx + d.px},${d.dy + d.py})`
}

export const getDataId = (d: Mdata): string => d.id

export const getTakerId = (v: MdataTaker) => v.taker_id || v.user_id || ''

export const getNodeIsRoot = (enter: EnterE) => {
  return !!enter.data()[0]?.isRoot
}

export const getPadding = (type: MDataTypeEnum) => {
  switch (type) {
    case MDataTypeEnum.target:
      return MapSvgConfig.TargetPadding
    default:
      return 14
  }
}

export const getPath = (d: Mdata) => {
  let dpw = 0
  let dph = 0

  let w = d.width

  const { parent } = d

  const Padding = getPadding(d.type) * 2

  const typeSize = d.typeSize

  if (parent) {
    dpw = parent.width + Padding
    dph = parent.typeSize.height / 2
    // sourceOffset = 0
  }
  if (d.isSuperiors) {
    dpw = -dpw + d.width
    w = -w
  }

  const source: TwoNumber = [
    -d.dx + dpw - d.px + (d.isSuperiors ? -10 : 10),
    -d.dy + dph - d.py
  ]

  // 目标点
  const target: TwoNumber = [-Padding / 2, typeSize.height / 2]

  if (d.isSuperiors) {
    target[0] = d.width + Padding / 2
  }

  // 伸出去那根线
  let line = w

  if (d.isSuperiors) {
    if (!d.superior_collapse && d.superiors.length) {
      line = -38
    } else {
      line = 0
    }
  }

  if (!d.collapse && d.children.length) {
    line += 38
  }

  if (d.isRoot) {
    source[0] = !d.superior_collapse && d.superiors.length ? -38 : 0
    source[1] = d.dy + typeSize.height / 2
  }

  // 节点的下划线
  const TextUnderline = `L${line},${target[1]}`

  if (d.isRoot) {
    return `${linkHorizontal({ source, target })}${TextUnderline}`
  }

  const splitX = Math.abs((source[0] - target[0]) / 2)
  const splitY = Math.abs((target[1] - source[1]) / 2)
  const maxs = Math.min(splitX, splitY)

  const M1: TwoNumber = [...source]
  const T1: TwoNumber = [source[0] + splitX, 0]

  if (d.isSuperiors) {
    T1[0] = source[0] - splitX
  }

  const M2: TwoNumber = [T1[0], 0]
  const T2: TwoNumber = [...target]

  const SY = source[1]
  const TY = target[1]

  if (SY < TY) {
    M2[1] = Math.max(TY - splitX, TY - splitY)
    T1[1] = Math.min(SY + splitX, SY + splitY)
  } else {
    M2[1] = Math.min(TY + splitX, TY + splitY)
    T1[1] = Math.max(SY - splitX, SY - splitY)
  }

  const M1Q = [T1[0] + (splitY < splitX ? (d.isSuperiors ? 5 : -5) : 0), M1[1]]

  const M1Line = `M${M1.join()}Q${M1Q.join(' ')} ${T1.join('  ')}`

  const M2Q = [T2[0] + (d.isSuperiors ? maxs : -maxs), T2[1]]
  const M2Line = `M${M2.join()}Q${M2Q.join(' ')} ${T2.join()}`

  const MtoMLine = `L${M2.join()}`

  // 节点的下划线
  return `${M1Line}${MtoMLine}${M2Line}${TextUnderline}`
}

/**
 * 将一个字符串按换行符切分，返回字符串数组
 * @param str - 字符串
 */
export const getMultiline = (str: string): string[] => {
  const multiline = str.split('\n')
  if (multiline.length > 1 && multiline[multiline.length - 1] === '') {
    multiline.pop()
  }
  return multiline
}

export const getSiblingGClass = (d?: Mdata): string[] => {
  const arr = ['node']
  if (d) {
    arr.push(`depth-${d.depth}`)
  }
  return arr
}

// 将文本根据宽度和字体大小切割
export const getMultilineTexts = (
  text: string,
  maxWidth = 214,
  fontSize = 12
) => {
  const asst = Object.entries(asstSvg).filter(
    ([key]) => key !== 'effect'
  )?.[0]?.[1] as unknown as selectionAsstSvg

  if (!asst) {
    throw new Error('asstSvg undefined')
  }
  const t = asst.append('text').attr('font-size', fontSize)

  const texts = text.split('')
  const textLineDatas: string[] = []

  let textLength = 0
  let lineText = ''

  texts.forEach((v, i) => {
    const nextText = `${lineText}${v}`

    t.text(nextText)

    textLength = t.node()?.getComputedTextLength() || 0

    if (textLength > maxWidth) {
      textLineDatas.push(lineText)
      lineText = v
    } else if (i === texts.length - 1) {
      textLineDatas.push(nextText)
    } else {
      lineText = nextText
    }
  })

  return textLineDatas
}

/**
 * 获取文本在tspan中的宽度与高度
 * @param text -
 * @returns -
 */
export const getTextSize = (
  text: string,
  fontSize = 12
): { width: number; height: number } => {
  const asst = Object.entries(asstSvg).filter(
    ([key]) => key !== 'effect'
  )?.[0]?.[1] as unknown as selectionAsstSvg

  if (!asst) {
    throw new Error('asstSvg undefined')
  }
  const multiline = getMultiline(text)
  const t = asst.append('text')

  t.selectAll('tspan')
    .data(multiline)
    .enter()
    .append('tspan')
    .text((d) => d)
    .attr('x', 0)
    .attr('font-size', fontSize + 'px')
  const tBox = (t.node() as SVGTextElement).getBBox()
  t.remove()
  return {
    width: Math.max(tBox.width, 5),
    height: Math.max(tBox.height, 13) * multiline.length
  }
}

export const getAddBtnTransform = (d: Mdata, trp: number): string => {
  const typeSize = d.typeSize
  const y = typeSize.height / 2 - MapSvgConfig.addBtnSide / 2
  let x =
    d.width + trp + MapSvgConfig.addBtnSide / 2 + MapSvgConfig.addBtnRect.margin

  if (d.isSuperiors) {
    x = -x
  }
  return `translate(${x},${y})`
}

export const getExpandBtnTransform = (d: Mdata, trp: number): string => {
  const typeSize = d.typeSize
  const padding = getPadding(d.type)
  const y = typeSize.height / 2 - padding
  const x = d.width + trp

  return `translate(${x},${y})`
}

export const getSExpandBtnTransform = (d: Mdata): string => {
  const typeSize = d.typeSize
  const padding = getPadding(d.type)

  const y = typeSize.height / 2

  return `translate(${0 - padding - 14},${y - padding})`
}

export const getTargetLevelText = (level: TargetLevel) => {
  switch (level) {
    case TargetLevel.part: {
      return '部门级'
    }
    case TargetLevel.company: {
      return '公司级'
    }
    default: {
      return '个人级'
    }
  }
}

export const getTargetStatusText = (status: TargetStatus) => {
  switch (status) {
    case TargetStatus.risk: {
      return { color: '#ED982B', text: '风险' }
    }
    case TargetStatus.delay: {
      return { color: '#EB6646', text: '延期' }
    }
    case TargetStatus.over: {
      return { color: '#92929D', text: '完结' }
    }
    default: {
      return { color: '#25BBAD', text: '正常' }
    }
  }
}

export const getProgressStatusColor = (status: TargetStatus) => {
  switch (status) {
    case TargetStatus.risk: {
      return {
        all: '#F2EFE5',
        now: '#FFAC44'
      }
    }
    case TargetStatus.delay: {
      return {
        all: '#F5ECEC',
        now: '#E8694C'
      }
    }
    case TargetStatus.over: {
      return {
        all: '#EEEEEE',
        now: '#B4B4B4'
      }
    }
    default: {
      return {
        all: '#E4EDF5',
        now: '#1DD2C1'
      }
    }
  }
}
