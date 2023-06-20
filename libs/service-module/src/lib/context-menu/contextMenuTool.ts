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
}

export const contextMenuTool = new ContextMenuTool()
