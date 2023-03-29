export * from './lib/sql-store'
export * from './lib/service-worker'

addEventListener('message', (event) => {
  console.log('get event from client', event.data)
})
