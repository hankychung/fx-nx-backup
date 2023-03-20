import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { ReactComponent as Completed } from '../../../assets/payImg/completed.svg'
import { ReactComponent as Expired } from '../../../assets/payImg/expired.svg'
import { ReactComponent as Processing } from '../../../assets/payImg/processing.svg'
import { paymentApi } from '@flyele-nx/service'
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
  useEffect(() => {
    document.title = '支付订单'
    getCode()
  }, [])
  const statusText = {
    processing: '处理中',
    expired: '已失效',
    completed: '您已完成支付，订单已完成'
  }
  const getCode = () => {
    const local = 'https://feixiang.cn'
    const code = getParam('code')
    if (code) {
      getPayParams(code)
    } else {
      // 跳转至授权地址，该地址只支持微信浏览器打开
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2edc8ed2729bdddf&redirect_uri=' +
        encodeURIComponent(local) +
        '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
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
  const getPayParams = (code: string) => {
    paymentApi
      .prePay({
        code,
        name: '个人会员-月套餐',
        order_method: 3,
        out_trade_no: '2375276954125386'
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
        }
        if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          // 支付取消
        }

        if (res.err_msg === 'get_brand_wcpay_request:fail') {
          // 支付失败
        }
      }
    )
  }

  const handlePay = (params: any) => {
    onBridgeReady(params)
  }

  return (
    <div className={styles.payDetail}>
      <div className={styles.order_status}>
        {false && <Completed></Completed>}
        {false && <Expired></Expired>}
        <Processing></Processing>
        <div className={styles.text}>{statusText['completed']}</div>
        <div className={styles.order_info}>
          <span>订单信息</span>
          <span>飞项-个人会员1个月</span>
        </div>
        <div className={styles.order_price}>
          <span>订单金额</span>
          <span>¥18.00</span>
        </div>
      </div>
      <div className={styles.tips}>
        <div>1. 如您已支付成功，请点击【已完成支付】</div>
        <div>2. 如未打开微信app或未支付成功，请点击【重新支付】</div>
      </div>
      <div className={styles.btns}>
        <div className={styles.btn}>已完成支付</div>
        <div
          className={styles.btn}
          onClick={() => {
            handlePay(payParams)
          }}
        >
          重新支付
        </div>
      </div>
    </div>
  )
}

export default PayDetail
