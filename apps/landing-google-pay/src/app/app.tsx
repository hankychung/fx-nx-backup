import { Paypal } from '@flyele-nx/paypal'
import { QuickPay } from '@flyele-nx/service-module'
const fn = () => {
  //
}

export function App() {
  return (
    <QuickPay
      onClose={fn}
      mineId="22"
      memberList={[]}
      isPaySuccess={false}
      domain="asd"
      goProtocol={fn}
      goInterests={fn}
    />
  )
}

export default App
