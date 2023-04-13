import React, { useEffect, useMemo, useRef, useState } from 'react'
import { PageSearch } from '../../components/page-search'
import tableStyles from '../../styles/index.module.scss'
import {
  FlyButton,
  FlyTabs,
  IFlyTabs,
  FlyStringHighLight,
  FlyTextTooltip
} from '@flyele/flyele-components'
import { Table, message } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, ColumnFilterItem } from 'antd/es/table/interface'
import { useMemoizedFn, useMount } from 'ahooks'
import { ReactComponent as TableFilter } from '../../../assets/tableFilter.svg'
import { ReactComponent as ArrowLeft } from '../../../assets/arrow-left.svg'
import {
  OrderSystemApi,
  OrderSystemType,
  OrderSystemConst
} from '@flyele-nx/service'
import styles from './index.module.scss'
import { PersonalDetailModal } from './components/personal-detail-modal'
import { OrderDetailModal } from './components/order-detail-modal'
import dayjs from 'dayjs'
import { OrderListExport } from './components/order-list-export'
import { downloadUrl } from '@flyele-nx/utils'
import { useSearchListType } from '../home'

const pageSize = 20

const _OrderManagement = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { searchType, setSearchType } = useSearchListType()

  const tabs: IFlyTabs[] = [
    {
      key: 'all',
      title: '全部订单'
    },
    {
      key: 'today',
      title: '今日订单'
    },
    {
      key: 'month',
      title: '本月订单'
    },
    {
      key: 'personal',
      title: '个人版订单'
    },
    {
      key: 'corp',
      title: '企业版订单'
    }
  ]
  const searchItems = [
    {
      key: 'user',
      title: '查找用户'
    },
    {
      key: 'corp',
      title: '查找公司（企业）'
    },
    {
      key: 'order',
      title: '查找订单'
    }
  ]

  const afterSearch = useRef(false)

  const tempParams = useRef<OrderSystemType.IIndentListParams | null>(null)

  const [activeTab, setActiveTab] = useState<string>('all')
  const [tableData, setTableData] = useState<OrderSystemType.IIndentList[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [filteredState, setFilteredState] = useState<string[] | null>(null)

  const [searchValue, setSearchValue] = useState<string>('')
  const [searchHighlight, setSearchHighlight] = useState<string>('')

  const [openPersonalModal, setOpenPersonalModal] = useState(false)
  const [openOrderModal, setOpenOrderModal] = useState(false)
  const [openExportModal, setOpenExportModal] = useState(false)
  const [openUserId, setOpenUserId] = useState<string>('')
  const [openModalData, setOpenModalData] =
    useState<OrderSystemType.IIndentList | null>(null)

  /**
   * 切换tab
   */
  const onChangeTab = useMemoizedFn(
    async (
      key: string,
      otherParams?: OrderSystemType.IIndentListParams | null
    ) => {
      setActiveTab(key)
      const params: OrderSystemType.IIndentListParams = {}
      switch (key) {
        case 'today':
          params.time_type = OrderSystemConst.IndentTimeType.TODAY
          break
        case 'month':
          params.time_type = OrderSystemConst.IndentTimeType.MONTH
          break
        case 'personal':
          params.indent_member_type = OrderSystemConst.IndentMemberType.PERSONAL
          break
        case 'corp':
          params.indent_member_type = OrderSystemConst.IndentMemberType.CORP
          break
        default:
        // console.log('all')
      }
      tempParams.current = otherParams ? otherParams : null
      await fetchIndentList({ page_number: 1, ...params })
    }
  )

  /**
   * 请求订单列表
   */
  const fetchIndentList = async (
    options?: OrderSystemType.IIndentListParams
  ) => {
    const requestParams = options || { page_number: 1, page_record: pageSize }
    tempParams.current = {
      ...tempParams.current,
      ...requestParams
    }

    try {
      const params: OrderSystemType.IIndentListParams = {
        ...tempParams.current
      }
      const { code, data, total } = await OrderSystemApi.getIndentList(params)
      if (code === 0 && data) {
        setTableData(data)
        if (total) setTableTotal(total)
        if (params.user_keyword && data.length) {
          const findUser = data.find(
            (item) => item.creator.user_id === params.user_keyword
          )
          if (findUser) {
            setSearchHighlight(findUser.creator.user_name)
          }
        }
      } else {
        setTableData([])
        setTableTotal(0)
      }
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: '获取订单列表失败'
      })
    }
  }

  const onChangePage = async (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>
  ) => {
    const { current } = pagination
    const { state } = filter
    const params: OrderSystemType.IIndentListParams = { page_number: current }

    if (state && state.length) {
      params.state = state.join(',')
      setFilteredState(state as string[])
    } else {
      if (tempParams.current && tempParams.current.state) {
        delete tempParams.current.state
      }
      setFilteredState(null)
    }
    await fetchIndentList(params)
  }

  /**
   * 根据订单号 搜索一条信息
   * 并打开对应详情
   */
  const fetchIndentAndOpen = async (id: string) => {
    try {
      const { code, data } = await OrderSystemApi.getIndentList({
        page_number: 1,
        indent_num: id
      })

      if (code === 0 && data.length) {
        showOrderModal(data[0])
      } else {
        messageApi.open({
          type: 'error',
          content: '未找到订单'
        })
      }
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: '未找到订单'
      })
    }
  }

  /**
   * 搜索表格
   */
  const onSearch = useMemoizedFn(async (key: string, value: string) => {
    if (!value) {
      if (afterSearch.current) {
        switch (key) {
          case 'order':
            break
          default:
            setSearchValue('')
            setSearchHighlight('')
            tempParams.current = null
            await fetchIndentList({ page_number: 1 })
        }
        afterSearch.current = false
      }
      return
    }

    const params: OrderSystemType.IIndentListParams = {}
    afterSearch.current = true

    switch (key) {
      case 'user':
        tempParams.current = null
        params.user_keyword = value
        setSearchValue(value)
        await fetchIndentList({ page_number: 1, ...params })
        break
      case 'corp':
        tempParams.current = null
        params.corp_keyword = value
        setSearchValue(value)
        await fetchIndentList({ page_number: 1, ...params })
        break
      case 'order':
        await fetchIndentAndOpen(value)
        break
      default:
        break
    }
  })

  /**
   * 清空搜索
   */
  const clearSearch = async () => {
    setSearchValue('')
    setSearchHighlight('')
    tempParams.current = null
    afterSearch.current = false
    await onChangeTab('all')
  }

  /**
   * 导出订单列表
   */
  const onExport = useMemoizedFn(
    async (
      type: OrderSystemConst.ExportTime,
      timeData?: { startDate: number; endDate: number }
    ) => {
      messageApi.open({
        type: 'loading',
        content: '生成中，请稍后',
        duration: 0
      })

      const params: OrderSystemType.IExportIndentList = {
        time_type: type
      }
      if (type === 'custom' && timeData) {
        params.start_time = timeData.startDate
        params.end_time = timeData.endDate
      }

      const { code, data } = await OrderSystemApi.exportIndentList(params)
      if (code === 0) {
        downloadUrl(data)
        messageApi.destroy()
      } else {
        messageApi.destroy()
        messageApi.open({
          type: 'error',
          content: '导出错误'
        })
      }
    }
  )

  /**
   * 打开导出订单弹窗
   */
  const exportOrder = useMemoizedFn(async () => {
    if (activeTab === 'today' || activeTab === 'month') {
      await onExport(activeTab)
    } else {
      setOpenExportModal(true)
    }
  })

  /**
   * 打开个人详情弹窗
   */
  const openPersonalDetails = (
    item: OrderSystemType.IIndentList,
    userId: string
  ) => {
    setOpenModalData(item)
    setOpenUserId(userId)
    setOpenPersonalModal(true)
  }

  /**
   * 打开订单详情弹窗
   */
  const showOrderModal = (item: OrderSystemType.IIndentList) => {
    setOpenModalData(item)
    setOpenOrderModal(true)
  }

  /**
   * 根据对应的人id/企业id查询列表
   */
  const getMemberOrderList = async (
    item: OrderSystemType.IIndentList | null
  ) => {
    if (item) {
      setOpenPersonalModal(false)
      if (
        item.indent_member_type === OrderSystemConst.IndentListMemberType.CORP
      ) {
        if (item.corporation) {
          await onSearch('corp', item.corporation.corporation_id)
        } else {
          messageApi.open({
            type: 'error',
            content: '缺少企业id'
          })
        }
      } else {
        await onSearch('user', item.creator.user_id)
      }
    }
  }

  /**
   * 关闭弹窗并搜索
   */
  const closeAndSearch = useMemoizedFn(async () => {
    setOpenOrderModal(false)
    if (openModalData) {
      await onSearch('user', openModalData.creator.user_id)
    }
  })

  /**
   * 根据外部左侧的点击事件传入的类型请求接口
   */
  const fetchListOnType = useMemoizedFn(async (type: string) => {
    setSearchValue('')
    setSearchHighlight('')
    tempParams.current = null
    afterSearch.current = false
    const state = OrderSystemConst.IndentState.SUCCESS.toString()
    setFilteredState([state])
    await onChangeTab(type, { state })
  })

  const isSearch = useMemo(() => {
    return !!searchValue
  }, [searchValue])

  const columns: ColumnsType<OrderSystemType.IIndentList> = useMemo(() => {
    const stateFilter = () => {
      const arr: ColumnFilterItem[] = []
      for (const key in OrderSystemConst.IndentStateLabel) {
        const item = OrderSystemConst.IndentStateLabel[key]
        arr.push({
          text: item,
          value: key
        })
      }
      return arr
    }

    return [
      {
        width: 192,
        title: '订单内容',
        dataIndex: 'indent_content'
      },
      {
        width: 100,
        title: '订单金额',
        dataIndex: 'total_price',
        render: (text) => {
          return <span>{(text / 100).toFixed(2)}</span>
        }
      },
      {
        width: 108,
        title: '付款人',
        dataIndex: 'creator',
        render: (text, record) => {
          const name = `${record.creator.user_name}${
            record.creator.user_type === OrderSystemConst.UserType.CORP
              ? '（企）'
              : ''
          }`
          return (
            <div
              className={styles.tableLink}
              onClick={() =>
                openPersonalDetails(record, record.creator.user_id)
              }
            >
              <FlyTextTooltip
                isDynamic
                text={() => {
                  return (
                    <FlyStringHighLight
                      keyword={searchHighlight || searchValue || ''}
                      text={name}
                    />
                  )
                }}
              />
            </div>
          )
        }
      },
      {
        width: 168,
        title: '充值对象',
        dataIndex: 'users',
        render: (text, record) => {
          const isCorp =
            record.indent_member_type ===
            OrderSystemConst.IndentListMemberType.CORP
          const nameArr = record.users.map((user) => user.user_name)
          let nameStr = nameArr.join('，')

          if (isCorp && record.corporation) {
            nameStr = record.corporation.corporation_name || ''
          }

          return (
            <div
              style={{ width: '168px' }}
              className={styles.tableLink}
              onClick={() => {
                const usersLength = record.users.length
                if (usersLength === 0 && isCorp) {
                  openPersonalDetails(record, '')
                } else if (usersLength === 1) {
                  openPersonalDetails(record, record.users[0].user_id)
                } else {
                  showOrderModal(record)
                }
              }}
            >
              <FlyTextTooltip
                isDynamic
                text={() => {
                  return (
                    <FlyStringHighLight
                      keyword={searchHighlight || searchValue || ''}
                      text={nameStr}
                    />
                  )
                }}
              />
            </div>
          )
        }
      },
      {
        width: 148,
        title: '订单号',
        dataIndex: 'indent_num'
      },
      {
        width: 100,
        title: '订单渠道',
        dataIndex: 'origin_route'
      },
      {
        width: 102,
        title: '支付方式',
        dataIndex: 'order_method',
        render: (text, record) =>
          record.state === OrderSystemConst.IndentState.SUCCESS ? (
            <span>{OrderSystemConst.OrderMethodLabel[text]}</span>
          ) : (
            <span />
          )
      },
      {
        width: 120,
        title: '支付状态',
        dataIndex: 'state',
        render: (text) => (
          <span>{OrderSystemConst.IndentStateLabel[text]}</span>
        ),
        filters: stateFilter(),
        filteredValue: filteredState || null,
        filterIcon: (filtered) => {
          return <TableFilter color={filtered ? '#1dd2c1' : '#ACB0B4'} />
        }
      },
      {
        width: 130,
        title: '支付时间',
        dataIndex: 'payment_at',
        render: (text) => (
          <span>
            {text !== 0 ? dayjs.unix(text).format('YYYY年M月D日 HH:mm:ss') : ''}
          </span>
        )
      },
      {
        width: 100,
        title: '操作',
        dataIndex: '',
        key: 'action',
        render: (text, record) => (
          <span
            className={tableStyles.tableActionText}
            onClick={() => showOrderModal(record)}
          >
            订单详情
          </span>
        )
      }
    ]
  }, [searchHighlight, searchValue, filteredState])

  useMount(async () => {
    tempParams.current = null
    await fetchIndentList({ page_number: 1 })
  })

  useEffect(() => {
    if (searchType) {
      fetchListOnType(searchType)
      setSearchType('')
    }
  }, [fetchListOnType, searchType, setSearchType])

  return (
    <div>
      {contextHolder}
      <div className={tableStyles.antdTable}>
        <PageSearch searchItems={searchItems} onSearch={onSearch} />
        <div className={tableStyles.tableTabRow}>
          <div className={tableStyles.tabBox}>
            {isSearch ? (
              <div className={styles.backBox} onClick={clearSearch}>
                <ArrowLeft width={16} height={16} color="#060606" />
                <span>返回</span>
              </div>
            ) : (
              <FlyTabs tabs={tabs} active={activeTab} onChange={onChangeTab} />
            )}
          </div>
          <FlyButton theme="primary" onClick={exportOrder}>
            导出订单
          </FlyButton>
        </div>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tableData}
          pagination={{
            pageSize: pageSize,
            total: tableTotal,
            showQuickJumper: true,
            showSizeChanger: false
          }}
          scroll={{ y: '27vw', x: 'max-content' }}
          onChange={(pagination, filters) => onChangePage(pagination, filters)}
        />
      </div>

      <PersonalDetailModal
        open={openPersonalModal}
        data={openModalData}
        userId={openUserId}
        showOrder={(data) => getMemberOrderList(data)}
        onClose={() => setOpenPersonalModal(false)}
      />

      <OrderDetailModal
        open={openOrderModal}
        data={openModalData}
        onClickName={closeAndSearch}
        onClose={() => setOpenOrderModal(false)}
      />

      <OrderListExport
        open={openExportModal}
        onExport={(startDate, endDate) =>
          onExport('custom', { startDate: startDate, endDate: endDate })
        }
        onClose={() => setOpenExportModal(false)}
      />
    </div>
  )
}

export const OrderManagement = React.memo(_OrderManagement)
