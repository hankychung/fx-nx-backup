const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.error('serviceWorker is not supported')
    return
  }

  try {
    const registration = await navigator.serviceWorker.register(
      '../worker.ts',
      {
        scope: '/'
      }
    )
    if (registration.installing) {
      console.log('正在安装 Service worker')
    } else if (registration.waiting) {
      console.log('已安装 Service worker installed')
    } else if (registration.active) {
      console.log('激活 Service worker')
    }

    navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage('init ok')
    })
  } catch (error) {
    console.error(`注册失败：${error}`)
  }
}

export { registerServiceWorker }
