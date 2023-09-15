import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import styles from './paypal.module.scss'

/* eslint-disable-next-line */
export interface PaypalProps {}

const host = 'http://localhost:8888'

export function Paypal(props: PaypalProps) {
  async function createOrder() {
    try {
      const response = await fetch(`${host}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify({
          cart: [
            {
              id: 'YOUR_PRODUCT_ID',
              quantity: 'YOUR_PRODUCT_QUANTITY'
            }
          ]
        })
      })

      const orderData = await response.json()

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
      alert(`Could not initiate PayPal Checkout...<br><br>${error}`)
    }
  }

  async function onApprove(data: any, actions: any) {
    try {
      const response = await fetch(
        `${host}/api/orders/${data.orderID}/capture`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const orderData = await response.json()
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
        alert(
          `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
        )
        console.log(
          'Capture result',
          orderData,
          JSON.stringify(orderData, null, 2)
        )
      }
    } catch (error) {
      console.error(error)
      alert(`Sorry, your transaction could not be processed...<br><br>${error}`)
    }
  }

  return (
    <PayPalScriptProvider options={{ clientId: 'test' }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{ layout: 'horizontal' }}
      />
    </PayPalScriptProvider>
  )
}

export default Paypal
