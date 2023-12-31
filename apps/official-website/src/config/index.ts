/* eslint-disable @typescript-eslint/no-explicit-any */
type ILang = 'zh-CN' | 'en-US'

function initLang(lang: ILang) {
  ;(global as any).lang = lang
}

function getLang() {
  return ((global as any).lang || 'zh-CN') as ILang
}

// 初始化语言
initLang('zh-CN')

export { initLang, getLang }
