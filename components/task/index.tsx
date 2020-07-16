import React from "react"
import { Card } from 'react-bootstrap'
import { TaskType } from "store/types";
import { useDrag } from 'react-dnd'

interface TaskCardProps {
  bg: string
  title: string
  point: string
  description: string
  type: TaskType
}

const Task: React.FC<TaskCardProps> = ({ type, bg, title, point, description }) => {
  const [{isDragging}, drag] = useDrag({
    item: { type, title, description, point },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        //console.log(item)
      }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return(
    <div ref={drag}>
      <Card style={{ width: '18rem' }}  bg={bg} text={'white'} className="mb-2">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Title>{point}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
)};

export default Task