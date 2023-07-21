class Env {
  static api: { [k: string]: { host: string; url: string } } = {
    dev: { host: 'https://api.flyele.vip', url: 'api.flyele.vip' },
    test: { host: 'https://api-test.flyele.vip', url: 'api-test.flyele.vip' },
    prod: { host: 'https://api.flyele.net', url: 'api.flyele.net' }
  }
}

export { Env }
