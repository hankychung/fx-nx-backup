import React, { useCallback, useEffect, useRef, useState } from 'react'
import { service, UsercApi, SSe, IDevice, envStore } from '@flyele-nx/service'
import Qc from 'qrcode'
import { uid } from '@flyele-nx/utils'
import { message } from 'antd'
import scanImg from '../../assets/login/scan-qrcode-ses.png'
import { getUserInfo } from './utils/user'
import RefreshIcon from '../../assets/login/refresh.png'
import { debounce } from 'lodash'
import loginRefreshIcon from '../../assets/login/loginRefresh.svg'
import loadingGif from '../../assets/login/loading3.gif'
import cs from 'classnames'
import { useMemoizedFn, useMount, useUnmount } from 'ahooks'
import util from './utils'
import style from './index.module.scss'

interface Props {
  deviceParams: Omit<IDevice, 'device_id'>
  onSuccess?(): void
}
let watchTimeoutId: NodeJS.Timeout
let refreshTimeOutId: NodeJS.Timeout
/** 二维码 3 分钟时间 */
const timeOut = 3 * 60 * 1000
/** 最多自动刷新 5 次 */
const MAX_COUNTER = 5

const QrCodeLogin: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { deviceParams, onSuccess } = props
  const [messageApi, contextHolder] = message.useMessage()

  const [loginKey, setLoginKey] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [isWatchTimeOut, setWatchTimeOut] = useState(false) // 扫码后超时未登录
  const [exception, setException] = useState(false) // 网络不通或者接口异常
  const [scanCode, setScanCode] = useState(false)
  const [countDown, setCountDown] = useState<number>(timeOut) // 倒计时记录
  const [countDownText, setCountDownText] = useState<string>('') // 倒计时文案
  const lockScanned = useRef(false)
  /** 自动刷新的计数器 */
  const autoRefreshCounter = useRef(1)

  const sseRef = useRef<InstanceType<typeof SSe>>()

  const onSuccessRef = useRef(onSuccess)

  onSuccessRef.current = onSuccess

  const getLoginKey = useMemoizedFn(async () => {
    const params = await util.getLoginKeyParams(loginKey, deviceParams)

    const res = await UsercApi.getLoginKey(params)

    return res.data
  })

  const getQrCode = useCallback(async (loginKey: any) => {
    console.log('key', `scene=${encodeURIComponent(`login_key=${loginKey}`)}`)

    // TODO 应用下载渠道名
    const channel = '官网'

    const params = `login_key=${loginKey}&channel=${channel}&device_id=${uid}`

    const envHost = envStore.getHost()
    let url = `${envHost}/md/index.html?${params}`

    if (envHost.indexOf('net') !== -1) {
      url = `https://h5.flyele.net/index.html?${params}`
    }

    console.log('url', url)
    return Qc.toDataURL(url)
  }, [])

  const generateQrCode = useMemoizedFn(async () => {
    const loginKey = await getLoginKey()
    const qrCode = await getQrCode(loginKey)

    setScanCode(false)

    if (sseRef.current) {
      sseRef.current?.source.close()
    }
    refreshTimeOutId && clearInterval(refreshTimeOutId)
    setCountDown(timeOut)
    lockScanned.current = false

    setLoginKey(loginKey)
    setQrCode(qrCode)

    refreshTimeOutId = setInterval(() => {
      setCountDown((item) => item - 1000)
    }, 1000)
  })

  const refreshQrCode = useMemoizedFn((isResetCounter = true) => {
    if (isResetCounter) {
      autoRefreshCounter.current = 1
    }
    setException(false)
    generateQrCode()
      .then(() => {
        setWatchTimeOut(false)
      })
      .catch(() => {
        setException(true)
      })
  })

  /**
   * 连接sse
   */
  const connectSse = useMemoizedFn((loginKey: string) => {
    const sse = new SSe('stream', { identity: loginKey }, true)

    sseRef.current = sse

    sse.addEventListener(
      'pc_scan_login',
      async (event: { [p: string]: any }) => {
        console.log('see data', event)

        try {
          if (event.data) {
            const { data } = event

            if (data.scanned) {
              if (lockScanned.current) return
              setScanCode(true)
              lockScanned.current = true
              refreshTimeOutId && clearInterval(refreshTimeOutId)
              // 已扫码， 3分钟二维码失效
              watchTimeoutId = setTimeout(() => {
                setWatchTimeOut(true)
                setScanCode(false)
                sse.close()
              }, timeOut)
            }

            if (data.canceled) {
              // 取消
              setScanCode(false)
              sse.close()
              refreshQrCode()
            }

            if (data.code === 0) {
              console.log('sse login success')

              service.updateToken(data.token)

              getUserInfo({
                onSuccess() {
                  onSuccessRef.current && onSuccessRef.current()
                },
                onError() {
                  messageApi.open({
                    type: 'error',
                    content: '登录失败，请重试'
                  })
                  setException(true)
                }
              })

              // 添加uid
              await UsercApi.updateUid()

              sse.close()
            }
          }
        } catch (e) {
          console.log('sse data parse err', e)
        }
      }
    )
  })

  useEffect(() => {
    let text = ''
    const totalSec = countDown / 1000

    if (totalSec > 59) {
      const min = parseInt(String(totalSec / 60), 10)
      const sec = totalSec - min * 60

      text = `${min > 9 ? min : `0${min}`}:${sec > 9 ? `${sec}` : `0${sec}`}`
    } else {
      text = `00:${totalSec > 9 ? totalSec : `0${totalSec}`}`
    }

    if (countDown === 0) {
      if (autoRefreshCounter.current >= MAX_COUNTER) {
        clearInterval(refreshTimeOutId)
        setWatchTimeOut(true)
        return
      }

      autoRefreshCounter.current += 1

      refreshQrCode(false)

      if (sseRef.current) {
        sseRef.current?.source.close()
      }
    }

    if (countDown < 0) return

    setCountDownText(text)
  }, [countDown, refreshQrCode])

  useEffect(() => {
    if (loginKey) {
      connectSse(loginKey)
    } else {
      watchTimeoutId && clearTimeout(watchTimeoutId)
      refreshTimeOutId && clearInterval(refreshTimeOutId)
      sseRef.current?.close()
    }
  }, [connectSse, loginKey])

  useMount(() => {
    // 首次进入初始
    setTimeout(() => {
      autoRefreshCounter.current = 1
      generateQrCode().catch(() => setException(true))
    }, 50)
  })

  useUnmount(() => {
    sseRef.current?.close()
    watchTimeoutId && clearTimeout(watchTimeoutId)
    refreshTimeOutId && clearInterval(refreshTimeOutId)
  })

  return (
    <div className={style.wrap}>
      {!scanCode ? (
        <>
          <div className={style.qrcode_wrap}>
            {(isWatchTimeOut || exception) && (
              <div
                className={cs(
                  style.qrcode__mark,
                  isWatchTimeOut && !exception && style.qrcode_mark_refresh
                )}
                onClick={() => isWatchTimeOut && !exception && refreshQrCode()}
              >
                {exception ? (
                  '二维码获取失败'
                ) : (
                  <div className={style.qrcode_invalid}>
                    <img
                      className={style.qrcode_invalid_img}
                      src={loginRefreshIcon}
                      alt="loginRefresh"
                    />
                    <div>二维码已失效</div>
                    <div>请刷新</div>
                  </div>
                )}
              </div>
            )}
            {!exception && <img alt="二维码" src={qrCode || loadingGif} />}
            {isWatchTimeOut && !exception && (
              <div className={style.tips}>请使用微信或飞项app扫码登录</div>
            )}
          </div>
          {!isWatchTimeOut && !exception ? (
            <>
              <div className={style.tips}>请使用微信或飞项app扫码登录</div>
              <div
                className={style.refreshQrCode}
                onClick={debounce(() => refreshQrCode(), 800)}
              >
                {`${countDownText}后自动刷新`}
                <img className={style.icon} src={RefreshIcon} alt="" />
              </div>
            </>
          ) : (
            exception && (
              <button
                onClick={() => refreshQrCode()}
                className={style.refresh_btn}
                type="button"
              >
                重试
              </button>
            )
          )}
        </>
      ) : (
        <div className={style.scan_qrcode_success}>
          <img alt="" src={scanImg} />
          <h1>扫码成功</h1>
          <span>请在手机上确认登录</span>
          <button onClick={() => refreshQrCode()} type="button">
            重新扫码
          </button>
        </div>
      )}
      {contextHolder}
    </div>
  )
}

export default React.memo(QrCodeLogin)
