import React, { MouseEvent, useState } from 'react'
import { Form, Input } from 'antd'
import { useMemoizedFn } from 'ahooks'
import style from './index.module.scss'
import { IDevice, IUserInfo, service, UsercApi } from '@flyele-nx/service'
import util from '../../../qrcode-login/utils'
import cs from 'classnames'

interface IProps {
  deviceParams: Omit<IDevice, 'device_id'>
  onSuccess?: (data?: IUserInfo) => void
}

type ChangeValue = {
  [P in 'phoneNum' | 'code']: string
}

enum CodeStatus {
  noPn, // 没有手机号或手机号错误
  hasPn, // 输入正确的手机号
  timer // 倒计时中
}

const _PhoneNumberLogin = ({ deviceParams, onSuccess }: IProps) => {
  const [form] = Form.useForm()
  const [phoneNum, setPhoneNum] = useState('')
  const [code, setCode] = useState('123456')
  const [codeStatus, setCodeStatus] = useState(CodeStatus.noPn)

  const login = useMemoizedFn(async () => {
    const device = (await util.getLoginKeyParams('', deviceParams)).device

    const params = {
      device: device,
      telephone: phoneNum,
      verify_code: code || ''
    }

    try {
      const res = await UsercApi.phoneLogin(params)

      service.updateToken(res.data.Token)

      UsercApi.updateUid()

      onSuccess && onSuccess(res.data)
    } catch (err) {
      console.log(err)
    }
  })

  const onSubmit = useMemoizedFn(() => {
    form
      .validateFields()
      .then(async () => {
        login()
      })
      .catch((err) => {
        console.log('校验不通过', err)
      })
  })

  const onChange = (changedValues: ChangeValue) => {
    const entries = Object.entries(changedValues)

    entries.forEach((item) => {
      switch (item[0]) {
        case 'phoneNum':
          setPhoneNum(item[1])
          break
        case 'code':
          setCode(item[1])
          break
        default:
          console.log('未匹配')
      }
    })
  }

  const getCode = () => {
    console.log('暂时不迁移了，用不上')
  }

  const goProtocol = (events: MouseEvent<HTMLAnchorElement>, type: string) => {
    console.log(type)
    events.preventDefault()
  }

  const render = () => {
    const getText = () => {
      if (codeStatus === CodeStatus.noPn || codeStatus === CodeStatus.hasPn)
        return '获取验证码'

      return `${120}s后重试`
    }
    const cla = cs(style.form_wrap__code_suffix, {
      [style.code_suffix__disabled]: codeStatus === CodeStatus.noPn,
      [style.code_suffix__active]: codeStatus === CodeStatus.hasPn,
      [style.code_suffix__timer]: codeStatus === CodeStatus.timer
    })

    return (
      <div className={cla} onClick={getCode}>
        {getText()}
      </div>
    )
  }

  return (
    <div className={style.phone_number_login}>
      <header className={style.login_header}>
        <h1>飞项</h1>
        <span>若未注册，登录后自动注册</span>
      </header>
      <div className={style.form_wrap}>
        <Form
          form={form}
          name="login"
          onValuesChange={onChange}
          initialValues={{ code: Number(code) }}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        >
          <Form.Item
            name="phoneNum"
            rules={[
              {
                required: true,
                // pattern: phoneReg,
                message: '输入正确的手机号'
              }
            ]}
            wrapperCol={{ span: 24 }}
          >
            <Input
              prefix={
                <div className={style.form_wrap__phone_num_prefix}>+86</div>
              }
              allowClear
              className={style.form_wrap__custom_input}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }} name="code">
            <Input
              type="number"
              className={style.form_wrap__custom_input}
              suffix={<div>{render()}</div>}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <button onClick={onSubmit} type="button">
              登录
            </button>
          </Form.Item>
        </Form>
      </div>

      <div className={style.footer_wrap}>
        登录即同意
        <a href="/#" onClick={(event) => goProtocol(event, 'service')}>
          《服务协议》
        </a>
        <em>和</em>
        <a href="/#" onClick={(event) => goProtocol(event, 'private')}>
          《隐私协议》
        </a>
      </div>
    </div>
  )
}

export const PhoneNumberLogin = React.memo(_PhoneNumberLogin)
