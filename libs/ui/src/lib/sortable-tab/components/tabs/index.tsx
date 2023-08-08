import React, { Component, UIEvent } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd'
// import addIcon from 'assets/board/add.png'
import { uniqueId } from 'lodash'
// import { ReactComponent as IcaonAddPanel } from 'assets/icons/custom-panel/icon-add-panel.svg'
import styles from './index.module.scss'
import { Card } from '../card'
import { ISortableTab } from '@flyele-nx/types'
import { CircleArrowUpDarkIcon, MoreIcon } from '@flyele-nx/icon'

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

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
}

/** 根据 tab 的数量获取不同的样式 */
const getTabStyle = (tabCount: number): React.CSSProperties => {
  if (tabCount >= 5)
    return {
      marginLeft: 0,
      width: 78,
      textAlign: 'center',
      padding: '0 10px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }

  if (tabCount === 4)
    return {
      marginLeft: 0,
      width: 90,
      padding: '0 10px',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }

  return { marginLeft: 0, padding: 0, textAlign: 'center', width: 104 }
}

class Container extends Component<
  Props,
  {
    actId: string
    prev: boolean
    next: boolean
    uniId: string
    inDrop: boolean
  }
> {
  scrollRef: HTMLDivElement | null = null

  constructor(props: Props) {
    super(props)
    const {
      defaultActiveId
      // , moreActions
    } = this.props

    this.onDragEnd = this.onDragEnd.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.refCb = this.refCb.bind(this)

    this.onPrev = this.onPrev.bind(this)
    this.onNext = this.onNext.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onScrollRight = this.onScrollRight.bind(this)
    // eslint-disable-next-line
    this.state = {
      actId: defaultActiveId,
      prev: false,
      next: false,
      uniId: uniqueId('tabs'),
      inDrop: false
    }
  }

  componentDidMount() {
    const { uniId } = this.state

    this.scrollRef = document.getElementById(
      `${uniId}_tabs_drop_box`
    ) as HTMLDivElement
    this.checkScroll()
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { defaultActiveId } = nextProps
    const { actId } = this.state
    const { defaultActiveId: dfId } = this.props

    if (defaultActiveId !== dfId && defaultActiveId !== actId) {
      this.setState({ actId: defaultActiveId })
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.tabs !== prevProps.tabs) {
      this.checkScroll()
    }
  }

  onDragStart() {
    this.setState({ inDrop: true })
  }

  onDragEnd(result: DropResult) {
    const { handleDragEnd, tabs } = this.props

    console.log('onDragEnd')

    this.setState({ inDrop: false })

    // dropped outside the list
    if (!result.destination) {
      return
    }

    handleDragEnd(reorder(tabs, result.source.index, result.destination.index))
  }

  onScroll(_e: UIEvent) {
    // const asTarget = e.target as HTMLDivElement

    setTimeout(() => {
      this.checkScroll()
    }, 100)
    // console.log('滚动了', asTarget.scrollLeft, asTarget.scrollWidth)
  }

  onNext() {
    if (this.scrollRef) {
      const { scrollLeft, clientWidth } = this.scrollRef

      this.scrollRef.scrollTo({
        top: 0,
        left: scrollLeft + clientWidth,
        behavior: 'smooth'
      })
    }
  }

  onPrev() {
    if (this.scrollRef) {
      const { scrollLeft, clientWidth } = this.scrollRef

      this.scrollRef.scrollTo({
        top: 0,
        left: Math.max(scrollLeft - clientWidth, 0),
        behavior: 'smooth'
      })
    }
  }

  onScrollRight() {
    if (this.scrollRef) {
      const { scrollWidth } = this.scrollRef

      this.scrollRef.scrollTo({
        top: 0,
        left: scrollWidth,
        behavior: 'smooth'
      })
    }
  }

  // 检测是否可滚动
  checkScroll() {
    if (this.scrollRef) {
      const { scrollLeft, scrollWidth, clientWidth } = this.scrollRef

      let { prev, next } = this.state

      if (scrollWidth === clientWidth) {
        prev = false
        next = false
      }

      if (scrollWidth > clientWidth) {
        // 有滚动
        prev = !(scrollLeft === 0)
        next = !(scrollLeft === scrollWidth - clientWidth)
      }
      // console.log('打印一下这三个值', scrollLeft, scrollWidth, clientWidth)

      this.setState({
        prev,
        next
      })
    }
  }

  // scrollIntoView() {}

  clickCard(actId: string) {
    const { handleClickTab } = this.props

    this.setState({ actId })

    handleClickTab(actId)
  }

  refCb(ref: HTMLDivElement | null) {
    this.scrollRef = ref
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { actId, prev, next, uniId, inDrop } = this.state
    const { onAdd, moreActions, tabs, itemClass, isCustomTabStyle } = this.props

    const cardStyle = isCustomTabStyle ? getTabStyle(tabs.length) : {}

    return (
      <div className={styles.wrap}>
        <div className={styles['drop-container']}>
          {/*<div ref={(ref) => this.setRef('startRef', ref)} />*/}
          <DragDropContext
            onDragEnd={this.onDragEnd}
            onDragStart={this.onDragStart}
          >
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, _snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={styles.container}
                  {...provided.droppableProps}
                  onScroll={this.onScroll}
                  id={`${uniId}_tabs_drop_box`}
                >
                  {tabs.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, _snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={itemClass}
                          key={item.id}
                        >
                          <Card
                            {...item}
                            style={cardStyle}
                            actId={actId}
                            clickCard={() => {
                              this.clickCard(item.id)
                            }}
                            showRadius={!inDrop}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {moreActions && (
          <div className={styles.more_actions}>
            <CircleArrowUpDarkIcon onClick={() => onAdd && onAdd()} />
            <div className={styles.move_box}>
              <div className={styles.arrow_box}>
                <MoreIcon onClick={this.onNext} />
              </div>
              <div className={styles.arrow_box}>
                <MoreIcon onClick={this.onNext} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Container
