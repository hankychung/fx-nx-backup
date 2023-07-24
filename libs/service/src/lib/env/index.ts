import { Env } from '@flyele-nx/constant'

class EnvStore {
  private env = 'dev'

  private domain: { [k: string]: { host: string } } = {
    dev: { host: 'https://pay-test.flyele.vip' },
    test: { host: 'https://pay-test.flyele.vip' },
    pre_prod: { host: 'https://pay.pre.flyele.vip' },
    prod: { host: 'https://pay.flyele.net' }
  }

  private nxDev = ''

  initEnv(env: string) {
    ;[this.env, this.nxDev] = env.split('-')

    return {
      url: this.getUrl()
    }
  }

  IsNxDev() {
    return this.nxDev
  }

  getDoMain() {
    return this.domain[this.env].host
  }

  getHost() {
    return Env.api[this.env].host
  }

  getUrl() {
    return Env.api[this.env].url
  }

  updateEnvByClient(env: 'dev' | 'test' | 'prod') {
    this.env = env
  }

  getEnv() {
    return this.env
  }
}

export const envStore = new EnvStore()
