import React, { useContext, useState, useEffect, useRef } from 'react'
import { CommonPage } from '../../../common/page'
import styles from './index.module.scss'
import { FlyButton } from '@flyele/flyele-components'
import cs from 'classnames'
import QRCode from 'qrcode'
import { useMemoizedFn } from 'ahooks'
import { timeGetter, inviteLinkLongUrl } from '@flyele-nx/utils'
import dayjs from 'dayjs'
import { TeamContext } from '../../../../context/team'
import { EmptyApi, envStore } from '@flyele-nx/service'
import { globalNxController } from '@flyele-nx/global-processor'
import { domToImage } from '@flyele-nx/utils'

const _InviteMember = ({
  visible,
  onGoHome
}: {
  visible: boolean
  onGoHome: () => void
}) => {
  const { userId, spaceId, spaceName } = useContext(TeamContext)
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const clipboardUrl = useRef<HTMLCanvasElement>()

  const domRef = useRef<HTMLDivElement | null>(null)

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
  const qrCodeFunction = useMemoizedFn(async (url: string) => {
    if (loading) return
    setLoading(true)

    try {
      const res = await QRCode.toDataURL(url)

      setQrCode(res)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  })

  /**
   * 获取短链接
   */
  const getShortUrl = useMemoizedFn(async (url: string) => {
    try {
      EmptyApi.getShortUrl(url)
        .then((res) => {
          setShortUrl(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (e) {
      console.log('获取短链接失败', e)
    }
  })

  /**
   * 获取邀请长链接
   */
  const getLongUrl = useMemoizedFn(async () => {
    try {
      let { url } = inviteLinkLongUrl({
        id: spaceId,
        h5Url: envStore.getH5Url(),
        userId,
        matterType: 100000000000003,
        isExternal: false
      })

      const { date } = await getValidityTime()
      const currentTime = Math.trunc(new Date().getTime() / 1000) // 当前时间 单位：秒

      url += `&expire_at=${date}&dispatch_at=${currentTime}`

      console.log('url', url)
      await qrCodeFunction(url)
      await getShortUrl(url)
    } catch (e) {
      console.log('获取长链接失败')
    }
  })

  /**
   * 复制邀请链接
   */
  const copyToClickBoard = () => {
    navigator.clipboard
      .writeText(
        `【飞项】邀请你加入“${spaceName}”，快点击接受邀请吧！${shortUrl}`
      )
      .then(() => {
        globalNxController.showMsg({
          msgType: '消息长',
          duration: 2,
          content: '复制成功，好友可通过链接接受邀请'
        })
      })
      .catch((error) => {
        console.log('复制失败', error)
      })
  }

  /**
   * 根据html生成图片
   */
  const createImgFromHtml = useMemoizedFn(async () => {
    if (domRef.current) {
      clipboardUrl.current = (await domToImage(domRef.current, {
        needUrl: false,
        width: 210,
        height: 210,
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
              result = element.textContent.indexOf(styles.qrcodeBox) === -1
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
   * 复制二维码
   */
  const copyQrcode = useMemoizedFn(async () => {
    if (qrCode) {
      if (!clipboardUrl.current) {
        // 当不存在url的时候
        await createImgFromHtml()
      }
      try {
        console.log('@@ clipboardUrl.current', clipboardUrl.current)
        if (clipboardUrl.current) {
          clipboardUrl.current.toBlob(async (blob) => {
            if (blob) {
              await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ])
              globalNxController.showMsg({
                msgType: '成功',
                content: '图片已复制到剪贴板'
              })
            }
          }, 'image/png')
        }
      } catch (error) {
        console.log('复制失败', error)
        globalNxController.showMsg({
          msgType: '错误',
          content: '复制失败，请再次尝试'
        })
      }
    } else {
      console.log('缺少二维码')
    }
  })

  useEffect(() => {
    if (visible) {
      getLongUrl()
    }
  }, [getLongUrl, visible])

  return (
    <CommonPage
      visible={visible}
      title="最后一步！邀请你的成员"
      desc=""
      disableNext={false}
      needFooter={false}
    >
      <div className={styles.inviteMemberRoot}>
        <div className={styles.cardRoot}>
          <div className={styles.cardLeft}>
            <div className={styles.title}>二维码邀请</div>
            <div className={styles.desc}>
              截图分享，对方扫码后即可加入你的团队
            </div>
          </div>
          <div className={styles.cardRight}>
            <div className={styles.qrcodeBox} ref={domRef}>
              <img className={styles.qrcode} src={qrCode} alt="qrcode" />
            </div>
            <div className={cs(styles.copy, styles.ml)} onClick={copyQrcode}>
              复制
            </div>
          </div>
        </div>
        <div className={styles.cardRoot}>
          <div className={styles.title}>邀请链接</div>
          <div className={styles.urlBox}>{shortUrl}</div>
          <div
            className={cs(styles.copy, styles.ml)}
            onClick={copyToClickBoard}
          >
            复制
          </div>
        </div>
        <div className={styles.btnBox}>
          <div className={styles.btn}>
            <FlyButton theme="primary" block onClick={onGoHome}>
              完成邀请，开始使用
            </FlyButton>
          </div>
        </div>
      </div>
    </CommonPage>
  )
}

export const InviteMember = React.memo(_InviteMember)
