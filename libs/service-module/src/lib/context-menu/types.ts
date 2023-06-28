import { CSSProperties, ReactNode } from 'react'

export interface IAction {
  txt: string
  callback: () => void
  checkAction: boolean // 为false的时候不显示选项
  reRender?: (close: () => void) => ReactNode
  customClass?: string
  getTxtStyle?: CSSProperties
}

export interface IMenuPosition {
  x: number
  y: number
}

export interface IShowMenuOptions extends IMenuPosition {
  action: IAction[]
  onClose?: () => void
}

export interface IContextMenuRef {
  show: (options: IShowMenuOptions) => void
  close: () => void
  getVisible: () => boolean
}
