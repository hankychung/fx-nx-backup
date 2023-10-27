import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import { useMemoizedFn } from 'ahooks'
import { UsercApi } from '@flyele-nx/service'
import style from './index.module.scss'
import { IUserInfo } from '@flyele-nx/types'
import { globalNxController } from '@flyele-nx/global-processor'

interface Props {
  onSuccess?: (data: IUserInfo) => void
  goToLogin: () => void
}

type ChangeValue = {
  [P in 'email']: string
}

const emailReg = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const ForgetPassword: React.FC<React.PropsWithChildren<Props>> = ({
  goToLogin
}) => {
  const [form] = Form.useForm()
  const [email, setEmail] = useState('')
  const [linkSuccess, setLinkSuccess] = useState(false)

  useEffect(() => {
    return () => {
      setEmail('')
    }
  }, [])

  const getCode = useMemoizedFn(async () => {
    UsercApi.OverseasGetCode({
      youjianleixing: 2,
      youxiang: email
    })
      .then((res) => {
        setLinkSuccess(true)
        console.log(res, 'reset-password')
      })
      .catch((err) => {
        // const str = err.errorFields[0].errors[0]
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          globalNxController.showMsg({
            msgType: '错误',
            content: err.response.data.message
          })
        }
      })
  })

  const onSubmit = () => {
    form
      .validateFields()
      .then(async () => {
        await getCode()
        // login()
      })
      .catch((err) => {
        const str = err.errorFields[0].errors[0]

        globalNxController.showMsg({
          msgType: '错误',
          content: str
        })
        console.log('校验不通过', err)
      })
  }
  const onChange = (changedValues: ChangeValue) => {
    const entries = Object.entries(changedValues)

    entries.forEach((item) => {
      switch (item[0]) {
        case 'email':
          setEmail(item[1])
          break
        default:
          console.log('未匹配')
      }
    })
  }

  const handleKeyDown = useMemoizedFn((event) => {
    console.log(event)

    if (event.key === 'Escape') {
      goToLogin()
    }
  })

  useEffect(() => {
    if (linkSuccess) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, linkSuccess])

  return (
    <div className={style.phone_number_login}>
      <header className={style.login_header}>Forgot your password？</header>
      {!linkSuccess && (
        <div className={style.form_wrap}>
          <Form
            form={form}
            name="forget"
            onValuesChange={onChange}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  pattern: emailReg,
                  message: 'Please enter the valid email'
                }
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Input
                type="email"
                allowClear
                className={style.form_wrap__custom_input}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <button
                onClick={onSubmit}
                type="button"
                style={{
                  borderRadius: '8px',
                  marginBottom: '24px',
                  marginTop: '20px'
                }}
              >
                Send me the link
              </button>
            </Form.Item>
          </Form>
        </div>
      )}
      {linkSuccess && (
        <div className={style.link_success}>
          <div className={style.logo_block}>
            <img
              className={style.logo}
              alt="logo"
              src="https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/logo.png"
            />
          </div>
          <div className={style.login_block}>
            <span> Now, check your email</span>
            <p>
              <span>or </span>
              <span
                onClick={() => {
                  goToLogin()
                  setLinkSuccess(false)
                }}
              >
                sign in
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(ForgetPassword)
