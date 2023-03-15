import React, { useMemo, useState } from 'react'
import { IDataShow, PageContainer } from '../../components/pageContainer'
import tableStyles from '../../styles/index.module.scss'
import { FlyTabs, IFlyTabs } from '@flyele/flyele-components'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

export const InvoiceManagement = () => {
  const columns: ColumnsType<DataType> = [
    {
      width: 148,
      title: 'NO.',
      dataIndex: 'name'
    },
    {
      width: 108,
      title: '订单金额',
      dataIndex: 'age'
    },
    {
      width: 168,
      title: '公司税号名称',
      dataIndex: 'people'
    },
    {
      width: 188,
      title: '订单内容',
      dataIndex: 'aaa'
    },
    {
      width: 188,
      title: '接收邮箱',
      dataIndex: 'order'
    },
    {
      width: 116,
      title: '开票用户',
      dataIndex: 'address'
    },
    {
      width: 168,
      title: '订单号',
      dataIndex: 'type'
    },
    {
      width: 116,
      title: '操作',
      dataIndex: '',
      key: 'action',
      render: () => <div className={tableStyles.tableActionBtn}>确认开票</div>
    }
  ]

  const [activeTab, setActiveTab] = useState<string>('pending')
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

  const tabs: IFlyTabs[] = useMemo(() => {
    return [
      {
        key: 'pending',
        title: '待处理发票'
      },
      {
        key: 'processed',
        title: '已处理发票'
      }
    ]
  }, [])

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
        <div className={tableStyles.tableTabRow}>
          <div className={tableStyles.tabBox}>
            <FlyTabs tabs={tabs} active={activeTab} onChange={onChangeTab} />
          </div>
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
