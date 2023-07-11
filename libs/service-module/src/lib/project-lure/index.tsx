import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd'
import cs from 'classnames'
import {
  FlyBasePopper,
  FlyBasePopperCtrl,
  useController
} from '@flyele/flyele-components'
import { useMemoizedFn, useMount } from 'ahooks'
import style from './index.module.scss'
import { SpaceType, SpaceTypeConst, workspaceApi } from '@flyele-nx/service'
import { SpaceAvatar } from '@flyele-nx/ui'
import CustomerServicesModal from '../customer-services-modal'
import { Close, CustomerServiceIcon, WarmingGrayIcon } from '@flyele-nx/icon'
import EmptyImage from '../../assets/project-lure/empty.png'

interface IProps {
  visible: boolean
  projectId: string
  workspaceId: string
  handleClose?: () => void
  onCreateSpace?: (cb: () => void) => void
  onImport?: (item: SpaceType.IBasicSpace) => void
}

export const ProjectLure = (props: IProps) => {
  const { visible, handleClose, onImport, onCreateSpace } = props
  const [list, setList] = useState<SpaceType.IBasicSpace[]>([])

  const getList = useMemoizedFn(async () => {
    const { data } = await workspaceApi.getSpaceList({})

    console.log('data***', data)

    const list = (data.data_list ?? []).filter(
      (i) => i.member_type === SpaceTypeConst.SpaceMemberType.SPACE
    )

    setList(list)
  })

  useEffect(() => {
    if (visible) getList()
  }, [visible, getList])

  const serviceController = useController(new FlyBasePopperCtrl())

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
            <h1 className={style.title}>个人项目最多支持20人使用</h1>
            <span className={style.desc}>
              如需更多协作人数，请导入至专业空间使用
            </span>
          </div>
          <Close className={style.icon_close} onClick={handleClose} />
        </div>
        <div className={style.content}>
          {list.length ? (
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
                        导入
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className={style.warming}>
                <WarmingGrayIcon />
                <span>导入操作不可逆，且只能选择一个专业空间导入</span>
              </div>
            </div>
          ) : (
            <div className={style.empty}>
              <img className={style.empty_img} src={EmptyImage} alt="empty" />
              <span className={style.empty_txt}>你当前没有专业空间</span>
              <Button
                onClick={() => {
                  onCreateSpace?.(getList)
                }}
                className={style.empty_btn}
              >
                创建专业空间
              </Button>
            </div>
          )}
        </div>

        <div className={style.footer}>
          <div className={cs(style.footer_btn, style.footer_btn_service)}>
            <FlyBasePopper
              controller={serviceController}
              trigger="click"
              placement="bottom-end"
              showArrow={false}
              zIndex={10003}
              content={() => (
                <CustomerServicesModal
                  onClose={() => serviceController.hide()}
                />
              )}
            >
              <div
                className={style.footer_btn}
                onClick={() => serviceController.show()}
              >
                <CustomerServiceIcon />
                <span style={{ marginLeft: 4 }}>联系客服，解答所有疑问</span>
              </div>
            </FlyBasePopper>
          </div>
        </div>
      </div>
    </Modal>
  )
}
