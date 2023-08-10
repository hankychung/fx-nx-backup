import React, { useContext, useMemo, useState } from 'react'
import { CommonPage } from '../../../common/page'
import styles from './index.module.scss'
import { useMemoizedFn, useMount } from 'ahooks'
import { Input } from 'antd'
import { FlyBasePopper } from '@flyele/flyele-components'
import { EditSpaceAvatar, SpaceAvatar } from '@flyele-nx/ui'
import { workspaceApi } from '@flyele-nx/service'
import { ISpaceAvatarColorConfig, ISpaceAvatarConfig } from '@flyele-nx/types'
import { TeamContext } from '../../../../context/team'

const spaceCDN =
  'https://flyele-system.oss-cn-shenzhen.aliyuncs.com/resources/PC/space'

const _CreateSpace = ({
  visible,
  goBack,
  goNext
}: {
  visible: boolean
  goBack: () => void
  goNext: () => void
}) => {
  const { spaceInfo, spaceName, setSpaceInfo, setSpaceName } =
    useContext(TeamContext)

  const [spaceAvatarList, setSpaceAvatarList] = useState<ISpaceAvatarConfig[]>(
    []
  )
  const [spaceAvatarColorList, setSpaceAvatarColorList] = useState<
    ISpaceAvatarColorConfig[]
  >([])

  const onGoBack = useMemoizedFn(() => {
    goBack()
  })

  const onGoNext = useMemoizedFn(() => {
    goNext()
  })

  const fetchSpaceConfig = useMemoizedFn(async () => {
    try {
      const [avatarRes, avatarColorRes] = await Promise.all([
        workspaceApi.getSpaceConfig('1'),
        workspaceApi.getSpaceConfig('3')
      ])
      const { data: avatarData } = avatarRes
      const { data: avatarColorData } = avatarColorRes
      if (avatarData.length && avatarColorData.length) {
        setSpaceAvatarList(avatarData)
        setSpaceAvatarColorList(avatarColorData)
        setSpaceInfo &&
          setSpaceInfo({
            icon: avatarData[0].key_name,
            icon_color: avatarColorData[0].icon_color
          })
      }
    } catch (e) {
      console.log('请求空间基础配置失败', e)
    }
  })

  const onChangeAvatar = useMemoizedFn((item: ISpaceAvatarConfig) => {
    setSpaceInfo &&
      setSpaceInfo({
        ...spaceInfo,
        icon: item.key_name
      })
  })
  const onChangeAvatarColor = useMemoizedFn((item: ISpaceAvatarColorConfig) => {
    setSpaceInfo &&
      setSpaceInfo({
        ...spaceInfo,
        icon_color: item.icon_color
      })
  })

  const disableNext = useMemo(() => {
    return spaceName === ''
  }, [spaceName])

  useMount(async () => {
    await fetchSpaceConfig()
  })

  return (
    <CommonPage
      visible={visible}
      title="创建你的团队空间"
      desc=""
      disableNext={disableNext}
      goBack={onGoBack}
      goNext={onGoNext}
    >
      <div className={styles.container}>
        <div className={styles.left}>
          <FlyBasePopper
            trigger="click"
            showArrow={false}
            placement="bottom"
            content={() => (
              <EditSpaceAvatar
                avatar={spaceInfo.icon}
                avatarColor={spaceInfo.icon_color}
                avatarList={spaceAvatarList}
                avatarColorList={spaceAvatarColorList}
                onAvatarChange={onChangeAvatar}
                onAvatarBgChange={onChangeAvatarColor}
              />
            )}
          >
            <div className={styles.avatarBox}>
              <SpaceAvatar
                style={{ borderRadius: '50%', transition: 'none' }}
                size={72}
                icon={spaceInfo.icon}
                icon_color={spaceInfo.icon_color}
              />
              <div className={styles.camera}>
                <img src={`${spaceCDN}/camera.png`} alt="camera" />
              </div>
            </div>
          </FlyBasePopper>
        </div>
        <div className={styles.right}>
          <Input
            placeholder="输入团队名称..."
            value={spaceName}
            onChange={(e) => {
              setSpaceName && setSpaceName(e.target.value)
            }}
            bordered={false}
            maxLength={16}
            style={{
              fontSize: '22px'
            }}
          />
        </div>
      </div>
    </CommonPage>
  )
}

export const CreateSpace = React.memo(_CreateSpace)
