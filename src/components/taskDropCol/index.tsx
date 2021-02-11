import React from "react"
import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"

interface TaskDropColProps {
  droppableId: string
}

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`

const TaskDropCol: React.FC<TaskDropColProps> = ({ children, droppableId }) => {
  return (
    <div style={{ height: "600px", overflow: "auto" }}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <TaskList {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
            {children}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </div>
  )
}

export default TaskDropCol
