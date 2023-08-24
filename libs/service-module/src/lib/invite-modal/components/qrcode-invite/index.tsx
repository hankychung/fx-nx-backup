import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { FlyButton } from '@flyele/flyele-components'
// import dashedLine from '@/assets/dashedLine.png'
import cs from 'classnames'
import dayjs from 'dayjs'
// import loadingGif from 'assets/icons/loading.gif'
// import networkError from 'assets/networkError.png'
import QRCode from 'qrcode'
import styles from './index.module.scss'
import { IInviteParams } from '@flyele-nx/types'
import { useUserInfoStore } from '@flyele-nx/zustand-store'
import { MatterType } from '@flyele-nx/constant'
import { domToImage, inviteLinkLongUrl, timeGetter } from '@flyele-nx/utils'
import { message } from 'antd'
import { PromotionsCard } from '@flyele-nx/ui'

interface IProps {
  inviteParams: IInviteParams
  isInvitePeople?: boolean
  isNote?: boolean
  propStyle?: React.CSSProperties
}

export function QrcodeInvite(props: IProps) {
  const { inviteParams, isInvitePeople, isNote = false, propStyle } = props
  const { taskId, matterType, isExternal, flow_step_id, title, corpId } =
    inviteParams
  const [qrCode, setQrCode] = useState('')
  const [validityTime, setValidityTime] = useState<string>('')
  const { user_id: userId } = useUserInfoStore((state) => state.userInfo)
  const domRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const clipboardUrl = useRef<HTMLCanvasElement>()

  const [copyLoading, setCopyLoading] = useState(false)

  const isMatter = useMemo(() => {
    if (matterType === MatterType.matter) return 4

    if (matterType === MatterType.project) return 25

    return 7
  }, [matterType])

  /**
   * 获取有效期
   */
  const getValidityTime = async () => {
    const curTime = await timeGetter.getDate()
    const date = dayjs(curTime * 1000)
      .add(7, 'day')
      .hour(23)
      .minute(59)
      .second(59)

    return {
      date: date.unix(),
      dateText: date.format('YYYY年M月D日')
    }
  }

  /**
   * 获取h5版本的二维码
   */
  const qrCodeFunction = useMemoizedFn(async () => {
    if (loading) return
    setLoading(true)

    try {
      setIsError(false)
      let url = ''

      if (isInvitePeople) {
        // url = invitePeopleUrl({ userId, nickName, corpId }).url
      } else {
        url = inviteLinkLongUrl({
          id: taskId,
          userId,
          matterType,
          isExternal,
          corpId
        }).url
      }

      if (flow_step_id) {
        url += `&flow_step_id=${flow_step_id}`
      }

      const { date, dateText } = await getValidityTime()
      const currentTime = Math.trunc(new Date().getTime() / 1000) // 当前时间 单位：秒

      setValidityTime(dateText)

      url += `&expire_at=${date}&dispatch_at=${currentTime}`
      console.log('url', url)

      const res = await QRCode.toDataURL(url)

      setQrCode(res)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setIsError(true)
    }
  })

  /**
   * 获取笔记微信二维码
   * 笔记没有 h5 那些 不走上面那套
   */
  const fetchWeChatQrcode = useMemoizedFn(async () => {
    // TODO:
    // if (loading) return
    // setLoading(true)
    // let params: IGetQrCodeParams
    // if (isNote) {
    //   params = getNoteQrCodeParams(taskId)
    // } else {
    //   params = getQrCodeParams(taskId, userId, isMatter, isExternal, undefined)
    // }
    // if (params) {
    //   try {
    //     const res = await officialService.getQrCode(params)
    //     setQrCode(res)
    //     setLoading(false)
    //   } catch (e) {
    //     setLoading(false)
    //     setIsError(true)
    //   }
    // }
  })

  /**
   * 获取二维码
   */
  const getQrCode = useMemoizedFn(async () => {
    if (isNote) {
      await fetchWeChatQrcode()
    } else {
      await qrCodeFunction()
    }
  })

  /**
   * 根据html生成图片
   */
  const createImgFromHtml = useMemoizedFn(async () => {
    if (domRef.current) {
      clipboardUrl.current = (await domToImage(domRef.current, {
        needUrl: false,
        ignoreElements: (element) => {
          if (domRef.current) {
            const compare = domRef.current.compareDocumentPosition(element)
            let result =
              (compare === 1 ||
                compare === 2 ||
                compare === 4 ||
                compare === 32) &&
              element.nodeName !== 'HEAD' &&
              element.nodeName !== 'STYLE'

            if (element.nodeName === 'STYLE' && element.textContent) {
              result =
                element.textContent.indexOf(styles.qrcodeInviteRoot) === -1
            }

            return result
          }
          return false
        }
      })) as HTMLCanvasElement
    } else {
      console.log('二维码节点没准备好')
    }
  })

  /**
   * 复制图片
   */
  const copyQrcode = useMemoizedFn(async () => {
    if (qrCode) {
      if (!clipboardUrl.current) {
        // 当不存在url的时候
        await createImgFromHtml()
      }
      setCopyLoading(true)
      try {
        if (clipboardUrl.current) {
          clipboardUrl.current.toBlob(async (blob) => {
            if (blob) {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ])
              message.success('图片已复制到剪贴板')
              setCopyLoading(false)
              // globalNxController.showMsg({
              //   msgType: '成功',
              //   content: '图片已复制到剪贴板'
              // })
            }
          }, 'image/png')
        }
      } catch (error) {
        console.log('复制失败', error)
        message.error('复制失败,请再次尝试')
        setCopyLoading(false)
        // globalNxController.showMsg({
        //   msgType: '错误',
        //   content: '复制失败，请再次尝试'
        // })
      }
    } else {
      console.log('缺少二维码')
    }
  })

  /**
   * 企业微信的情况下
   * 在邀请空间内部成员、空间项目内部成员、个人项目成员、空间目标执行人时，标题与提示信息需改为
   */
  const isCorpMode: boolean = useMemo(() => {
    return corpId ? !isExternal : false
  }, [corpId, isExternal])

  /**
   * 根据类型变化显示内容
   */
  const matterValue = useMemo(() => {
    let value = ''
    let title = '事项'

    if (isInvitePeople) {
      return {
        title: '协作人邀请',
        style: {
          color: '#1DD2C1'
        }
      }
    }

    switch (matterType) {
      case MatterType.matter:
        value = '#1DD2C1' // 事项
        title = '事项'
        break
      case MatterType.meeting:
        value = '#EEC93C' // 会议
        title = '会议'
        break
      case MatterType.project:
        value = '#FFAC44' // 项目
        title = '项目'
        break
      case MatterType.target:
        value = '#1DD2C1' // 目标
        title = '目标'
        break
      default:
        value = '#5D5EEE' // 空间
        title = '空间'
    }

    // 笔记情况，特殊处理
    if (isNote) {
      value = '#5D5EEE'
      title = '笔记'
    }

    return {
      title,
      style: {
        color: value
      }
    }
  }, [isInvitePeople, matterType, isNote])

  /**
   * 是否仅支持微信扫码
   */
  const isOnlyWechat = useMemo(() => {
    return isNote
  }, [isNote])

  useEffect(() => {
    getQrCode()
  }, [taskId, isMatter, userId, isExternal, flow_step_id, getQrCode])

  useEffect(() => {
    if (!loading && qrCode) {
      createImgFromHtml()
    }
  }, [createImgFromHtml, loading, qrCode])

  return (
    <div className={styles.qrcodeInviteRoot} style={propStyle}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          {isCorpMode
            ? '发送二维码给同事'
            : isNote
            ? '扫码分享给好友'
            : '发送二维码给好友'}
        </div>
        {!isNote && (
          <div className={styles.headerDesc}>
            {isCorpMode
              ? '分享给同事，对方在手机扫码后即可加入'
              : `分享给好友，对方在${
                  isOnlyWechat ? '微信' : '手机'
                }扫码后即可加入`}
          </div>
        )}
      </div>

      <div className={styles.content} ref={domRef}>
        <div className={styles.contentTitle}>
          <div style={matterValue.style} className={styles.matterText}>
            {isInvitePeople ? `${matterValue.title}` : `[${matterValue.title}]`}
          </div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.lineBox}>
          <div className={cs(styles.semicircle, styles.semicircleLeft)} />
          <div className={styles.line}>
            {/* <img src={dashedLine} alt="" /> */}
          </div>
          <div className={cs(styles.semicircle, styles.semicircleRight)} />
        </div>
        {loading ? (
          <div className={styles.loadingBox}>
            <div className={styles.imgBox}>
              {/* <img src={loadingGif} alt="loading" /> */}
            </div>
            <div className={styles.text}>正在加载…</div>
          </div>
        ) : isError ? (
          <div className={styles.errorBox}>
            <div className={styles.errorImg}>
              {/* <img src={networkError} alt="error" /> */}
            </div>
            <div className={styles.errorText}>
              网络异常，
              <span className={styles.reloadText} onClick={getQrCode}>
                重新加载
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.qrcodeBox}>
              <img src={qrCode} alt="qrcode" />
            </div>
            {validityTime && (
              <div className={styles.qrcodeValidityTime}>
                {`二维码有效期至 ${validityTime}`}
              </div>
            )}
          </>
        )}
      </div>

      {!loading && qrCode && !isNote && (
        <FlyButton
          theme="primary"
          size="large"
          loading={copyLoading}
          onClick={copyQrcode}
        >
          复制图片
        </FlyButton>
      )}

      <PromotionsCard
        width="407px"
        title="限时活动：每邀请1个新用户注册，免费得5天团队会员"
        style={{ marginTop: 30 }}
      />
    </div>
  )
}
