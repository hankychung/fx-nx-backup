import { memo, FC, useState } from 'react'
import style from './index.module.scss'
import { RoutePath } from '../../../../../../../../apps/web-client/src/app/routes/const'
import { Tabs } from './components/tabs'
import { Actions } from './components/actions'
import {
  HeaderSearchIcon,
  HeaderShareIcon,
  HeaderNoticeIcon,
  HeaderRefreshIcon
} from '@flyele-nx/icon'
import { HeaderActions } from './const'
// import { inviteModal } from '@flyele-nx/service-module'
import { useNavigate } from 'react-router-dom'

const _BoardHeader: FC = () => {
  const [activeTab, setActiveTab] = useState<RoutePath>(RoutePath.board)
  const navigate = useNavigate()

  const onChange = (key: RoutePath) => {
    if (key === activeTab) return

    // 跳转到key
    navigate(key)

    // inviteModal.open()

    setActiveTab(key)
  }

  const tabs = [
    {
      key: RoutePath.board,
      txt: '日'
    },
    {
      key: RoutePath.weekView,
      txt: '周'
    },
    {
      key: RoutePath.monthView,
      txt: '月'
    },
    {
      key: RoutePath.fullView,
      txt: '全量'
    },
    {
      key: RoutePath.quadrantView,
      txt: '四象限'
    }
  ]

  const actions = [
    { key: HeaderActions.SEARCH, icon: <HeaderSearchIcon /> },
    {
      key: HeaderActions.SHARE,
      icon: <HeaderShareIcon />
    },
    {
      key: HeaderActions.NOTICE,
      icon: <HeaderNoticeIcon />
    },
    {
      key: HeaderActions.REFRESH,
      icon: <HeaderRefreshIcon />
    },
    {
      key: HeaderActions.CREATE,
      icon: ''
    }
  ]

  return (
    <div className={style.header}>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={onChange} />
      <Actions actions={actions} />
    </div>
  )
}

export const BoardHeader = memo(_BoardHeader)
