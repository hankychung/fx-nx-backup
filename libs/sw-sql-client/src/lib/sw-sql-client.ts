const registerServiceWorker = async (url: string) => {
  if (!('serviceWorker' in navigator)) {
    console.error('serviceWorker is not supported')
    return
  }

  const serviceWorker = new Worker(url)

  serviceWorker.addEventListener('message', (data: any) => {
    console.log('client get ->', data)

    if (data.initData) {
      console.log('on msg from sw', data)
    }
  })
}

export { registerServiceWorker }
