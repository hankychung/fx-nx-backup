import React, { useMemo, useRef, useState } from 'react'
import tableStyles from '../../styles/index.module.scss'
import { FlyTabs, IFlyTabs } from '@flyele/flyele-components'
import { message, Table } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import {
  OrderSystemApi,
  OrderSystemConst,
  OrderSystemType
} from '@flyele-nx/service'
import { useMemoizedFn, useMount } from 'ahooks'
import styles from './index.module.scss'
import { ReactComponent as CopyIcon } from '../../../assets/copyIcon.svg'
import ClipboardJS from 'clipboard'
import cs from 'classnames'
import { OpenTaxModal } from './components/open-tax-modal'
import dayjs from 'dayjs'
import { useInvoiceStore } from '../../store/invoice'

const pageSize = 10

export const InvoiceManagement = () => {
  const invoiceStore = useInvoiceStore()
  const [messageApi, contextHolder] = message.useMessage()

  const tempParams = useRef<OrderSystemType.IInvoiceListParams | null>(null)

  const [activeTab, setActiveTab] = useState<string>('pending')
  const [tableData, setTableData] = useState<OrderSystemType.IInvoiceList[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)

  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] =
    useState<OrderSystemType.IInvoiceList | null>(null)

  /**
   * 请求发票列表
   */
  const fetchInvoiceList = async (
    options?: OrderSystemType.IInvoiceListParams
  ) => {
    const requestParams = options || { page_number: 1, page_record: pageSize }
    tempParams.current = {
      page_record: pageSize,
      ...tempParams.current,
      ...requestParams
    }

    try {
      const params: OrderSystemType.IInvoiceListParams = {
        ...tempParams.current
      }
      const { code, data, total } = await OrderSystemApi.getInvoiceList(params)
      if (code === 0 && data) {
        setTableData(data)
        if (total) {
          setTableTotal(total)
          if (
            tempParams.current.state === OrderSystemConst.InvoiceState.NOT_OPEN
          ) {
            invoiceStore.updateNotOpenTotal(total)
          }
        }
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

  /**
   * init
   */
  const initList = async () => {
    tempParams.current = null
    await fetchInvoiceList({
      page_number: 1,
      state:
        activeTab === 'pending'
          ? OrderSystemConst.InvoiceState.NOT_OPEN
          : OrderSystemConst.InvoiceState.OPEN
    })
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
    tempParams.current = null
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
  const onCopyTax = useMemoizedFn(async (tax: string) => {
    const clipboard = new ClipboardJS('.copyIcon', {
      text: () => tax
    })
    clipboard.on('success', (e) => {
      messageApi.open({
        type: 'success',
        content: '复制成功'
      })
      clipboard.destroy()
    })
  })

  /**
   * 打开开具发票弹窗
   */
  const openTax = async (item: OrderSystemType.IInvoiceList) => {
    setModalData(item)
    setOpenModal(true)
  }

  /**
   * 开具发票成功后
   */
  const onFinish = async () => {
    setOpenModal(false)
    messageApi.open({
      type: 'success',
      content: '已确认开票'
    })
    await initList()
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
        dataIndex: 'number',
        align: 'center'
      },
      {
        width: 108,
        title: '订单金额',
        dataIndex: 'total_price',
        align: 'center',
        render: (text) => <span className={styles.blueText}>{`¥${text}`}</span>
      },
      {
        width: 168,
        title: '公司税号名称',
        dataIndex: 'name',
        align: 'center',
        render: (text, record) => (
          <div className={cs(styles.nameBox, styles.blueText)}>
            <div>{text}</div>
            {record.company_tax_number && (
              <div className={styles.taxNumberBox}>
                {record.company_tax_number}
                <div
                  className={cs('copyIcon', styles.iconBox)}
                  onClick={() => onCopyTax(record.company_tax_number)}
                >
                  <CopyIcon width={10} height={10} />
                </div>
              </div>
            )}
          </div>
        )
      },
      {
        width: 188,
        title: '订单内容',
        dataIndex: 'indent_content',
        align: 'center'
      },
      {
        width: 188,
        title: '接收邮箱',
        dataIndex: 'email',
        align: 'center'
      },
      {
        width: 116,
        title: '开票用户',
        dataIndex: 'creator',
        align: 'center',
        render: (text, record) => (
          <div className={styles.nameBox}>
            <div>{record.creator.user_name}</div>
            <div>{record.creator.telephone}</div>
          </div>
        )
      },
      {
        width: 168,
        title: '订单号',
        dataIndex: 'indent_num',
        align: 'center'
      },
      {
        width: 208,
        title: '操作',
        dataIndex: '',
        key: 'action',
        align: 'center',
        render: (text, record) => {
          if (record.state === OrderSystemConst.InvoiceState.NOT_OPEN) {
            return (
              <div
                className={tableStyles.tableActionBtn}
                onClick={() => openTax(record)}
              >
                确认开票
              </div>
            )
          } else {
            return (
              <div className={styles.finishTime}>{`${dayjs
                .unix(record.finish_at)
                .format('YYYY年M月D日 HH:mm')} 已开票`}</div>
            )
          }
        }
      }
    ]
  }, [onCopyTax])

  useMount(async () => {
    await initList()
  })

  return (
    <div>
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
          scroll={{ y: '27vw', x: 'max-content' }}
          onChange={(pagination) => onChangePage(pagination)}
        />
      </div>

      <OpenTaxModal
        open={openModal}
        data={modalData}
        onFinish={onFinish}
        onClose={() => setOpenModal(false)}
      />
    </div>
  )
}
