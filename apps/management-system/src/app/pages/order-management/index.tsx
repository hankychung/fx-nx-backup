import React, { useMemo, useState } from 'react'
import { IDataShow, PageContainer } from '../../components/pageContainer'
import { PageSearch } from '../../components/pageSearch'
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
        render: (text, record) => <span>{record.creator.user_name}</span>
      },
      {
        width: 168,
        title: '充值对象',
        dataIndex: 'users',
        render: (text, record) => <span>{record.users.user_name}</span>
      },
      {
        width: 148,
        title: '订单号',
        dataIndex: 'indent_num'
      },
      {
        width: 92,
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
        width: 110,
        title: '支付时间',
        dataIndex: 'payment_at'
      },
      {
        width: 100,
        title: '操作',
        dataIndex: '',
        key: 'action',
        render: () => (
          <span className={tableStyles.tableActionText}>订单详情</span>
        )
      }
    ]
  }, [])

  const [activeTab, setActiveTab] = useState<string>('all')
  const [tableData, setTableData] = useState<OrderSystemType.IIndentList[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [indentAnalysis, setIndentAnalysis] =
    useState<OrderSystemType.IIndentAnalysis>({
      today_indent: {
        amount: 0,
        count: 0
      },
      total_indent: {
        amount: 0,
        count: 0
      },
      month_indent: {
        amount: 0,
        count: 0
      },
      member: {
        personal_count: 0,
        team_count: 0
      }
    })

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
   * 请求订单统计数据
   */
  const fetchIndentAnalysis = async () => {
    try {
      const { code, data } = await OrderSystemApi.getIndentAnalysis()
      if (code === 0) {
        setIndentAnalysis(data)
      }
    } catch (e) {
      messageApi.open({
        type: 'error',
        content: '获取订单统计数据失败'
      })
    }
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

  const dataArray: IDataShow[] = useMemo(() => {
    const { today_indent, month_indent, total_indent, member } = indentAnalysis
    return [
      {
        key: 'today',
        title: '今日订单',
        value: today_indent.amount,
        subTitle: `${today_indent.count}个`,
        unitType: 'money'
      },
      {
        key: 'month',
        title: '本月订单',
        value: month_indent.amount,
        subTitle: `${month_indent.count}个`,
        unitType: 'money'
      },
      {
        key: 'all',
        title: '累计订单',
        value: total_indent.amount,
        subTitle: `${total_indent.count}个`,
        unitType: 'money'
      },
      {
        key: 'personal',
        title: '个人会员数量',
        value: member.personal_count,
        unitType: 'person'
      },
      {
        key: 'team',
        title: '团队会员数量',
        value: member.team_count,
        unitType: 'person'
      }
    ]
  }, [indentAnalysis])

  useMount(async () => {
    await fetchIndentAnalysis()
    await fetchIndentList({ page_number: 1 })
  })

  return (
    <PageContainer dataArray={dataArray}>
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
          scroll={{ y: '55vh', x: true }}
          onChange={(pagination, filters) => onChangePage(pagination, filters)}
        />
      </div>
    </PageContainer>
  )
}
