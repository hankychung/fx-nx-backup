import { CreateProxy } from '../type/bin'
import { Mdata, MDataTypeEnum } from '../type/mdata'
import { OpenTargetCardFunc } from '../type/system'

export const openTargetCardProxy = CreateProxy<OpenTargetCardFunc>(
  (target_id: string) => {
    console.log(target_id)
  }
)

export const openCardWin = (d: Mdata) => {
  if (d.type === MDataTypeEnum.target && d.target_id) {
    openTargetCardProxy.value(d.target_id)
  }
}
