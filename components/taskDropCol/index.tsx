import React from 'react'
import { useDrop } from 'react-dnd'
import { TaskType } from '../../store/types'

interface TaskDropColProps {
  acceptTypes: TaskType[]
  onDrop: any
  type: string
}

const TaskDropCol: React.FC<TaskDropColProps> = ({
  children,
  acceptTypes,
  type,
  onDrop
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: acceptTypes,
    drop: (item) => onDrop(item, type),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  return (
    <div style={{ height: '700px', overflow: 'auto' }} ref={drop}>
      {children}
    </div>
  )
}

export default TaskDropCol
