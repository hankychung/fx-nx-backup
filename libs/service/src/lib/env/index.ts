type IEnv = 'dev' | 'test' | 'prod'

type IType = 'neiMongol' | 'pay' | 'normal'

const normal: Record<IEnv, string> = {
  dev: 'api.flyele.vip',
  test: 'api-test.flyele.vip',
  prod: 'api.flyele.net'
}

const neiMongol: Record<IEnv, string> = {
  dev: 'api.flyele.nm135.cn', // 正式环境的外网放 dev 上
  test: 'api-test.nm10086.p.flyele.vip',
  prod: 'api-intranet.flyele.nm135.cn' // 内网
}

const pay: Record<IEnv, string> = {
  dev: 'pay-test.flyele.vip',
  test: 'pay-test.flyele.vip',
  // pre_prod: { host: '${prefix}pay.pre.flyele.vip' },
  prod: 'pay.flyele.net'
}

const getUrl = ({
  env,
  type,
  fullPath
}: {
  env: IEnv
  type: IType
  fullPath?: boolean
}) => {
  const getPrefix = () =>
    type === 'neiMongol' && env === 'prod' ? 'http://' : 'https://'

  const urlDict =
    type === 'neiMongol' ? neiMongol : type === 'pay' ? pay : normal

  return `${fullPath ? getPrefix() : ''}${urlDict[env]}`
}

class EnvStore {
  private env: IEnv = 'dev'

  private nxDev = ''

  private type: IType = 'normal'

  initEnv(
    env: string,
    options?: {
      type: IType
    }
  ) {
    ;[this.env, this.nxDev] = env.split('-') as [IEnv, string]

    this.type = options?.type || 'normal'

    return {
      url: this.getUrl()
    }
  }

  IsNxDev() {
    return this.nxDev
  }

  getPayHost() {
    return getUrl({ env: this.env, fullPath: true, type: 'pay' })
  }

  getHost() {
    return getUrl({ env: this.env, fullPath: true, type: this.type })
  }

  getUrl() {
    return getUrl({ env: this.env, type: this.type })
  }

  updateEnvByClient(env: IEnv, type: IType) {
    this.env = env
    this.type = type
  }

  getEnv() {
    return this.env
  }
}

export const envStore = new EnvStore()
