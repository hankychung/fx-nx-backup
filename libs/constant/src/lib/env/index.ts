const getLang = () => {
  if ((global as any).lang) return (global as any).lang

  const lang = localStorage.getItem('ENV_LANG')
  if (lang) {
    ;(global as any).lang = lang
    return lang
  }
}

type IEnv = 'dev' | 'test' | 'prod'

type IType = 'neiMongol' | 'pay' | 'normal'

const normal: Record<IEnv, string> = {
  dev: 'api.flyele.vip',
  test: 'api-test.flyele.vip',
  get prod() {
    const isCN = getLang() === 'zh-CN'
    return isCN ? 'api.flyele.net' : 'api.flyele.com'
  }
}

/**
 * 邀请链接
 * 长链接转短链接
 */
const normalShortUrl: Record<IEnv, string> = {
  dev: 'd.flyele.vip',
  test: 'd-test.flyele.vip',
  get prod() {
    const isCN = getLang() === 'zh-CN'
    return isCN ? 'd.flyele.net' : 'd.flyele.com'
  }
}

const neiMongol: Record<IEnv, string> = {
  dev: 'api.flyele.nm135.cn', // 正式环境的外网放 dev 上
  test: 'api-test.nm10086.p.flyele.vip',
  prod: 'api-intranet.flyele.nm135.cn' // 内网
}

const neiMongolShortUrl: Record<IEnv, string> = {
  dev: 'd.flyele.nm135.cn', // 正式环境的外网放 dev 上
  test: 'd-test.nm10086.p.flyele.vip',
  prod: 'd-intranet.flyele.nm135.cn' // 内网
}

const pay: Record<IEnv, string> = {
  dev: 'pay-test.flyele.vip',
  test: 'pay-test.flyele.vip',
  // pre_prod: { host: '${prefix}pay.pre.flyele.vip' },
  get prod() {
    const isCN = getLang() === 'zh-CN'
    return isCN ? 'pay.flyele.net' : 'pay.flyele.com'
  }
}

const normalH5Url: Record<IEnv, string> = {
  dev: 'https://localhost:8080',
  test: 'https://h5-test.flyele.vip',
  get prod() {
    const isCN = getLang() === 'zh-CN'
    return isCN ? 'https://h5.flyele.net' : 'https://h5.flyele.com'
  }
}

const neiMongolH5Url: Record<IEnv, string> = {
  dev: 'https://localhost:8080',
  test: 'https://h5.nm10086.p.flyele.vip',
  prod: 'http://h5-intranet.flyele.nm135.cn'
}

const getHttpInfo = ({ env, type }: { env: IEnv; type: IType }) => {
  return type === 'neiMongol' && env === 'prod' ? 'http://' : 'https://'
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
  const httpInfo = getHttpInfo({ env, type })

  const urlDict =
    type === 'neiMongol' ? neiMongol : type === 'pay' ? pay : normal

  return `${fullPath ? httpInfo : ''}${urlDict[env]}`
}

const getShortUrl = ({ env, type }: { env: IEnv; type: IType }) => {
  const httpInfo = getHttpInfo({ env, type })

  const urlDict = type === 'neiMongol' ? neiMongolShortUrl : normalShortUrl

  return `${httpInfo}${urlDict[env]}`
}

const getH5Url = ({ env, type }: { env: IEnv; type: IType }) => {
  const urlDict = type === 'neiMongol' ? neiMongolH5Url : normalH5Url

  return `${urlDict[env]}`
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
    console.log('getHostgetHost')
    return getUrl({ env: this.env, fullPath: true, type: this.type })
  }

  getUrl() {
    return getUrl({ env: this.env, type: this.type })
  }

  getShortHost() {
    return getShortUrl({ env: this.env, type: this.type })
  }

  getH5Url() {
    return getH5Url({ env: this.env, type: this.type })
  }

  updateEnvByClient(env: IEnv, type: IType) {
    this.env = env
    this.type = type
  }

  getEnv() {
    return this.env
  }
}

export const appInfo = {
  platform: 'pc',
  version: 'fake version'
}

export const envStore = new EnvStore()
