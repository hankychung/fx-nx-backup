/**
 * 基于 requestIdleCallback 封装的一个计时器(用于在线程占用率比较高时, 不会排队)
 * @author 小利
 * @param options 配置属性
 * @options timer 等待时间 默认 900ms
 * @options maxDelay 最大时间间隔 默认 50
 * @options callback 完成时的回调函数
 * @options abortCallBack 取消callBack
 * @options 在等待完成时响应的promise
 * requestIdleCallback能在不影响核心线程状态下进行计算
 * doc: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
 *
 */
export function setTimeoutForIdleCallback({
  timer = 900,
  maxDelay = 50,
  callback,
  abortCallBack
}: {
  timer?: number
  maxDelay?: number
  callback?: () => void
  abortCallBack?: (cancelCallBack: () => void) => void
}) {
  let cancel = false
  const cancelCallBack = () => {
    cancel = true
  }

  abortCallBack && abortCallBack(cancelCallBack)
  return new Promise<void>((resolve) => {
    const dater: number = +new Date()
    const handleTimerOver = () => {
      if (+new Date() - dater! >= timer) {
        // console.log(+new Date() - dater)

        !cancel && callback && callback()
        resolve()
      } else {
        window.requestIdleCallback(handleTimerOver, {
          timeout: maxDelay
        })
      }
    }

    window.requestIdleCallback(handleTimerOver, {
      timeout: maxDelay
    })
  })
}
