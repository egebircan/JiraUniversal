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

const Task: React.FC<TaskCardProps> = (props) => {
  const [{isDragging}, drag] = useDrag({
    item: { type: props.type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        console.log(item)
      }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  isDragging && console.log("Item dragging")

  return(
    <div ref={drag}>
      <Card style={{ width: '18rem' }}  bg={props.bg} text={'white'} className="mb-2">
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Card.Title>{props.point}</Card.Title>
          <Card.Text>
            {props.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
)};

export default Task