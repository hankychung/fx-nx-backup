import { sqlStore } from '@flyele-nx/sql-store'

self.postMessage('init ws ok')

sqlStore.initDB().then((res) => {
  console.log('init from sw', res)

  self.postMessage({ initData: res })
})

self.onmessage = (msg) => {
  console.log('get event from client', msg)
}
