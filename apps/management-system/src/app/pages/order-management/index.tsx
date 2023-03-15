import React, { useMemo, useState } from 'react'
import { IDataShow, PageContainer } from '../../components/pageContainer'
import { PageSearch } from '../../components/pageSearch'
import tableStyles from '../../styles/index.module.scss'
import { FlyButton, FlyTabs, IFlyTabs } from '@flyele/flyele-components'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

export const OrderManagement = () => {
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
      key: 'company',
      title: '企业版订单'
    }
  ]
  const searchItems = [
    {
      key: 'user',
      title: '查找用户'
    },
    {
      key: 'company',
      title: '查找公司（企业）'
    },
    {
      key: 'order',
      title: '查找订单'
    }
  ]
  const columns: ColumnsType<DataType> = [
    {
      width: 192,
      title: '订单内容',
      dataIndex: 'name'
    },
    {
      width: 100,
      title: '订单金额',
      dataIndex: 'age'
    },
    {
      width: 108,
      title: '付款人',
      dataIndex: 'people'
    },
    {
      width: 168,
      title: '充值对象',
      dataIndex: 'aaa'
    },
    {
      width: 148,
      title: '订单号',
      dataIndex: 'order'
    },
    {
      width: 92,
      title: '订单渠道',
      dataIndex: 'address'
    },
    {
      width: 102,
      title: '支付方式',
      dataIndex: 'type'
    },
    {
      width: 108,
      title: '支付状态',
      dataIndex: 'state'
    },
    {
      width: 110,
      title: '支付时间',
      dataIndex: 'time'
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

  const [activeTab, setActiveTab] = useState<string>('all')
  const [tableData, setTableData] = useState<DataType[]>([
    {
      key: '122',
      name: '111',
      age: 1,
      address: '2222'
    },
    {
      key: '233',
      name: '222',
      age: 2,
      address: '3333'
    }
  ])

  /**
   * 切换tab
   */
  const onChangeTab = (key: string) => {
    setActiveTab(key)
    // TODO 请求列表
  }

  /**
   * 搜索表格
   */
  const onSearch = (key: string, value: string) => {
    if (!value) return

    switch (key) {
      case 'user':
        console.log('搜索用户', value)
        break
      case 'company':
        console.log('搜索公司', value)
        break
      case 'order':
        console.log('搜索订单', value)
        break
      default:
        break
    }
  }

  /**
   * 导出订单
   */
  const exportOrder = () => {
    console.log('导出')
  }

  const dataArray: IDataShow[] = useMemo(() => {
    return [
      {
        key: 'today',
        title: '今日订单',
        value: '2840',
        subTitle: '14个',
        unitType: 'money'
      },
      {
        key: 'month',
        title: '本月订单',
        value: '425069',
        subTitle: '307个',
        unitType: 'money'
      },
      {
        key: 'all',
        title: '累计订单',
        value: '4250690',
        subTitle: '3075个',
        unitType: 'money'
      },
      {
        key: 'personal',
        title: '个人会员数量',
        value: '425069',
        unitType: 'person'
      },
      {
        key: 'team',
        title: '团队会员数量',
        value: '425069',
        unitType: 'person'
      }
    ]
  }, [])

  return (
    <PageContainer dataArray={dataArray}>
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
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 15, showQuickJumper: true }}
        />
      </div>
    </PageContainer>
  )
}
