import React, { useMemo, useState } from 'react'
import { PageContainer } from '../../components/pageContainer'
import tableStyles from '../../styles/index.module.scss'
import { FlyTabs, IFlyTabs } from '@flyele/flyele-components'
import { message, Table } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import {
  OrderSystemApi,
  OrderSystemConst,
  OrderSystemType
} from '@flyele-nx/service'
import { useMount } from 'ahooks'
import styles from './index.module.scss'
import { ReactComponent as CopyIcon } from '../../../assets/copyIcon.svg'
import ClipboardJS from 'clipboard'
import cs from 'classnames'

const pageSize = 20

export const InvoiceManagement = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const [activeTab, setActiveTab] = useState<string>('pending')
  const [tableData, setTableData] = useState<OrderSystemType.IInvoiceList[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)

  /**
   * 请求发票列表
   */
  const fetchInvoiceList = async (
    options?: OrderSystemType.IInvoiceListParams
  ) => {
    const requestParams = options || { page_number: 1, page_record: pageSize }

    try {
      const params: OrderSystemType.IInvoiceListParams = {
        ...requestParams
      }
      const { code, data, total } = await OrderSystemApi.getInvoiceList(params)
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
        content: '获取发票列表失败'
      })
    }
  }

  const onChangePage = async (pagination: TablePaginationConfig) => {
    const { current } = pagination
    const params: OrderSystemType.IInvoiceListParams = { page_number: current }

    await fetchInvoiceList(params)
  }

  /**
   * 切换tab
   */
  const onChangeTab = async (key: string) => {
    setActiveTab(key)
    const params: OrderSystemType.IInvoiceListParams = { page_number: 1 }
    switch (key) {
      case 'pending':
        params.state = OrderSystemConst.InvoiceState.NOT_OPEN
        break
      case 'processed':
        params.state = OrderSystemConst.InvoiceState.OPEN
        break
      default:
        console.log('未能匹配')
    }
    await fetchInvoiceList(params)
  }

  /**
   * 复制
   */
  const onCopyTax = async (tax: string) => {
    console.log('onCopyTax', tax)
    const clipboard = new ClipboardJS('.copyIcon', {
      text: () => tax
    })
    clipboard.on('success', (e) => {
      console.log('复制成功')
      clipboard.destroy()
    })
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

  const columns: ColumnsType<OrderSystemType.IInvoiceList> = useMemo(() => {
    return [
      {
        width: 148,
        title: 'NO.',
        dataIndex: 'number'
      },
      {
        width: 108,
        title: '订单金额',
        dataIndex: 'total_price',
        render: (text) => <span className={styles.blueText}>{`¥${text}`}</span>
      },
      {
        width: 168,
        title: '公司税号名称',
        dataIndex: 'name',
        render: (text, record) => (
          <div className={cs(styles.nameBox, styles.blueText)}>
            <div>{text}</div>
            <div className={styles.taxNumberBox}>
              {record.company_tax_number}
              <div
                className={cs('copyIcon', styles.iconBox)}
                onClick={() => onCopyTax(record.company_tax_number)}
              >
                <CopyIcon width={10} height={10} />
              </div>
            </div>
          </div>
        )
      },
      {
        width: 188,
        title: '订单内容',
        dataIndex: 'indent_content'
      },
      {
        width: 188,
        title: '接收邮箱',
        dataIndex: 'email'
      },
      {
        width: 116,
        title: '开票用户',
        dataIndex: 'creator',
        render: (text, record) => (
          <div className={styles.nameBox}>
            <div>{text}</div>
            <div>{record.company_tax_number}</div>
          </div>
        )
      },
      {
        width: 168,
        title: '订单号',
        dataIndex: 'indent_num'
      },
      {
        width: 116,
        title: '操作',
        dataIndex: '',
        key: 'action',
        render: () => <div className={tableStyles.tableActionBtn}>确认开票</div>
      }
    ]
  }, [])

  useMount(async () => {
    await fetchInvoiceList({
      page_number: 1,
      state:
        activeTab === 'pending'
          ? OrderSystemConst.InvoiceState.NOT_OPEN
          : OrderSystemConst.InvoiceState.OPEN
    })
  })

  return (
    <PageContainer>
      {contextHolder}
      <div className={tableStyles.antdTable}>
        <div className={tableStyles.tableTabRow}>
          <div className={tableStyles.tabBox}>
            <FlyTabs tabs={tabs} active={activeTab} onChange={onChangeTab} />
          </div>
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
          onChange={(pagination) => onChangePage(pagination)}
        />
      </div>
    </PageContainer>
  )
}
