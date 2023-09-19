import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { paymentApi } from '@flyele-nx/service'
import { CSSProperties } from 'react'

export interface PaypalProps {
  // 点击按钮
  onClick?: () => void
  // 按钮宽度
  width?: number
  // 按钮高度
  height?: number
  // 支付成功回调
  success?: () => void
  // 支付失败回调
  fail?: () => void
  // 订单id
  productId: string
  containerStyle?: CSSProperties
}

export function Paypal({
  onClick,
  width = 310,
  height = 50,
  productId,
  success,
  fail,
  containerStyle = {}
}: PaypalProps) {
  async function createOrder() {
    onClick?.()
    try {
      const orderData = (await paymentApi.createPaypalOrder(productId)).data

      console.log('check orderData', orderData)

      if (orderData.id) {
        return orderData.id
      } else {
        const errorDetail = orderData?.details?.[0]
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData)

        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error(error)
      alert(`Could not initiate PayPal Checkout... ${error}`)
      fail?.()
    }
  }

  async function onApprove(data: any, actions: any) {
    try {
      console.log('approve data', data)

      const orderData = (await paymentApi.getPaypalOrderDetail(data.orderID))
        .data as any

      console.log('approve response', orderData)

      // const orderData = await response.json()
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0]

      if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart()
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`)
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData))
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0]
        // alert(
        //   `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
        // )
        console.log(
          'Capture result',
          orderData,
          JSON.stringify(orderData, null, 2),
          transaction
        )

        success?.()
      }
    } catch (error) {
      console.error(error)
      alert(`Sorry, your transaction could not be processed... ${error}`)
      fail?.()
    }
  }

  return (
    <div style={{ ...containerStyle, width: `${width}px` }}>
      {!!productId && (
        <PayPalScriptProvider options={{ clientId: 'test' }}>
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            style={{ layout: 'horizontal', tagline: false, height }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  )
}

export default Paypal
