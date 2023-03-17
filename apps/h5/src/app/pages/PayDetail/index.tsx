import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { ReactComponent as Completed } from '../../../assets/payImg/completed.svg'
import { ReactComponent as Expired } from '../../../assets/payImg/expired.svg'
import { ReactComponent as Processing } from '../../../assets/payImg/processing.svg'
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
  useEffect(() => {
    document.title = '支付订单'
    getCode()
  }, [window.location.href])
  const statusText = {
    processing: '处理中',
    expired: '已失效',
    completed: '处理中'
  }
  const getCode = () => {
    const local = window.location.href
    const code = getParam('code')
    if (code) {
      getPayParams(code)
    } else {
      // 跳转至授权地址，该地址只支持微信浏览器打开
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=' +
        encodeURIComponent(local) +
        '&response_type=code&scope=SCOPE#wechat_redirect'
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
    console.log(code)
  }

  const onBridgeReady = () => {
    // let params = {
    //   // ... 支付相关参数，商品名称价格等等
    // }
    // 调用获取支付签名接口
    // getPaySign(params).then(({data})=>{
    //   let {appid:appId,timeStamp,nonce_str:nonceStr,packageStr,signType,sign:paySign} = data;

    // })
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: 'wx2421b1c4370ec43b', //公众号ID，由商户传入
        timeStamp: '1395712654', //时间戳，自1970年以来的秒数
        nonceStr: 'e61463f8efa94090b1f366cccfbbb444', //随机串
        package: 'prepay_id=u802345jgfjsdfgsdg888',
        signType: 'MD5', //微信签名方式：
        paySign: '70EA570631E4BB79628FBCA90534C63FF7FADD89' //微信签名
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

  const handlePay = () => {
    if (typeof WeixinJSBridge == 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      }
    } else {
      onBridgeReady()
    }
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
        <div className={styles.btn}>重新支付</div>
      </div>
    </div>
  )
}

export default PayDetail
