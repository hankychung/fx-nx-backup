class EnvStore {
  private env = 'dev'

  private info: { [k: string]: { host: string } } = {
    dev: { host: 'https://api.flyele.vip' },
    test: { host: 'https://api-test.flyele.vip' },
    pre_prod: { host: 'https://api.pre.flyele.vip' },
    prod: { host: 'https://api.flyele.net' }
  }
  private domain: { [k: string]: { host: string } } = {
    dev: { host: 'https://pay-test.flyele.vip' },
    test: { host: 'https://pay-test.flyele.vip' },
    pre_prod: { host: 'https://pay.pre.flyele.vip' },
    prod: { host: 'https://pay.flyele.vip' }
  }

  initEnv(env: string) {
    this.env = env
  }
  getDoMain() {
    return this.domain[this.env].host
  }
  getHost() {
    return this.info[this.env].host
  }
}

export const envStore = new EnvStore()
