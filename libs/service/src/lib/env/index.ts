class EnvStore {
  private env = 'dev'

  private info: { [k: string]: { host: string } } = {
    dev: { host: 'https://api.flyele.vip' },
    test: { host: 'https://api-test.flyele.vip' },
    prod: { host: 'https://api.flyele.net' }
  }

  initEnv(env: string) {
    this.env = env
  }

  getHost() {
    return this.info[this.env].host
  }
}

export const envStore = new EnvStore()
