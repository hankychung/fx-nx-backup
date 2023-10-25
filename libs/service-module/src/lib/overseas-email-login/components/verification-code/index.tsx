import React, { useEffect, useRef, useState } from 'react'
import { EmailIcon } from '@flyele-nx/icon'
import { Button, Form } from 'antd'
import { useMemoizedFn } from 'ahooks'
import { debounce } from 'lodash'
import style from './index.module.scss'
import { IDevice, IOverseasCreateAccount, IUserInfo } from '@flyele-nx/types'
import { globalNxController } from '@flyele-nx/global-processor'
import { service, UsercApi } from '@flyele-nx/service'
import util from '../../../qrcode-login/utils'
import { useTimer } from './useTimer'

interface Props {
  deviceParams: Omit<IDevice, 'device_id'>
  onSuccess?: (data: IUserInfo) => void
  goToLogin: () => void
  userInfo?: IOverseasCreateAccount
}

const VerificationCode: React.FC<React.PropsWithChildren<Props>> = ({
  deviceParams,
  goToLogin,
  userInfo,
  onSuccess
}) => {
  const [form] = Form.useForm()
  const [codes, setCodes] = useState(['', '', '', ''])
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [loading, setLoading] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const { timer, exeTimer } = useTimer()
  useEffect(() => {
    if (timer === 0) {
      setShowTime(false)
    }
  }, [timer])
  useEffect(() => {
    if (inputRefs) {
      inputRefs.current[0].focus()
    }
  }, [inputRefs])
  const getCode = useMemoizedFn(() => {
    if (!userInfo) return
    UsercApi.OverseasGetCode({
      youjianleixing: 1,
      youxiang: userInfo.youxiang
    }).then((res) => {
      if (res) {
        exeTimer()
        setShowTime(true)
        globalNxController.showMsg({
          msgType: '成功',
          content: 'Verification code sent'
        })
      }
    })
  })
  const initCode = useMemoizedFn(() => {
    if (!userInfo) return
    exeTimer()
    setShowTime(true)
  })
  useEffect(() => {
    initCode()
  }, [initCode])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target

    if (
      (value.length >= 1 || value.length === 0) &&
      index <= inputRefs.current.length - 1
    ) {
      if (value.length >= 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus()
      }
      if (value.length >= 1 && index === inputRefs.current.length - 1) {
        inputRefs.current[index].focus()
      }
      const newCodes = [...codes]

      // eslint-disable-next-line prefer-destructuring
      newCodes[index] = value.replace(/[^0-9]/g, '').split('')[0] ?? ''
      setCodes(newCodes)
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && index > 0 && codes[index] === '') {
      inputRefs.current[index - 1].focus()
    }
  }
  const create = async () => {
    if (!userInfo) return
    const params = {
      ...userInfo,
      yanzhengma: codes.join(''),
      register_platform: '官网',
    }

    setLoading(true)
    UsercApi.OverseasCreateAccount(params)
      .then(async (res) => {
        if (res) {
          login()
        }
      })
      .catch((err) => {
        try {
          setLoading(false)
          globalNxController.showMsg({
            msgType: '错误',
            content: err.response.data.message
          })
        } catch (e) {
          // empty
        }
        console.log(err)
      })
  }

  const login = async () => {
    if (!userInfo) return
    const params = await util.getEmailLoginParams(
      deviceParams,
      userInfo.youxiang,
      userInfo.mima
    )

    UsercApi.OverseasLogin(params)
      .then(async (res) => {
        service.updateToken(res.data.Token)

        await UsercApi.updateUid()

        onSuccess && onSuccess(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        if (err.response.data.code === 40010) {
          globalNxController.showMsg({
            msgType: '错误',
            content: err.response.data.message
          })
        }
        console.log(err)
      })
  }
  const onSubmit = () => {
    if (codes.includes('')) {
      globalNxController.showMsg({
        msgType: '错误',
        content: 'The verification code is incorrect'
      })
      return
    }
    form
      .validateFields()
      .then(async () => {
        create()
      })
      .catch((err) => {
        console.log('校验不通过', err)
      })
  }

  const resend = () => {
    if (showTime) {
      globalNxController.showMsg({
        msgType: '错误',
        content: 'Please try later'
      })
      return
    }
    getCode()
  }

  return (
    <div className={style.phone_number_login}>
      <div className={style.email_icon}>
        <EmailIcon />
      </div>
      <header className={style.login_header}>
        <h1>We just emailed you</h1>
      </header>
      <div className={style.desc}>Please enter the code we emailed you.</div>
      <div className={style.desc_bottom}>Confirmation code</div>

      <div className={style.form_wrap}>
        <Form
          form={form}
          name="login"
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        >
          <div className={style.input_block}>
            <div className={style.input_code}>
              {codes.map((code, index) => (
                <input
                  key={index}
                  ref={(ref) => {
                    if (ref) {
                      inputRefs.current[index] = ref
                    }
                  }}
                  className={style.input}
                  value={code}
                  type="number"
                  maxLength={1}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  style={{ width: '40px', marginRight: '8px' }}
                />
              ))}
            </div>
          </div>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              onClick={debounce(onSubmit, 5000, {
                leading: true,
                trailing: false
              })}
              loading={loading}
            >
              Verify
            </Button>
          </Form.Item>
          <div className={style.login_in}>
            <span onClick={resend}>Resend code</span>
            {showTime && <span>{` （${timer}S）`}</span>}
          </div>
          <div className={style.go_login_in}>
            <span>Do you have an account ?</span>
            <span onClick={goToLogin}> Log in</span>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default React.memo(VerificationCode)
