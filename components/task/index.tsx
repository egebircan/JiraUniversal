import React from "react"
import { Card } from 'react-bootstrap'
import { TaskType } from "store/types";

interface TaskCardProps {
  type: TaskType
  title: string
  point: string
  description: string
}

const Task: React.FC<TaskCardProps> = (props) => (
  <Card style={{ width: '18rem' }}  bg={props.type} text={'white'} className="mb-2">
    <Card.Header>{props.title}</Card.Header>
    <Card.Body>
      <Card.Title>{props.point}</Card.Title>
      <Card.Text>
        {props.description}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default Task