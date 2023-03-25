import React, { useMemo, useState } from 'react'
import { PageContainer } from '../../components/page-container'
import { PageSearch } from '../../components/page-search'
import tableStyles from '../../styles/index.module.scss'
import { FlyButton, FlyTabs, IFlyTabs } from '@flyele/flyele-components'
import { Table, message } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FilterValue, ColumnFilterItem } from 'antd/es/table/interface'
import { useMount } from 'ahooks'
import { ReactComponent as TableFilter } from '../../../assets/tableFilter.svg'
import {
  OrderSystemApi,
  OrderSystemType,
  OrderSystemConst
} from '@flyele-nx/service'
import styles from './index.module.scss'
import { PersonalDetailModal } from './components/personal-detail-modal'
import { OrderDetailModal } from './components/order-detail-modal'
import dayjs from 'dayjs'

const pageSize = 20

export const OrderManagement = () => {
  const [messageApi, contextHolder] = message.useMessage()

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

  const [activeTab, setActiveTab] = useState<string>('all')
  const [tableData, setTableData] = useState<OrderSystemType.IIndentList[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)

  const [openPersonalModal, setOpenPersonalModal] = useState(false)
  const [openOrderModal, setOpenOrderModal] = useState(false)
  const [openModalData, setOpenModalData] =
    useState<OrderSystemType.IIndentList | null>(null)

  /**
   * 切换tab
   */
  const onChangeTab = async (key: string) => {
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
        console.log('没匹配')
    }
    await fetchIndentList({ page_number: 1, ...params })
  }

  /**
   * 请求订单列表
   */
  const fetchIndentList = async (
    options?: OrderSystemType.IIndentListParams
  ) => {
    const requestParams = options || { page_number: 1, page_record: pageSize }

    try {
      const params: OrderSystemType.IIndentListParams = {
        ...requestParams
      }
      const { code, data, total } = await OrderSystemApi.getIndentList(params)
      if (code === 0 && data) {
        setTableData(data)
        if (total) setTableTotal(total)
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
    }
    await fetchIndentList(params)
  }

  /**
   * 搜索表格
   */
  const onSearch = async (key: string, value: string) => {
    if (!value) return

    const params: OrderSystemType.IIndentListParams = {}
    switch (key) {
      case 'user':
        params.user_keyword = value
        break
      case 'corp':
        params.corp_keyword = value
        break
      case 'order':
        params.indent_num = value
        break
      default:
        break
    }
    await fetchIndentList({ page_number: 1, ...params })
  }

  /**
   * 导出订单
   */
  const exportOrder = () => {
    console.log('导出')
  }

  /**
   * 打开个人详情弹窗
   */
  const openPersonalDetails = (item: OrderSystemType.IIndentList) => {
    setOpenModalData(item)
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
   * 个人打开订单详情
   */
  const gotoOrderDetails = (item: OrderSystemType.IIndentList | null) => {
    if (item) {
      setOpenPersonalModal(false)
      showOrderModal(item)
    }
  }

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
        dataIndex: 'total_price'
      },
      {
        width: 108,
        title: '付款人',
        dataIndex: 'creator',
        render: (text, record) => (
          <span
            className={styles.tableLink}
            onClick={() => openPersonalDetails(record)}
          >
            {record.creator.user_name}
          </span>
        )
      },
      {
        width: 168,
        title: '充值对象',
        dataIndex: 'users',
        render: (text, record) => {
          const nameArr = record.users.map((user) => user.user_name)
          const nameStr = nameArr.join('，')
          return (
            <span
              className={styles.tableLink}
              onClick={() => openPersonalDetails(record)}
            >
              {nameStr}
            </span>
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
            {text !== 0 ? dayjs.unix(text).format('YYYY年M月D日 hh:mm:ss') : ''}
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
  }, [])

  useMount(async () => {
    await fetchIndentList({ page_number: 1 })
  })

  return (
    <PageContainer>
      {contextHolder}
      <div className={tableStyles.antdTable}>
        <PageSearch searchItems={searchItems} onSearch={onSearch} />
        <div className={tableStyles.tableTabRow}>
          <div className={tableStyles.tabBox}>
            <FlyTabs tabs={tabs} active={activeTab} onChange={onChangeTab} />
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
        showOrder={(data) => gotoOrderDetails(data)}
        onClose={() => setOpenPersonalModal(false)}
      />

      <OrderDetailModal
        open={openOrderModal}
        data={openModalData}
        onClickName={() => console.log('搜索人')}
        onClose={() => setOpenOrderModal(false)}
      />
    </PageContainer>
  )
}
