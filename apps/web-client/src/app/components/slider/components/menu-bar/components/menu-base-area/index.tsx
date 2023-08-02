import commonStyles from '../../../common/index.module.scss'
import { ItemByTabKey } from '../../../common/item-by-tab-key'
import { RoutePath } from '../../../../../../routes/const'

/**
 * 侧边栏基础区域
 * 我的任务 不能被改变，一定有
 * 其他tab的默认排序：讨论＞目标＞视图＞笔记
 */
export const MenuBaseArea = () => {
  // 后续的做其他tab再打开
  // const getTabs = useMemo(() => {
  //   const base = [RoutePath.board]
  //
  //   return [...base, ...currentTabs]
  // }, [currentTabs])
  const getTabs = [RoutePath.board]

  return (
    <div className={commonStyles.menuBaseAreaRoot}>
      <ItemByTabKey items={getTabs} />
    </div>
  )
}
