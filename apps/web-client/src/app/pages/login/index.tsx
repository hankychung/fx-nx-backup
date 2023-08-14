import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { RoutePath } from '../../routes/const'
import { SocketHandler } from '@flyele-nx/ws'
import { Advertisement, FeedbackBtn } from '@flyele-nx/ui'
import { LoginInput, GlobalInfoHandler } from '@flyele-nx/service-module'
import { envStore, IUserInfo, UsercApi, OfficialApi } from '@flyele-nx/service'
import styles from './index.module.scss'
import { LocalStore } from '@flyele-nx/utils'

const Login: FC = () => {
  const navigate = useNavigate()
  const isProdEnv = envStore.getEnv() === 'prod'

  const goToBoard = useMemoizedFn(() => {
    const isNewUser = false
    if (isNewUser) {
      navigate(RoutePath.noviceGuide)
      return
    }
    navigate(RoutePath.board)
  })

  const updateVipInfo = useMemoizedFn(async () => {
    const res = await UsercApi.getCombo()
    if (res.data) {
      const m = res.data.member // 基本资料
      const equity = res.data?.member_equity // 权限列表
      const level = m?.state ?? 0
      GlobalInfoHandler.updateUserVip({
        start_time: m?.start_time,
        id: m?.id,
        deadline: m?.end_time ?? 0,
        invite_code: m?.invite_code,
        next_end_time: m?.next_end_time,
        end_time: m?.end_time,
        level,
        recently_type: m?.recently_type
      })

      if (equity) {
        GlobalInfoHandler.updateUserVipPower({
          maxCustomView: equity.custom_view_num, // 自定义视图
          // maxUploadFileSize: 125829120, // 上传文件大小 最大值
          maxUploadFileSize: equity.upload_file_size, // 上传文件大小 最大值
          calendar: equity.month_view, // 是否能月视图
          fillBatchExport: equity.batch_export, // 是否全量导出
          maxFileSize: equity.self_file_capacity, // 资源库 文件最大容量
          maxCustomTimeRemind: equity.custom_remind_time, // 自定义时间提醒最大值
          maxCreateSpace: equity.create_team_workspace_num, // 创建空间最大值
          createVenation: equity.create_context_diagram, // 是否能创建脉络图
          maxPrivateProject: equity.self_project_num, // 个人空间 项目最大值
          pcWidget: equity.pc_widget, // pc 小组件
          asyncCalendar: equity.sync_local_calendar, // 同步日历
          myTaskInteractNum: equity.task_interact_num, //自己的创建协助人
          myChildTasksNum: equity.child_tasks_num, // 自己的创建子事项
          myTagTasksNum: equity.tag_tasks_num, // 自己的创建子事项
          myChildTasksLevel: 8 // TODO 这里要对接后端
        })
      }
    }
  })

  const updateUserSetting = useMemoizedFn(async () => {
    const res = await UsercApi.getUserSetting()
    GlobalInfoHandler.updateUserSetting(res.data)
  })

  const updateEnterpriseInfo = useMemoizedFn(async (corpId: string) => {
    const [enterpriseTakers, enterpriseDetail] = await Promise.all([
      OfficialApi.getAddressBook(corpId).then(
        (res) => res.data.corp_user ?? []
      ),
      OfficialApi.getCorpDetail(corpId).then((res) => res.data)
    ])
    GlobalInfoHandler.updateUserEnterpriseInfo({
      ...enterpriseDetail
    })
    GlobalInfoHandler.updateUserEnterpriseTakers(enterpriseTakers)
  })

  const onLoginSuccess = useMemoizedFn(async (data?: IUserInfo) => {
    if (data) {
      GlobalInfoHandler.updateUserInfo(data)
      await updateVipInfo()
      await updateUserSetting()

      if (data.corpid) {
        // 如果是企业
        await updateEnterpriseInfo(data.corpid)
      }
    }
    goToBoard()

    SocketHandler.initSocket()
  })

  const onClickFeedbackNew = () => {
    window.open(
      ' https://fxkj15.qiyukf.com/client?k=32dc07afddda5179a2b418a9daa1fbca&wp=1&robotShuntSwitch=0'
    )
  }

  useEffect(() => {
    if (LocalStore.getToken()) {
      navigate(RoutePath.board)
    }
  }, [navigate])

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapContent}>
        <Advertisement />

        <div className={styles.wrapRight}>
          <FeedbackBtn
            customClass={styles.feedbackBtn}
            clickHandler={onClickFeedbackNew}
          />
          <LoginInput
            usePhoneNumLogin={!isProdEnv}
            onLoginSuccess={onLoginSuccess}
          />
        </div>
      </div>
    </div>
  )
}

export { Login }
