import { Skeleton } from 'antd'
import style from './index.module.scss'
import { SortableTab } from '@flyele-nx/ui'
import { useRequest } from 'ahooks'
import { CustomPanelValue } from '@flyele-nx/types'
import { useMemo, useState } from 'react'
import DefaultPanel from './components/default-panel'

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
  const { loading, data: tabs } = useRequest<CustomPanelValue[], any>(
    async () => {
      // TODO:  请求接口
      return []
    }
  )

  const memoTabs = useMemo(() => {
    if (tabs && tabs.length > 0) return tabs

    return defaultTabs
  }, [tabs])

  //   const hideAddTab = isValidVip && tabs.length === 10
  const hideAddTab = tabs?.length === 10

  const handleDragEnd = (changeTabs: CustomPanelValue[]) => {
    // if (memoTabs === defaultTabs) return // 默认tabs无需处理
    // const isChange = !isEqual(changeTabs, tabs)
    // if (!isChange) return
    // setTabs(changeTabs)
    // const oldTabs = tabs
    // CustomPanelApi.sortCustomPanel(changeTabs.map((item) => item.id))
    //   .then((_) => {
    //     // setTabs(tabs)
    //   })
    //   .catch(() => {
    //     // 恢复
    //     showMsg({
    //       msgType: '错误',
    //       content: '拖动排序失败',
    //     })
    //     setTabs(oldTabs)
    //   })
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
              //   setActiveTab(id)
            }}
            defaultActiveId={activeTab}
            moreActions={!hideAddTab}
            onAdd={onAdd}
            sortableElName={'board-custom-panel'}
          />
          <div className={style.content_box}>
            {memoTabs === defaultTabs && <DefaultPanel />}
            {/* {tabs.map((item) =>
              activeTab === item.id ? (
                <List
                  key={item.id}
                  show={activeTab === item.id}
                  id={item.id}
                  content={item.content || ''}
                  ref={(ref) => {
                    listRefs.current[item.id] = ref
                  }}
                />
              ) : null
            )} */}
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
