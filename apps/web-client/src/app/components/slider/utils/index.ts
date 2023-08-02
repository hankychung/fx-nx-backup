import {
  MenuAddressListIcon,
  MenuApplicationIcon,
  MenuDiscussIcon,
  MenuFilesIcon,
  MenuMatterIcon,
  MenuNotesIcon,
  MenuReviewIcon,
  MenuTargetIcon,
  MenuViewIcon
} from '@flyele-nx/icon'
import { ReactComponent } from '*.svg'
import { RoutePath } from '../../../routes/const'

interface IMenuIconType {
  icon: typeof ReactComponent
  defaultColor: string
  activeColor: string
  name: string
}

export const menuObj: Record<string, IMenuIconType> = {
  [RoutePath.board]: {
    icon: MenuMatterIcon,
    defaultColor: '#6C6C6C',
    activeColor: '#262626',
    name: '我的任务'
  },
  [RoutePath.view]: {
    icon: MenuViewIcon,
    defaultColor: '#6C6C6C',
    activeColor: '#262626',
    name: '视图'
  },
  [RoutePath.matter]: {
    icon: MenuDiscussIcon,
    defaultColor: '#6C6C6C',
    activeColor: '#262626',
    name: '讨论'
  },
  [RoutePath.targetLibrary]: {
    icon: MenuTargetIcon,
    defaultColor: '#6C6C6C',
    activeColor: '#262626',
    name: '目标'
  },
  [RoutePath.notes]: {
    icon: MenuNotesIcon,
    defaultColor: '#6C6C6C',
    activeColor: '#262626',
    name: '笔记'
  },
  [RoutePath.member]: {
    icon: MenuAddressListIcon,
    defaultColor: '#6C6C6C',

    activeColor: '#262626',
    name: '通讯录'
  },
  [RoutePath.file]: {
    icon: MenuFilesIcon,
    defaultColor: '#6C6C6C',
    activeColor: '#262626',
    name: '文件夹'
  },
  [RoutePath.applicationLibrary]: {
    icon: MenuApplicationIcon,
    defaultColor: '#6C6C6C',
    activeColor: '#262626',
    name: '应用'
  },
  [RoutePath.review]: {
    icon: MenuReviewIcon,
    defaultColor: '#6C6C6C',
    activeColor: '#262626',
    name: '复盘'
  }
} as Record<RoutePath, IMenuIconType>

// 获取tab 数据
export const getTabData = (key: RoutePath): IMenuIconType | null => {
  return menuObj[key]
}
