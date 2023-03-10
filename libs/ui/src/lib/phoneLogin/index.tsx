import React, { MouseEvent, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { FlyButton } from '@flyele/flyele-components'
import { IPhoneLoginProps } from './types'
import { Form, Input, message } from 'antd'
import cs from 'classnames'
import { useTimer } from './hooks/useTimer'

enum CodeStatus {
  noPn, // 没有手机号或手机号错误
  hasPn, // 输入正确的手机号
  timer // 倒计时中
}

const phoneReg = /^1[3-9]\d{9}$/
const codeReg = /^\d{6}$/

export const PhoneLogin = ({
  title = '登录',
  btnTitle = '登录',
  getVerifyCode
}: IPhoneLoginProps) => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [disabled, setDisabled] = useState(true) // 是否可以点击提交

  const [phoneNum, setPhoneNum] = useState('')

  // 验证码相关
  const [code, setCode] = useState<string>('')
  const [codeStatus, setCodeStatus] = useState(CodeStatus.noPn)
  const [isCallCodeIe, setIsCallCodeIe] = useState(true) // 是否已经调用短信接口, 调试模式改成true
  const { timer, exeTimer } = useTimer()

  const onFinish = (values: any) => {
    console.log(values)
  }

  const onClickBtn = () => {
    console.log('onClickBtn')
  }

  useEffect(() => {
    setCodeStatus((value) => {
      if (value === CodeStatus.timer) return value // 倒计时中
      return phoneReg.test(phoneNum) ? CodeStatus.hasPn : CodeStatus.noPn
    })
  }, [phoneNum])

  useEffect(() => {
    setDisabled(
      !(phoneReg.test(phoneNum) && codeReg.test(code) && isCallCodeIe)
    )
  }, [phoneNum, code, isCallCodeIe])

  useEffect(() => {
    if (timer === 0) {
      setCodeStatus(
        phoneReg.test(phoneNum) ? CodeStatus.hasPn : CodeStatus.noPn
      )
    }
  }, [phoneNum, timer])

  const getCode = async (events: MouseEvent<HTMLDivElement>) => {
    events.preventDefault()
    if (codeStatus === CodeStatus.hasPn) {
      try {
        const res = await getVerifyCode(phoneNum)
        setCode(res)
        setIsCallCodeIe(true) // 已调用生成短信接口
        setCodeStatus(CodeStatus.timer)
        exeTimer() // 启动定时器
      } catch (err) {
        setIsCallCodeIe(true) // 调试用，记得清除
        const content = '获取验证码失败'
        console.log('err', err)
        // if (err && err.data) {
        //   content = err.data.message
        // }

        messageApi.open({
          type: 'error',
          content
        })
      }
    }
  }

  const render = () => {
    const getText = () => {
      if (codeStatus === CodeStatus.noPn || codeStatus === CodeStatus.hasPn)
        return '获取验证码'

      return `${timer}s后重试`
    }
    const cla = cs(styles.form_wrap__code_suffix, {
      [styles.code_suffix__disabled]: codeStatus === CodeStatus.noPn,
      [styles.code_suffix__active]: codeStatus === CodeStatus.hasPn,
      [styles.code_suffix__timer]: codeStatus === CodeStatus.timer
    })

    return (
      <div className={cla} onClick={getCode}>
        {getText()}
      </div>
    )
  }

  return (
    <>
      {contextHolder}
      <div className={styles.phoneLoginRoot}>
        <div className={styles.title}>{title}</div>
        <div className={styles.from}>
          <Form
            form={form}
            name="login"
            layout="vertical"
            autoComplete="off"
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              name="phoneNum"
              rules={[
                {
                  required: true,
                  pattern: phoneReg,
                  message: '输入正确的手机号'
                }
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Input
                prefix={
                  <div className={styles.form_wrap__phone_num_prefix}>+86</div>
                }
                className={styles.form_wrap__custom_input}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} name="code">
              <Input
                type="number"
                className={styles.customInput}
                suffix={<div>{render()}</div>}
              />
            </Form.Item>
          </Form>
        </div>
        <div className={styles.footer}>
          <FlyButton
            block
            disable={disabled}
            size="large"
            theme="primary"
            onClick={onClickBtn}
          >
            {btnTitle}
          </FlyButton>
        </div>
      </div>
    </>
  )
}
