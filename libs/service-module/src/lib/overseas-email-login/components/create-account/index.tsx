import React, { useState } from 'react'
import { Form, Input } from 'antd'
import {
  CreateNameIcon,
  CreateEmailIcon,
  CreatePasswordIcon
} from '@flyele-nx/icon'
import style from './index.module.scss'
import { IOverseasCreateAccount } from '@flyele-nx/types'
import { globalNxController } from '@flyele-nx/global-processor'
import { UsercApi } from '@flyele-nx/service'
import { useMemoizedFn } from 'ahooks'
interface Props {
  onSuccess?: (data: IOverseasCreateAccount) => void
  goToLogin: () => void
  goToVerificationCode: () => void
}

type ChangeValue = {
  [P in 'name' | 'email' | 'password']: string
}

const emailReg = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// const codeReg = /^\d{6}$/

const CreateAccount: React.FC<React.PropsWithChildren<Props>> = ({
  goToLogin,
  goToVerificationCode,
  onSuccess
}) => {
  const [form] = Form.useForm()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const getCode = useMemoizedFn(() => {
    UsercApi.OverseasGetCode({
      youjianleixing: 1,
      youxiang: email
    })
      .then((res) => {
        globalNxController.showMsg({
          msgType: '成功',
          content: 'Verification code sent'
        })
        goToVerificationCode()
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
        onSuccess &&
          onSuccess({
            mima: password,
            yonghuming: name,
            youxiang: email
          })
        getCode()
      })
      .catch((err) => {
        const str = err.errorFields[0].errors[0]

        globalNxController.showMsg({
          msgType: '错误',
          content: str
        })
      })
  }
  const onChange = (changedValues: ChangeValue) => {
    const entries = Object.entries(changedValues)

    entries.forEach((item) => {
      switch (item[0]) {
        case 'name':
          setName(item[1])
          break
        case 'email':
          setEmail(item[1])
          break
        case 'password':
          setPassword(item[1])
          break
        default:
          console.log('未匹配')
      }
    })
  }

  return (
    <div className={style.phone_number_login}>
      <header className={style.login_header}>
        <h1>Create account</h1>
      </header>
      <div className={style.form_wrap}>
        <Form
          form={form}
          name="login"
          onValuesChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        >
          <Form.Item
            name="name"
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                pattern: /^.{0,16}$/,
                message: 'Please enter your name'
              }
            ]}
          >
            <Input
              type="text"
              allowClear
              className={style.form_wrap__custom_input}
              placeholder="Name"
              prefix={<CreateNameIcon />}
            />
          </Form.Item>
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
              prefix={<CreateEmailIcon />}
            />
          </Form.Item>
          {/* <Form.Item */}
          {/*  wrapperCol={{ span: 24 }} */}
          {/*  name="code" */}
          {/*  rules={[{ len: 6, message: '验证码长度为6个数字' }]} */}
          {/* > */}

          <Form.Item
            wrapperCol={{ span: 24 }}
            name="password"
            rules={[
              {
                required: true,
                pattern: /^.{8,16}$/,
                message: 'Please check that the password is 8-16 characters'
              }
            ]}
          >
            <Input
              type="password"
              className={style.form_wrap__custom_input}
              placeholder="Password"
              prefix={<CreatePasswordIcon />}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <button onClick={onSubmit} type="button">
              Register now
            </button>
          </Form.Item>
          <div className={style.login_in} onClick={goToLogin}>
            Log in
          </div>
        </Form>
      </div>
    </div>
  )
}

export default React.memo(CreateAccount)
