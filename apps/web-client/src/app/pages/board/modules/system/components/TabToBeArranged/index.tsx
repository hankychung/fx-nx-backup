import React, { FC, useCallback } from 'react'
// import createToolWin from 'utils/createSmallToolsWin'
import ToBeArrangedItem from '../../../../../../components/to-be-arranged-item'
import { IDashboardItem } from '@flyele-nx/types'

interface Props {
  item: IDashboardItem
}

export const Item: FC<React.PropsWithChildren<Props>> = ({ item }) => {
  const handleClick = useCallback(() => {
    // TODO: createToolWin
    console.log('createToolWin')
    // createToolWin({
    //   ref_id: item.task_id,
    //   matter_type: item.matter_type,
    //   cycle: item?.cycle,
    //   from: '今日看板'
    // })
  }, [])

  return <ToBeArrangedItem item={item} handleClick={handleClick} />
}
