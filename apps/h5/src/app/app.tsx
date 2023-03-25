/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-15 15:10:59
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-03-25 12:10:11
 * @FilePath: /fx-nx/apps/h5/src/app/app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss'

import PayDetail from './pages/pay-detail'
import PayError from './pages/pay-error'
import { Route, Routes } from 'react-router-dom'

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Loading</div>} />
        <Route path="/payDetail" element={<PayDetail />} />
        <Route path="/payError" element={<PayError />} />
      </Routes>
      {/* END: routes */}
    </>
  )
}

export default App
