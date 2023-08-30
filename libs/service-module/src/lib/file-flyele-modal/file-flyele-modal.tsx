import { Close } from '@flyele-nx/icon'
import style from './file-flyele-modal.module.scss'
import { Source } from './components/source'
import { Target } from './components/target'
import { useRef, useState } from 'react'
import { diskApi } from '@flyele-nx/service'
import { useInfiniteScroll } from 'ahooks'
import { FlyDoc } from '@flyele-nx/types'
import { Button } from 'antd'

interface IProps {
  close?: () => void
  onConfirm?: (result: FlyDoc[]) => void
}

export const FileFlyeleModal = (props: IProps) => {
  const { close, onConfirm } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<FlyDoc[]>([])

  const { data } = useInfiniteScroll<{
    list: FlyDoc[]
    hasNextPage: boolean
    page: number
  }>(
    async (d) => {
      const page = d ? d.page + 1 : 1
      const res = await diskApi.getStorage({
        page
      })

      const hasNextPage = !!res.data.length
      return {
        list: res.data,
        hasNextPage,
        page: page
      }
    },
    {
      target: containerRef,
      isNoMore: (d) => {
        return !d?.hasNextPage
      }
    }
  )

  // 添加
  const handlerCheck = (item: FlyDoc) => {
    const has = target.find((i) => i.file_id === item.file_id)
    if (has) return
    setTarget([...target, item])
  }

  // 删除
  const onDel = (item: FlyDoc) => {
    setTarget(target.filter((i) => i.file_id !== item.file_id))
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.title}>选择飞项文档</div>
        <Close className={style.close} onClick={close} />
      </div>
      <div className={style.content}>
        <Source
          dataSource={data?.list ?? []}
          containerRef={containerRef}
          onCheck={handlerCheck}
          onDel={onDel}
          target={target}
        />
        <div className={style.right}>
          <div className={style.target}>
            <Target list={target} onDel={onDel} />
          </div>
          <div className={style.footer}>
            <Button className={style.btn} onClick={close}>
              取消
            </Button>
            <Button
              className={style.btn}
              type="primary"
              onClick={() => onConfirm?.(target)}
            >
              确定
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
