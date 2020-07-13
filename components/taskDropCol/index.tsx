import React from 'react'
import { useDrop } from 'react-dnd'
import { TaskType } from '../../store/types'

interface TaskDropColProps {
  acceptType: TaskType
}

const TaskDropCol: React.FC<TaskDropColProps> = (props) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: props.acceptType,
    drop: () => console.log("Item dropped"),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
  })

  return(
    <div style={{height: '500px'}} ref={drop}>
      {props.children}
    </div>
  )
}

export default TaskDropCol