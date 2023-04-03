import React, { useEffect, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import styles from './index.module.scss'
import { ReactComponent as Completed } from '../../../assets/payImg/completed.svg'
import { ReactComponent as Expired } from '../../../assets/payImg/expired.svg'
import { ReactComponent as Processing } from '../../../assets/payImg/processing.svg'
import { paymentApi } from '@flyele-nx/service'
import { regFenToYuan } from './utils'
import { ICreateOrderParams } from '@flyele-nx/api'
import { message } from 'antd'
import { service } from '@flyele-nx/service'
declare let WeixinJSBridge: any
export interface Res {
  // 微信需要传入的数据，数据格式定义
  appId?: string
  timeStamp?: string
  nonceStr?: string
  package?: string
  signType?: string
  sign?: string
}

const PayDetail = () => {
  const [payParams, setPayParam] = useState()
  const [state, setStatus] = useState(12000)
  const [orderDetail, setOrderDetail] = useState<ICreateOrderParams>()
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
  const [orderInfo, setOrderInfo] = useState<{
    description: string
    out_trade_no: string
  }>()

  const statusText = {
    processing: '处理中',
    expired: '已失效',
    completed: '您已完成支付，订单已完成'
  }
  const getCode = useMemoizedFn(() => {
    const local = window.location.href
    const code = getParam('code')
    const params = getParam('params')
    if (params) {
      setOrderDetail(JSON.parse(params))
    }
    if (code) {
      const token = getParam('token')
      if (token) {
        service.updateToken(token)
        createOrder(code)
      } else {
        message.info({ content: '无token' })
      }
    } else {
      // 跳转至授权地址，该地址只支持微信浏览器打开
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2edc8ed2729bdddf&redirect_uri=' +
        encodeURIComponent(local) +
        '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
    }
  })

  useEffect(() => {
    document.title = '支付订单'
    getCode()
  }, [getCode])

  const createOrder = (code: string) => {
    const params = getParam('params')

    if (params) {
      paymentApi.createOrder(JSON.parse(params)).then((res) => {
        if (res.code === 0) {
          getPayParams(code, res.data)
          setOrderInfo(res.data)
        }
      })
    }
  }
  const getParam = (paramName: string) => {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] === paramName) {
        return pair[1]
      }
    }
    return false
  }
  //获取支付参数
  const getPayParams = (
    code: string,
    info: {
      description: string
      out_trade_no: string
    }
  ) => {
    paymentApi
      .prePay({
        code,
        name: info.description,
        order_method: 3,
        out_trade_no: info.out_trade_no
      })
      .then((res) => {
        if (res.code === 0) {
          handlePay(res.data)
          setPayParam(res.data)
        }
      })
  }

  const onBridgeReady = (params: any) => {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: params.app_id, //公众号ID，由商户传入
        timeStamp: params.timestamp, //时间戳，自1970年以来的秒数
        nonceStr: params.nonce_str, //随机串
        package: params.package, //prepayId
        signType: params.sign_type, //微信签名方式：
        paySign: params.pay_sign //微信签名
      },
      function (res: any) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。

          const interval = setInterval(() => {
            getOrderDetail()
            if (state === 12001) {
              clearInterval(intervalId)
            }
          }, 1000)
          setIntervalId(interval)
        }
        if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          getOrderDetail()
          // 支付取消
        }

        if (res.err_msg === 'get_brand_wcpay_request:fail') {
          // 支付失败
          getOrderDetail()
        }
      }
    )
  }

  const handlePay = (params: any) => {
    onBridgeReady(params)
  }
  const getOrderDetail = (isPAY = false) => {
    paymentApi
      .getOrderDetail({
        out_trade_no: orderInfo?.out_trade_no || ''
      })
      .then((res) => {
        if (res.code === 0) {
          if (res.data === 12000 && isPAY) {
            message.info({
              content: '订单未支付'
            })
          }
          setStatus(res.data)
        }
      })
  }
  const getOrderState = useMemoizedFn(() => {
    setTimeout(() => {
      getOrderDetail()
    }, 60000 * 30)
  })
  useEffect(() => {
    if (orderInfo) {
      getOrderState()
    }
  }, [orderInfo, getOrderState])
  const status = (key?: number) => {
    let str = statusText['processing']
    switch (key) {
      case 12000:
        str = statusText['processing']
        break
      case 12001:
        str = statusText['completed']
        break
      case 12004:
        str = statusText['expired']
        break
      default:
        break
    }
    return str
  }
  return (
    <div className={styles.payDetail}>
      <div className={styles.order_status}>
        {state === 12001 && <Completed></Completed>}
        {state === 12004 && <Expired></Expired>}
        {state === 12000 && <Processing></Processing>}
        <div className={styles.text}>{status(state)}</div>
        <div className={styles.order_info}>
          <span>订单信息</span>
          <span>{`飞项-${orderInfo?.description}`}</span>
        </div>
        <div className={styles.order_price}>
          <span>订单金额</span>
          <span>{`¥${regFenToYuan(orderDetail?.total_price || 0)}`}</span>
        </div>
      </div>
      {state === 12000 && (
        <div className={styles.tips}>
          <div>1. 如您已支付成功，请点击【已完成支付】</div>
          <div>2. 如未打开微信app或未支付成功，请点击【重新支付】</div>
        </div>
      )}
      {state === 12001 && (
        <div className={styles.btns}>
          <div
            className={styles.btn}
            onClick={() => {
              getOrderDetail(true)
            }}
          >
            已完成支付
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              handlePay(payParams)
            }}
          >
            重新支付
          </div>
        </div>
      )}
    </div>
  )
}

export default PayDetail
