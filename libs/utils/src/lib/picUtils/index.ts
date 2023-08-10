import html2canvas from 'html2canvas'
import { IDomToImageOptions } from './types'

/**
 * 图片url转成base64
 * base64to64 是 已经是base64的图片 还是要再转一下 base64
 * 比如邀请协作人的微信二维码，'app/service/official.ts'，他们原本直接拼接的话 不是正常的base64 用于 electron.nativeImage 的时候 不行
 * 所以再转一次才能使用
 */
export const imgToBase64 = (
  url: string,
  options?: {
    base64to64?: boolean
  }
): Promise<string> => {
  let canvas: HTMLCanvasElement | null = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  let target = url

  if (options && options.base64to64) {
    target.replace('data:image/png;base64,', '')
  } else {
    target = `data:image/png;base64,${url}`
  }

  img.setAttribute('crossOrigin', '*')
  img.src = target

  return new Promise((resolve) => {
    img.onload = () => {
      if (ctx && canvas) {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL()

        canvas = null

        resolve(dataUrl)
      }
    }

    img.onerror = () => {
      canvas = null
      resolve('')
    }
  })
}

/**
 * 默认忽略节点函数
 * 当你发现 html 生成图片特别慢的时候，你可以选择通过这个参数来忽略节点
 * 因为 html2canvas 会把你整个项目的节点都遍历一遍，包括 header 和 style等
 * 所以项目大的话 一定会卡，可以参考 app/components/MemberSelectorModal/modules/add/components/QrcodeInvite
 * ignoreElements 通过 options 里面传入喔
 */
const defaultIgnoreElements = () => {
  return false
}

/**
 * 把页面某个节点下的内容变成图片
 * html2canvas文档： https://html2canvas.hertzen.com/configuration
 */
export const domToImage = async (
  targetDom: HTMLElement,
  options?: IDomToImageOptions
) => {
  const needUrl = options?.needUrl ?? true
  const ignoreElements = options?.ignoreElements || defaultIgnoreElements
  const backgroundColor = options?.backgroundColor || '#ffffff'

  const canvas = await html2canvas(targetDom, {
    allowTaint: true,
    useCORS: true,
    backgroundColor, // 不要设置null 透明，测试反馈 Windows透明图片的话 图片周边会有点难看
    logging: false,
    ignoreElements,
    width: options?.width,
    height: options?.height
  })

  if (needUrl) {
    return canvas.toDataURL()
  }
  return canvas
}
