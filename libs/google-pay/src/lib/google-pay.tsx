import GooglePayButton from '@google-pay/button-react'

export interface GooglePayProps {
  price: string
}

export function GooglePay(props: GooglePayProps) {
  return (
    <GooglePayButton
      environment="TEST"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId'
              }
            }
          }
        ],
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Demo Merchant'
        },
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: props.price,
          currencyCode: 'USD',
          countryCode: 'US'
          // displayItems: [
          //   {
          //     label: 'Subtotal',
          //     type: 'SUBTOTAL',
          //     price: '11.00'
          //   },
          //   {
          //     label: 'Tax',
          //     type: 'TAX',
          //     price: '1.00'
          //   },
          //   {
          //     label: 'Shipping',
          //     type: 'LINE_ITEM',
          //     price: '0',
          //     status: 'PENDING'
          //   }
          // ]
        },
        callbackIntents: ['PAYMENT_AUTHORIZATION']
      }}
      onLoadPaymentData={(paymentRequest) => {
        console.log('Success', paymentRequest)
      }}
      onPaymentAuthorized={() => {
        console.log('Payment authorized')

        return {
          transactionState: 'SUCCESS'
        }
      }}
    />
  )
}
