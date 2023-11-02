// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './index.module.scss'
import { FeedBackIcon } from '@flyele-nx/icon'
import logo from '../../../assets/login/logo.png'
import reset_success from '../../../assets/login/reset_success.png'
import reset_error from '../../../assets/login/reset_error.png'
import { Button, Form, Input, Modal, message } from 'antd'
import { useEffect, useState } from 'react'
import { ReactComponent as CreatePassword } from '../../../assets/login/create_password.svg'
import { UsercApi } from '@flyele-nx/service'
import { IResetPassword } from '@flyele-nx/types'
import { debounce } from 'lodash'
import { OverseasContactUsModal } from '@flyele-nx/ui'

type ChangeValue = {
  [P in 'password' | 'passwordConfirm']: string
}

const ResetPassword = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [createNewPassword, setCreateNewPassword] = useState(true)
  const [isCreateSuccess, setIsCreateSuccess] = useState(false)
  const [userInfo, setUserInfo] = useState<IResetPassword>()
  const [loading, setLoading] = useState(false)
  const [contactUsModal, setContactUsModal] = useState(false)

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    // 获取所有参数的键值对
    const params: any = {}
    urlParams.forEach((value, key) => {
      params[key] = value
    })
    setUserInfo(params)
  }, [])

  const resetPassword = () => {
    if (!userInfo) return
    setLoading(true)
    const params = {
      ...userInfo,
      mima: passwordConfirm,
      yanzhengma: userInfo.code
    }
    UsercApi.resetPassword(params)
      .then((res) => {
        console.log(res)
        setCreateNewPassword(false)
        setIsCreateSuccess(true)
        setLoading(false)
      })
      .catch((err) => {
        setCreateNewPassword(false)
        setIsCreateSuccess(false)
        setLoading(false)
      })
  }
  const onSubmit = () => {
    form
      .validateFields()
      .then(async () => {
        if (password === passwordConfirm) {
          resetPassword()
        } else {
          messageApi.open({
            type: 'error',
            content: 'Password entries do not match'
          })
        }

        // login()
      })
      .catch((err) => {
        const str = err.errorFields[0].errors[0]
        messageApi.open({
          type: 'error',
          content: str
        })
        console.log('校验不通过', err)
      })
  }

  const onChange = (changedValues: ChangeValue) => {
    const entries = Object.entries(changedValues)

    entries.forEach((item) => {
      switch (item[0]) {
        case 'password':
          setPassword(item[1])
          break
        case 'passwordConfirm':
          setPasswordConfirm(item[1])
          break
        default:
          console.log('未匹配')
      }
    })
  }

  const onClickFeedbackNew = () => {
    setContactUsModal(true)
  }
  const onCloseModal = () => {
    setContactUsModal(false)
  }

  return (
    <div>
      {contextHolder}
      <div className={styles.header}>
        <div className={styles.left}>
          <img className={styles.logo} alt="" src={logo} />
          <span>Flyele</span>
        </div>
        <div className={styles.right} onClick={onClickFeedbackNew}>
          <span>Contact us</span>
          <FeedBackIcon width={14} height={14} />
        </div>
      </div>
      {isCreateSuccess && !createNewPassword && (
        <div className={styles.success}>
          <div>
            <img className={styles.reset_success} alt="" src={reset_success} />
            <div className={styles.content}>
              Successfully reset the password
            </div>
            <p className={styles.desc}>You can log in to your account now</p>
          </div>
        </div>
      )}
      {!isCreateSuccess && !createNewPassword && (
        <div className={styles.error}>
          <div>
            <img className={styles.reset_error} alt="" src={reset_error} />
            <div className={styles.content}>
              The Link has expired, please try again
            </div>
          </div>
        </div>
      )}
      <Modal
        open={createNewPassword}
        closable={false}
        title={false}
        footer={null}
        width={420}
        wrapClassName={styles.modalRoot}
        zIndex={1003}
        destroyOnClose
        maskClosable={false}
        style={{
          top: '120px'
        }}
        mask={false}
      >
        <div className={styles.title}>Create a new password！</div>
        <div className={styles.form_wrap}>
          <Form
            form={form}
            name="login"
            onValuesChange={onChange}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
          >
            <Form.Item
              wrapperCol={{ span: 24 }}
              name="password"
              label="Choose new password"
              labelCol={{ span: 24 }}
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
                className={styles.form_wrap__custom_input}
                placeholder="Choose new password"
                prefix={<CreatePassword />}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
              name="passwordConfirm"
              label="Confirm"
              labelCol={{ span: 24 }} // 标签占据整行的宽度
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
                className={styles.form_wrap__custom_input}
                placeholder="Confirm password"
                prefix={<CreatePassword />}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                onClick={debounce(onSubmit, 5000, {
                  leading: true,
                  trailing: false
                })}
                loading={loading}
              >
                Reset password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <OverseasContactUsModal open={contactUsModal} onCancel={onCloseModal} />
    </div>
  )
}

export default ResetPassword
