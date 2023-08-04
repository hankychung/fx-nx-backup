import { ContextMenu, contextMenuTool } from '@flyele-nx/service-module'

const _NxScheduleTool = () => {
  return <ContextMenu ref={(r) => contextMenuTool.registerContextMenu(r)} />
}

export const NxScheduleTool = _NxScheduleTool
