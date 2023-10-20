import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { debounce } from 'lodash'
import style from './index.module.scss'
import ForgetPassword from '../forget-password'
import { IDevice, IUserInfo } from '@flyele-nx/types'
import { service, UsercApi } from '@flyele-nx/service'
import { globalNxController } from '@flyele-nx/global-processor'
import util from '../../../qrcode-login/utils'

interface Props {
  setToCreate: () => void
  deviceParams: Omit<IDevice, 'device_id'>
  onSuccess?: (data: IUserInfo) => void
}

type ChangeValue = {
  [P in 'phoneNum' | 'code']: string
}

const emailReg = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const _EmailLogin: React.FC<React.PropsWithChildren<Props>> = ({
  deviceParams,
  onSuccess,
  setToCreate
}) => {
  const [form] = Form.useForm()
  const [phoneNum, setPhoneNum] = useState('')
  const [code, setCode] = useState('')
  const [showForget, setShowForget] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      setPhoneNum('')
      setCode('')
    }
  }, [])
  const login = async () => {
    const params = await util.getEmailLoginParams(deviceParams, phoneNum, code)

    setLoading(true)
    UsercApi.OverseasLogin(params)
      .then(async (res) => {
        service.updateToken(res.data.Token)

        await UsercApi.updateUid()

        onSuccess && onSuccess(res.data)
        setLoading(false)
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
      })
  }
  const onSubmit = () => {
    form
      .validateFields()
      .then(async () => {
        login()
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
          setPhoneNum(item[1])
          break
        case 'password':
          setCode(item[1])
          break
        default:
          console.log('未匹配')
      }
    })
  }
  const onClose = () => {
    setShowForget(false)
  }

  return (
    <div className={style.phone_number_login}>
      <header className={style.login_header}>
        <h1>Flyele</h1>
      </header>
      <div className={style.form_wrap}>
        <Form
          form={form}
          name="login"
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
              // suffix={<div>{render()}</div>}
            />
          </Form.Item>
          <div
            className={style.forget_password}
            onClick={() => {
              setShowForget(true)
            }}
          >
            Forgot password
          </div>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              onClick={debounce(onSubmit, 5000, {
                leading: true,
                trailing: false
              })}
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
          <div className={style.create_account} onClick={setToCreate}>
            Create account
          </div>
        </Form>
      </div>

      <Modal
        open={showForget}
        title={false}
        footer={null}
        width={420}
        onCancel={onClose}
        wrapClassName={style.modalRoot}
        zIndex={1003}
        destroyOnClose
        maskClosable={false}
        style={{
          top: '219px'
        }}
      >
        <ForgetPassword goToLogin={onClose} />
      </Modal>
    </div>
  )
}

export const EmailLogin = React.memo(_EmailLogin)
