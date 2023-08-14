import React, { useState, useEffect, useRef } from 'react'
import { CircleArrowUpDarkIcon, MoreIcon } from '@flyele-nx/icon'
import { Card } from '../card'
import { ISortableTab } from '@flyele-nx/types'
import styles from './index.module.scss'
import { useSortable } from '../../../sortable'

interface Props {
  tabs: ISortableTab[]
  handleDragEnd: (sortedItems: ISortableTab[]) => void
  handleClickTab: (id: string) => void
  defaultActiveId: string
  /** 是否使用自定义的 tab 样式 */
  isCustomTabStyle?: boolean
  moreActions?: boolean
  onAdd?: () => void
  itemClass?: string
  /**拖动的元素的id名字，保证全局唯一 */
  sortableElName: string
}

const Container = ({
  onAdd,
  moreActions,
  tabs,
  handleDragEnd,
  handleClickTab,
  itemClass,
  isCustomTabStyle,
  defaultActiveId,
  sortableElName
}: Props) => {
  const [actId, setActId] = useState(defaultActiveId)
  const [prev, setPrev] = useState(false)
  const [next, setNext] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    checkScroll()
  }, [tabs])

  const onScroll = (_e: any) => {
    setTimeout(() => {
      checkScroll()
    }, 100)
  }

  const onNext = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      scrollRef.current.scrollLeft = scrollLeft + clientWidth
    }
  }

  const onPrev = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      scrollRef.current.scrollLeft = scrollLeft - clientWidth
    }
  }

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setPrev(scrollLeft > 0)
      setNext(scrollLeft < scrollWidth - clientWidth)
    }
  }

  const getTabStyle = (tabCount: number): React.CSSProperties => {
    if (tabCount >= 5) {
      return {
        marginLeft: 0,
        width: 78,
        textAlign: 'center',
        padding: '0 10px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }

    if (tabCount === 4) {
      return {
        marginLeft: 0,
        width: 90,
        padding: '0 10px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }

    return { marginLeft: 0, padding: 0, textAlign: 'center', width: 104 }
  }

  useSortable(
    {
      el: `#${sortableElName}`,
      isDisablePointerEvents: true,
      options: {
        scrollSensitivity: 80,
        fallbackClass: styles.dragging,
        handle: '.tab-card',
        onStart: () => {
          console.log('onStart')
        }
      },
      onEnd: (event) => {
        const { oldIndex, newIndex } = event

        if (typeof oldIndex === 'number' && typeof newIndex === 'number') {
          const newList = [...tabs]
          const [removed] = newList.splice(oldIndex, 1)

          newList.splice(newIndex, 0, removed)
          handleDragEnd(newList)
        }
      }
    },
    []
  )

  const onClickTab = (id: string) => {
    setActId(id)
    handleClickTab(id)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles['drop-container']}>
        <div
          className={styles.container}
          onScroll={onScroll}
          id={sortableElName}
        >
          {tabs.map((item, index) => (
            <Card
              key={item.id}
              id={item.id}
              text={item.text}
              actId={actId}
              clickCard={onClickTab}
              showRadius={item.id === defaultActiveId}
              style={getTabStyle(tabs.length)}
            />
          ))}
        </div>
      </div>
      {moreActions && (
        <div className={styles.more_actions}>
          <CircleArrowUpDarkIcon onClick={onAdd} />
          <div className={styles.move_box}>
            <div className={styles.arrow_box}>
              <MoreIcon onClick={onPrev} />
            </div>
            <div className={styles.arrow_box}>
              <MoreIcon onClick={onNext} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Container
