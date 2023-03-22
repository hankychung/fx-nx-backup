import { enterTargetNode, updateTargetNode } from '../card/target'
import * as d3 from '../d3/d3-import'
import { foreignEleGet } from '../d3/element'
import { gGet } from '../d3/selection'
import { EnterE, SelectionG } from '../type'
import { Mdata } from '../type/mdata'
import { mmdataGet } from './const'
import { getSiblingGClass } from './get'

const enterNode = (enterElement: EnterE, d: Mdata) => {
  return enterTargetNode(enterElement, d)
  // switch (d.type) {
  //   case MDataTypeEnum.target: {
  //     return appendTargetCard(enterElement, d)
  //   }
  // }
}

const mergeNode = (node: SelectionG, d: Mdata) => {
  return updateTargetNode(node, d)

  // switch (d.type) {
  //   case MDataTypeEnum.target: {
  //     return
  //   }
  // }
}

export const draw = (
  key: string,
  datas?: Mdata[],
  seleE?: SelectionG
): void => {
  const sele = seleE || gGet(key)

  const d = datas || mmdataGet(key)?.data || []

  if (!sele) return

  const foreign = foreignEleGet(key)

  const temp = sele
    .selectAll<SVGGElement, Mdata>(`g.${getSiblingGClass(d[0]).join('.')}`)
    .data(d, (d) => d.id)

  // #Insert or Append
  temp.enter().select(function (this: d3.EnterElement, d: Mdata) {
    const enterElement = d3.select(this) as unknown as EnterE
    const createNode = enterNode(enterElement, d)
    const node = createNode.node() as SVGGElement

    /** 别问，禁止any，这里的类型处理很勾八狗血，能过就能用 */
    if (d.isRoot && foreign) {
      return this.insertBefore(node, foreign) as unknown as null
    }
    return this.appendChild(node) as unknown as null
  })

  // #Update View Node
  temp.merge(temp).each(function (d, i) {
    const node = d3.select(this) as unknown as SelectionG

    if (d.children.length) draw(key, d.children, node)

    if (d.superiors.length) draw(key, d.superiors, node)

    mergeNode(node, d)
  })

  temp.exit().remove()
}
