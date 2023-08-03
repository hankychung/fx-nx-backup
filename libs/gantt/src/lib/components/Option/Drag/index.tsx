import React, { CSSProperties } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle
} from 'react-beautiful-dnd'

// a little function to help us with reordering the result
const reorder = (list: DragItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (
  _isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  backgroundColor: _isDragging ? '#f8f8f8' : 'transparent',
  // styles we need to apply on draggables
  ...draggableStyle
})

export type DragItem = React.ReactElement

export type DragProps = {
  list: DragItem[]
  onDrageChange: (newList: string[]) => void
}

const Drag: React.FC<React.PropsWithChildren<DragProps>> = ({
  list,
  onDrageChange
}) => {
  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const newTtems = reorder(
      list,
      result.source.index,
      result.destination.index
    ).map((item) => `${item.key}`)

    onDrageChange(newTtems)
  }

  return (
    <DragDropContext key="DragDropContext" onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, _snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable
                key={item.key}
                draggableId={`${item.key}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default React.memo(Drag)
