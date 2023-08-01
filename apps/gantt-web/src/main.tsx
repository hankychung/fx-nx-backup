/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-03-10 14:42:07
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-19 18:35:04
 * @FilePath: /fx-nx/apps/web/src/main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './app/app'
import { envStore } from '@flyele-nx/service'

envStore.initEnv(process.env.NODE_ENV as string)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
