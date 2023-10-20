import { I18N, isCN } from '@flyele-nx/i18n'
import { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import cs from 'classnames'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import { useMemoizedFn, useRequest } from 'ahooks'
import style from './index.module.scss'
import { IBasicSpace } from '@flyele-nx/types'
import { projectApi, workspaceApi } from '@flyele-nx/service'
import { CustomerServiceEmail, SpaceAvatar } from '@flyele-nx/ui'
import CustomerServicesModal from '../customer-services-modal'
import { Close, CustomerServiceIcon, WarmingGrayIcon } from '@flyele-nx/icon'
import EmptyImage from '../../assets/project-lure/empty.png'
import { SpaceMemberType } from '@flyele-nx/constant'

interface IProps {
  visible: boolean
  projectId: string
  workspaceId: string
  handleClose?: () => void
  onCreateSpace?: (cb: () => void) => void
  onImport?: (item: IBasicSpace) => void
}

export const ProjectLure = (props: IProps) => {
  const { visible, handleClose, onImport, onCreateSpace, projectId } = props
  const [list, setList] = useState<IBasicSpace[]>([])

  const getList = useMemoizedFn(async () => {
    const { data } = await workspaceApi.getSpaceList({})

    const list = (data.data_list ?? []).filter(
      (i) => i.member_type === SpaceMemberType.SPACE && i.level > 1
    )

    setList(list)
  })

  const { run: getProjectDetail, data: projectInfo } = useRequest(
    async () => {
      const res = await projectApi.getDetail({ projectId })
      return res.data
    },
    { manual: true }
  )

  useEffect(() => {
    if (visible) {
      getList()
      getProjectDetail()
    }
  }, [visible, getList, getProjectDetail])

  const serviceController = useController(new FlyBasePopperCtrl())

  const buildContent = () => {
    if (projectInfo?.target_workspace_id) {
      // console.log("res",projectInfo)
      const spaceInfo = list.find(
        (i) => i.workspace_id === projectInfo.target_workspace_id
      )
      return (
        <div className={style.review}>
          <div className={style.review_avatar}>
            <SpaceAvatar
              style={{ borderRadius: '50%', transition: 'none' }}
              size={53}
              icon={spaceInfo?.icon}
              icon_color={spaceInfo?.icon_color}
            />
          </div>
          <span className={style.review_name}>{spaceInfo?.name}</span>
          <span className={style.review_desc}>
            {I18N.common.applyingForGuidance}
          </span>
        </div>
      )
    } else if (list.length) {
      return (
        <div className={style.list_wrap}>
          <div className={style.list}>
            {list.map((item) => {
              return (
                <div key={item.workspace_id} className={style.item}>
                  <SpaceAvatar
                    style={{ borderRadius: '50%', transition: 'none' }}
                    size={28}
                    icon={item.icon}
                    icon_color={item.icon_color}
                  />
                  <span className={style.item_name}>{item.name}</span>
                  <div
                    onClick={() => onImport?.(item)}
                    className={style.item_btn}
                  >
                    {I18N.common.import}
                  </div>
                </div>
              )
            })}
          </div>
          <div className={style.warming}>
            <WarmingGrayIcon />
            <span>{I18N.common.importOperationDoesNotWork}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className={style.empty}>
          <img className={style.empty_img} src={EmptyImage} alt="empty" />
          <span className={style.empty_txt}>
            {I18N.common.youCurrentlyDoNotHave}
          </span>
          <Button
            onClick={() => {
              onCreateSpace?.(getList)
            }}
            className={style.empty_btn}
          >
            {I18N.common.createAProfessionalBlank}
          </Button>
        </div>
      )
    }
  }

  return (
    <Modal
      open={visible}
      width={480}
      centered
      closable={false}
      footer={null}
      destroyOnClose
      closeIcon
    >
      <div className={style.container}>
        <div className={style.header}>
          <div>
            <h1 className={style.title}>{I18N.common.personalProjectMost}</h1>
            <span className={style.desc}>
              {I18N.common.ifMoreCooperationIsNeeded}
            </span>
          </div>
          <Close className={style.icon_close} onClick={handleClose} />
        </div>
        <div className={style.content}>{buildContent()}</div>

        <div className={style.footer}>
          <div className={cs(style.footer_btn, style.footer_btn_service)}>
            <FlyBasePopper
              controller={serviceController}
              trigger="click"
              placement="top"
              showArrow={false}
              zIndex={10003}
              content={() =>
                isCN ? (
                  <CustomerServicesModal
                    onClose={() => serviceController.hide()}
                  />
                ) : (
                  <CustomerServiceEmail
                    onClose={() => serviceController.hide()}
                  />
                )
              }
            >
              <div
                className={style.footer_btn}
                onClick={() => serviceController.show()}
              >
                <CustomerServiceIcon />
                <span style={{ marginLeft: 4 }}>
                  {I18N.common.contactCustomerServiceForClarification}
                </span>
              </div>
            </FlyBasePopper>
          </div>
        </div>
      </div>
    </Modal>
  )
}
