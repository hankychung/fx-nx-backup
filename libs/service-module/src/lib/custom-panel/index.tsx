import { Skeleton } from 'antd'
import style from './index.module.scss'
import { SortableTab } from '@flyele-nx/ui'
import { useRequest } from 'ahooks'
import { CustomPanelValue } from '@flyele-nx/types'
import { useMemo, useState } from 'react'
import DefaultPanel from './components/default-panel'
import { LabelApi } from '@flyele-nx/service'
import { isEqual } from 'lodash'
import { globalNxController } from '@flyele-nx/global-processor'
import { List } from './components/list'

export const boardCustomPanelId = 'board-custom-panel'
const defaultId = '1111111'
const defaultTabs: CustomPanelValue[] = [
  {
    id: defaultId,
    text: '自定义看板'
  }
]

export const CustomPanel = () => {
  const [activeTab, setActiveTab] = useState(defaultId)
  const { showMsg } = globalNxController
  const { loading, data: tabs } = useRequest(async () => {
    const res = await LabelApi.getCustomPanelList()
    setActiveTab(res.data[0].id)
    return res.data.map((item) => {
      return {
        id: item.id,
        content: item.content,
        text: item.title
      }
    })
  })

  const memoTabs = useMemo(() => {
    if (tabs && tabs.length > 0) return tabs

    return defaultTabs
  }, [tabs])

  //   const hideAddTab = isValidVip && tabs.length === 10
  const hideAddTab = tabs?.length === 10

  const handleDragEnd = (changeTabs: CustomPanelValue[]) => {
    if (memoTabs === defaultTabs) return // 默认tabs无需处理
    const isChange = !isEqual(changeTabs, tabs)
    if (!isChange) return
    LabelApi.sortCustomPanel(changeTabs.map((item) => item.id)).catch(() => {
      // 恢复
      showMsg({
        msgType: '错误',
        content: '拖动排序失败'
      })
    })
  }

  const onAdd = () => {
    // 非会员，已经存在一个视图，点击的时候出提示
    // if (tabs.length === 1 && tabs[0].id !== defaultId && !isValidVip) {
    //   lureTool.open('maxCustomView', {
    //     senParams: {
    //       touch_rule: '个人-自定义视图',
    //       page_name: '任务-日-视图',
    //       box_title: '自定义视图数量',
    //     },
    //   })
    //   return
    // }
    // SEN__click_page_element({
    //   page_name: '任务-日',
    //   click_page_elements: '创建自定义看板+',
    // })
    // setShowPanel(true)
  }

  return (
    <>
      <Skeleton loading={loading}>
        <div className={style.wrap} id={boardCustomPanelId}>
          <SortableTab
            isCustomTabStyle
            tabs={memoTabs as Omit<CustomPanelValue, 'content'>[]}
            handleDragEnd={handleDragEnd}
            handleClickTab={(id) => {
              setActiveTab(id)
            }}
            defaultActiveId={activeTab}
            moreActions={!hideAddTab}
            onAdd={onAdd}
            sortableElName={'board_custom_panel'}
          />
          <div className={style.content_box}>
            {memoTabs === defaultTabs && <DefaultPanel />}
            {(tabs ?? []).map((item) =>
              activeTab === item.id ? (
                <List key={item.id} tabId={item.id} />
              ) : null
            )}
          </div>
        </div>
      </Skeleton>
      {/*每次都重新渲染，否则需要手动控制数据*/}
      {/* {showPanel && (
        <EditPanel
          show={showPanel}
          onCancel={() => {
            setEditId('')
            setShowPanel(false)
          }}
          onConfirm={onConfirm}
          id={editId}
        />
      )} */}
    </>
  )
}
