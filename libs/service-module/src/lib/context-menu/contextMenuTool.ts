import { IContextMenuRef, IShowMenuOptions } from './types'

class ContextMenuTool {
  private contextMenu: IContextMenuRef | null = null

  registerContextMenu(r: IContextMenuRef | null) {
    this.contextMenu = r
  }

  open(options: IShowMenuOptions) {
    this.contextMenu?.show(options)
  }

  close() {
    this.contextMenu?.close()
  }

  getVisible() {
    return this.contextMenu?.getVisible()
  }
}

export const contextMenuTool = new ContextMenuTool()
