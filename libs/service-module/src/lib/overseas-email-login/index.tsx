import React, { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { EmailLogin } from './components/email-login'
import CreateAccount from './components/create-account'
import VerificationCode from './components/verification-code'
import style from './index.module.scss'
import { IUserInfo, IOverseasCreateAccount, IDevice } from '@flyele-nx/types'

interface Props {
  deviceParams?: Omit<IDevice, 'device_id'>
  onLoginSuccess?: (data: IUserInfo) => void
}

const _OverseasEmailLogin: React.FC<React.PropsWithChildren<Props>> = ({
  deviceParams = {
    client_version: '0.0.1',
    os: 'html5',
    platform: 'web',
    device_name: 'browser'
  },
  onLoginSuccess
}) => {
  const [toCreate, setToCreate] = useState(false)
  const [verificationCode, setVerificationCode] = useState(false)
  const [userInfo, setUserInfo] = useState<IOverseasCreateAccount>()

  const createCount = useMemoizedFn(() => {
    setToCreate(true)
  })

  const goToLogin = useMemoizedFn(() => {
    setToCreate(false)
    setVerificationCode(false)
  })

  const goToVerificationCode = useMemoizedFn(() => {
    setVerificationCode(true)
    setToCreate(false)
  })

  return (
    <div className={style.right_wrap}>
      <div className={style.right_wrap__container}>
        {!toCreate && !verificationCode && (
          <EmailLogin
            deviceParams={deviceParams}
            onSuccess={onLoginSuccess}
            setToCreate={createCount}
          />
        )}
        {toCreate && (
          <CreateAccount
            onSuccess={(data) => {
              setUserInfo(data)
            }}
            goToLogin={goToLogin}
            goToVerificationCode={goToVerificationCode}
          />
        )}
        {verificationCode && (
          <VerificationCode
            deviceParams={deviceParams}
            goToLogin={goToLogin}
            userInfo={userInfo}
            onSuccess={onLoginSuccess}
          />
        )}
      </div>
    </div>
  )
}

export const OverseasEmailLogin = React.memo(_OverseasEmailLogin)
