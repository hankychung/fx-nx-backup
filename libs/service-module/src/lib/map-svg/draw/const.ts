import { CreateMapProxy, CreateMapProxyValueGet } from '../type/bin'
import ImData from './ImData'

export const mmdata = CreateMapProxy<ImData>()
export const mmdataGet = CreateMapProxyValueGet(mmdata)
