// kiwi-intl依赖
import KiwiIntl from 'kiwi-intl'
// 引入生成好的国际化资源
import zhCN from './.kiwi/zh-CN'
import enUS from './.kiwi/en-US'
import { ILang } from './types'

const lang = ((globalThis as any).lang || 'zh-CN') as ILang

const kiwiIntl = KiwiIntl.init(lang, {
  'zh-CN': { ...zhCN },
  'en-US': { ...enUS }
})

const isCN = lang === 'zh-CN'

export { isCN }

export default kiwiIntl
