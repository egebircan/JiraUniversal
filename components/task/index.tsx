import React, { useState, useContext } from "react"
import { Card, Button } from 'react-bootstrap'
import { TaskType } from "store/types";
import { useDrag } from 'react-dnd'
import ModalWithChildren from 'components/modalWithChildren'
import { StoreContext } from "store"

interface TaskCardProps {
  bg: string
  title: string
  point: string
  description: string
  type: TaskType
}

const Task: React.FC<TaskCardProps> = ({ type, bg, title, point, description }) => {

  const [ modalWithChildrenVisibility, setModalWithChildrenVisibility ] = useState(false)
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value

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

  const deleteTask = () => {
    dispatch({ type: "DELETE_TASK", payload: title})
    setModalWithChildrenVisibility(false)
  }

  return(
    <>
      <div ref={drag}>
        <Card style={{ width: '18rem' }}  bg={bg} text={'white'} className="mb-2">
          <Card.Header>
            {title}
            <Button style={{ float: "right" }} onClick={() => setModalWithChildrenVisibility(true)}>X</Button>
          </Card.Header>
          <Card.Body>
            <Card.Title>{point}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <ModalWithChildren title="Delete Task" show={modalWithChildrenVisibility} onHide={() => setModalWithChildrenVisibility(false)}>
        Are you sure to delete?
        <Button onClick={deleteTask}>Yes</Button>
      </ModalWithChildren>
    </>
)};

export default Task