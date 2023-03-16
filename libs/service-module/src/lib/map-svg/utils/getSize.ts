import { Mdata, MDataTypeEnum } from '../type/mdata'

export const GetCardTypeSize = (type: number) => {
  const size = { width: 300, height: 80, specialHeight: 0 }

  switch (type) {
    case MDataTypeEnum.meeting:
    case MDataTypeEnum.todo:
    case MDataTypeEnum.matter: {
      size.width = 212
      size.height = 61
      break
    }
    case MDataTypeEnum.project:
    case MDataTypeEnum.note:
    case MDataTypeEnum.file:
    case MDataTypeEnum.workspace: {
      size.width = 212
      size.height = 40
      break
    }
    case MDataTypeEnum.target: {
      size.width = 212
      size.height = 63
      break
    }
    default:
      break
  }

  return size
}

export type GetSize = (d: Mdata) => {
  width: number
  height: number
  specialHeight: number
}
export const getSize: GetSize = (d: Mdata) => {
  const size = GetCardTypeSize(d.type)
  return size
}
