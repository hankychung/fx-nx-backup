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

type ChangeValue = {
  [P in 'phoneNum' | 'code']: string
}

export const PhoneLogin = ({
  title = '登录',
  btnTitle = '登录',
  getVerifyCode,
  onLogin
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

  const onSubmit = () => {
    form
      .validateFields()
      .then(async () => {
        const phone = phoneNum.replace(/\s*/g, '')
        onLogin({
          telephone: phone,
          verify_code: code
        })
      })
      .catch((err) => {
        console.log('校验不通过', err)
      })
  }

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

  const getCode = async (events: MouseEvent<HTMLDivElement>) => {
    events.preventDefault()
    if (codeStatus === CodeStatus.hasPn) {
      try {
        const phone = phoneNum.replace(/\s*/g, '')
        await getVerifyCode(phone)
        setIsCallCodeIe(true) // 已调用生成短信接口
        setCodeStatus(CodeStatus.timer)
        exeTimer() // 启动定时器
      } catch (err) {
        setIsCallCodeIe(true) // 调试用，记得清除
        messageApi.open({
          type: 'error',
          content: '获取验证码失败'
        })
      }
    }
  }

  // 手机号码为 344 格式显示
  const phoneFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value // 旧值
    let newVal = val.substring(0, 13).replace(/[^\d]/g, '') // 提取中字符串中的数字（只数字）
    // 检测到第4位数字和第8位数字时，在第3位和第7位加入空格
    // （注意：如果检测到第3位数字和第7位数字时添加空格（判断条件为>6和>2），删除时会导致删除到空格时无法继续删除，可自行尝试）
    if (newVal.length > 7) {
      newVal = newVal.replace(/^(.{3})(.{4})(.*)$/, '$1 $2 $3')
    } else if (newVal.length > 3) {
      newVal = newVal.replace(/^(.{3})(.*)$/, '$1 $2')
    }
    // 返回格式化之后的值
    return newVal
  }

  useEffect(() => {
    setCodeStatus((value) => {
      if (value === CodeStatus.timer) return value // 倒计时中
      const phone = phoneNum.replace(/\s*/g, '')
      return phoneReg.test(phone) ? CodeStatus.hasPn : CodeStatus.noPn
    })
  }, [phoneNum])

  useEffect(() => {
    const phone = phoneNum.replace(/\s*/g, '')
    setDisabled(!(phoneReg.test(phone) && codeReg.test(code) && isCallCodeIe))
  }, [phoneNum, code, isCallCodeIe])

  useEffect(() => {
    if (timer === 0) {
      const phone = phoneNum.replace(/\s*/g, '')
      setCodeStatus(phoneReg.test(phone) ? CodeStatus.hasPn : CodeStatus.noPn)
    }
  }, [phoneNum, timer])

  const render = () => {
    const getText = () => {
      if (codeStatus === CodeStatus.noPn || codeStatus === CodeStatus.hasPn)
        return '获取验证码'

      return `${timer}s后重试`
    }
    const cla = cs(styles.codeSuffix, {
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
            onValuesChange={onChange}
          >
            <Form.Item
              name="phoneNum"
              label="手机号"
              rules={[
                {
                  required: true,
                  transform: (value) => value.replace(/\s*/g, ''),
                  pattern: phoneReg,
                  message: '输入正确的手机号'
                }
              ]}
              wrapperCol={{ span: 24 }}
              getValueFromEvent={phoneFormat}
            >
              <Input className={styles.customInput} />
            </Form.Item>
            <Form.Item name="code" label="验证码" wrapperCol={{ span: 24 }}>
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
            onClick={onSubmit}
          >
            {btnTitle}
          </FlyButton>
        </div>
      </div>
    </>
  )
}
