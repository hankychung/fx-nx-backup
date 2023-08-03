/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-01-09 21:42:41
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-20 15:39:56
 * @FilePath: /gantt-task-react-main/example/src/components/view-switcher.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { FullViewModeEnum } from '@flyele-nx/constant'
type ViewSwitcherProps = {
  isChecked: boolean
  onViewListChange: (isChecked: boolean) => void
  onViewModeChange: (viewMode: FullViewModeEnum) => void
}
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked
}) => {
  return (
    <div className="ViewContainer">
      <button className="Button" onClick={() => onViewModeChange(ViewMode.Day)}>
        天
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(FullViewModeEnum.Week)}
      >
        周
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(FullViewModeEnum.Month)}
      >
        月
      </button>
      <button
        className="Button"
        onClick={() => onViewModeChange(FullViewModeEnum.Year)}
      >
        年
      </button>
      {/* <button
        className="Button"
        onClick={() => onViewModeChange(ViewMode.QuarterYear)}
      >
        Year
      </button> */}
      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div>
    </div>
  )
}
