// kiwi-intl依赖
import KiwiIntl from 'kiwi-intl'
// 引入生成好的国际化资源
import zhCN from './.kiwi/zh-CN'
import enUS from './.kiwi/en-US'

const kiwiIntl = KiwiIntl.init('en-US', {
  'zh-CN': { ...zhCN },
  'en-US': { ...enUS }
})

export default kiwiIntl
