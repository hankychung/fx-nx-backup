/* eslint-disable @typescript-eslint/no-explicit-any */
type ILang = 'zh-CN' | 'en-US'

function initLang(lang: ILang) {
  ;(global as any).lang = lang
}

const defaultLang = 'zh-CN'

function getLang() {
  return ((global as any).lang || defaultLang) as ILang
}

const lang = (process.env.NX_LANG || defaultLang) as ILang

// 初始化语言
initLang(lang)

export { initLang, getLang }
