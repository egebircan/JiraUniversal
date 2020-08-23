import React, { useState, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { TaskType } from 'store/types'
import { useDrag } from 'react-dnd'
import ModalWithChildren from 'components/modalWithChildren'
import { StoreContext } from 'store'
import { config } from 'config'

interface TaskCardProps {
  bg: string
  taskId: number
  title: string
  score: number
  description: string
  type: TaskType
  showErrorBox: any
  dispatch: any
}

const Task: React.FC<TaskCardProps> = ({
  taskId,
  type,
  bg,
  title,
  score,
  description,
  showErrorBox,
  dispatch
}) => {
  const [
    modalWithChildrenVisibility,
    setModalWithChildrenVisibility
  ] = useState(false)
  const { value } = useContext(StoreContext)
  const { state, dispatch: scoreDispatch } = value

  const [{ isDragging }, drag] = useDrag({
    item: { taskId, type, title, description, score },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        //console.log(item)
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const deleteTask = async () => {
    const response = await fetch(`${config.url.DELETE_TASK}/${taskId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })

    const jsonResponse = await response.json()
    console.log(jsonResponse)
    if (
      jsonResponse &&
      jsonResponse.result &&
      jsonResponse.result === 'success'
    ) {
      dispatch({ type: 'DELETE_TASK', payload: taskId })
      if (type === 'done')
        scoreDispatch({ type: 'UPDATE_SCORE', payload: -score })

      setModalWithChildrenVisibility(false)
    } else {
      setModalWithChildrenVisibility(false)
      showErrorBox()
    }
  }

  return (
    <>
      <div ref={drag}>
        <Card
          style={{ width: '16rem' }}
          bg={bg}
          text={'white'}
          className="mb-2"
        >
          <Card.Header>
            {title}
            <Button
              style={{ float: 'right' }}
              onClick={() => setModalWithChildrenVisibility(true)}
            >
              X
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Title>{score}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <ModalWithChildren
        title="Delete Task"
        show={modalWithChildrenVisibility}
        onHide={() => setModalWithChildrenVisibility(false)}
      >
        Are you sure to delete?
        <Button onClick={deleteTask}>Yes</Button>
      </ModalWithChildren>
    </>
  )
}

export default Task
