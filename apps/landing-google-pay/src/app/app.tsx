import styles from './app.module.scss'
import JSEncrypt from 'jsencrypt'
import qs from 'query-string'
import { useEffect, useState } from 'react'

import { GooglePay } from '@flyele-nx/google-pay'

export const priKey = `MIICXQIBAAKBgQDsi0/G+qf46LmjC3WrlJBbayDPXkEzrNCKj6ueJeV3sVNR4NSd
PDCDbd/aDujsfJ/udUHWx0puN9QfACqafCKVSlRYW72mQ0TTcpc1W3ZhH92+QE7G
45a2VYdNY0zUFXgL+FO13F+T32w09ElAltjgg24ZJkgqSmkpg7Yvec2GjQIDAQAB
AoGBAMFscYHN+YiqFRJkDoaNZzW59gxbkImG6MhFDxq09lzXncA4TuN8EleGgyO2
SXUHu2esbngIYq6Z7FSlODE3DLbgfhSbp6QXWXW4Wy6sYqQAFbjWjpeqKhSdXN/3
241Sb8PiYtBqcqMPJWysF4C6+QOBGrBprimewASNxgrFbd4pAkEA/Y5TMkW/0B43
iGtGgrbdkNh+baOZ9LuuHh30C64exlMnmuxyco0VMuYSHVAjT1ZqM4nKIuDcASf7
AzoHgQGy6wJBAO7TAiTo715YJDt9useBoXMiNnL3/5OT454eo8Yubuy7hOth4W5M
TSgOHo1jHzKKLfV7MCR6EE4K/CmqLN21HmcCQDjRkfcsBiW+/7bEQ1K7Y783pG0x
QijDfeslzzBm3mKW88MVxTfCQcPcJqcG9EKtHLNb5z4VoXdo3CkG8fOIy+0CQQDe
B033ApeHHmqQ5FLBJ8LxRt1YBTeV++ehGNspZAG8FJl+O4FZCZaxpm7BA2X9lnkj
v2MChniiFZRZJ9yOQdQBAkALqrCHK/P9Tbuw3Y6egm0ElRvOBW8NqMBVWGfSMgtt
bFfE3EGAjeMjHZgGaGOH8cWpvny1m5zU+4RugCSBj+wj`

const testSearch = `Cr7XADdLc6Gdn9S%2Ftbd2zuXt4oleMp7sgFVQNon%2F3tjPizS9cPdAlQqOPRC0WPlAmJc4kQSmTAL1pSOvd3DkXzEFbipmT6imUSDiTODBpoz6dYw3CNCgC81%2BQ9rjbdbpAncDoi9N4w%2BF3QQOd9Vr3ysNd16QEBd5p66klbEMKAw%3D`

export function App() {
  const [error, setError] = useState('')

  const [price, setPrice] = useState('')

  useEffect(() => {
    try {
      const decrypt = new JSEncrypt()

      decrypt.setPrivateKey(priKey)

      const data = qs.parse(window.location.search).t

      if (!data || typeof data !== 'string') {
        setError('订单有误')
        return
      }

      const str = decrypt.decrypt(data)

      if (!str) {
        setError('订单有误')
        return
      }

      const obj = JSON.parse(str)

      if (!obj.price) {
        setError('订单有误')
        return
      }

      setPrice(obj.price)

      console.log('check data', decrypt.decrypt(data))
    } catch (e) {
      setError('订单有误')
      console.log('search parsing error')
    }
  }, [])

  return (
    <>
      <div>asd</div>
      {price && <GooglePay price={price} />}
    </>
  )
}

export default App
