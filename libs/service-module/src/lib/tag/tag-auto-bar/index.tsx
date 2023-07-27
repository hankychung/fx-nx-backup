import React, { MouseEvent, useRef } from 'react'
import { TagModel } from '@flyele-nx/service'
import CountItem from './count-item'
// import { AutoTagBarContext, AutoTagBarService } from './service'
import css from './index.module.scss'
import { AutoTagItem } from './item'
import { useMount, useUnmount } from 'ahooks'

export interface TagAutoBarProps {
  tagGap?: number
  tags: TagModel[]
  onClickItem?: (e: MouseEvent, tag: TagModel) => void
}

function _TagAutoBar(props: TagAutoBarProps) {
  // 数据源
  const { tags, tagGap = 6, onClickItem } = props

  // 容器dom
  const barDom = useRef<HTMLDivElement | null>(null)

  //  服务
  // const service = useMemo(() => new AutoTagBarService({ tagGap }), [tagGap])

  // 监听控制
  const io = useRef<IntersectionObserver | null>(null)
  // 大小监听
  // const ro = useRef<ResizeObserver | null>(null)

  // 内容高度
  // const contentHeight = useRef<number>(0)

  // 内容宽度
  // const contentWidth = useRef<number>(0)

  // const [visible, setVisible] = useState(true)

  useMount(() => {
    if (barDom.current) {
      io.current?.observe(barDom.current)
    }
  })

  useUnmount(() => {
    if (barDom.current) {
      io.current?.unobserve(barDom.current)
    }
  })

  // useLayoutEffect(() => {
  //   if (barDom.current) {
  //     io.current = new IntersectionObserver(
  //       ([event]) => {
  //         // 判断是否在显示区域
  //         const { isIntersecting, boundingClientRect } = event
  //
  //         setVisible(isIntersecting)
  //         if (isIntersecting) {
  //           isRo() && ro.current?.observe(barDom.current!)
  //           service.barWidth = Math.floor(boundingClientRect.width)
  //           service.generateTagItem()
  //         } else {
  //           isRo() && ro.current?.unobserve(barDom.current!)
  //         }
  //       },
  //       { threshold: 0.2 }
  //     )
  //
  //     io.current.observe(barDom.current)
  //
  //     // size 变化监听
  //     ro.current = new ResizeObserver(([event]: ResizeObserverEntry[]) => {
  //       // 初始化的
  //       const rectWidth = event.contentRect.width
  //
  //       if (contentWidth.current === 0) {
  //         contentWidth.current = rectWidth
  //       }
  //
  //       // 宽度发生改变
  //       if (contentWidth.current !== rectWidth) {
  //         contentWidth.current = rectWidth
  //         service.barWidth = rectWidth
  //         service.generateTagItem()
  //       }
  //     })
  //     ro.current.observe(barDom.current)
  //   }
  //
  //   return () => {
  //     if (io.current) io.current.disconnect()
  //     if (ro.current) ro.current.disconnect()
  //   }
  // }, [service])

  // 获取占位高度
  // useEffect(() => {
  //   if (barDom.current && visible) {
  //     contentHeight.current = barDom.current?.clientHeight
  //   }
  // }, [visible])

  // 每次tag 更新 重新计算
  // useLayoutEffect(() => {
  //   service.generateTagItem()
  // }, [service, tags])

  // const isRo = () => {
  //   return ro.current && barDom.current
  // }

  // 创建item
  const buildItems = () => {
    // return tags.map((item, index) => {
    //   const key = `${item.id || item.tag_id}-${index}`
    //   return (
    //     <AutoTagItem
    //       key={key}
    //       data={item}
    //       order={index}
    //       onClick={onClickItem}
    //     />
    //   )
    // })
    if (!tags.length) return null

    const key = `${tags[0].id || tags[0].tag_id}-${0}`
    return (
      <AutoTagItem key={key} data={tags[0]} order={0} onClick={onClickItem} />
    )
  }

  const buildContent = () => {
    // if (!visible) return <div style={{ height: contentHeight.current }} />
    if (!tags.length) return <div style={{ height: '100%' }} />
    return (
      <>
        {buildItems()}
        {/*<CountItem order={tags.length + 1} key="count" />*/}
        {tags.length > 1 && <CountItem order={tags.length - 1} key="count" />}
      </>
    )
  }

  return (
    <div className="tag-auto-bar" style={{ width: 'inherit' }}>
      {/*<AutoTagBarContext.Provider value={service}>*/}
      <div className={css.bar} ref={barDom} style={{ gap: tagGap }}>
        {buildContent()}
      </div>
      {/*</AutoTagBarContext.Provider>*/}
    </div>
  )
}

export default React.memo(_TagAutoBar, (prevProps, nextProps) => {
  if (prevProps.tagGap !== nextProps.tagGap) return false

  const prevTags = JSON.stringify(prevProps.tags)
  const nextTags = JSON.stringify(nextProps.tags)

  return prevTags === nextTags
})
