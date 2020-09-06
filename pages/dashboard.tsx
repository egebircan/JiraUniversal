import React, { useContext, useState, useReducer, useEffect } from 'react'
import { StoreContext } from 'store'
import Layout from 'components/layout'
import ModalWithChildren from 'components/modalWithChildren'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Todo, InProgress, Done } from 'store/types'
import Task from 'components/task'
import { TaskType } from 'store/types'
import TaskDropCol from 'components/taskDropCol'
import CreateTaskForm from 'components/createTaskForm'
import { config } from 'config'
import { GetStaticProps } from 'next'
import { taskReducer } from 'store/tasks'
import { DragDropContext } from 'react-beautiful-dnd'

const Dashboard: React.FC = ({ fetchedTasks, dbResponse }: any) => {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  const { notes, score } = state
  const [createTaskModalVisibility, setCreateTaskModalVisibility] = useState(
    false
  )

  const [errorBoxVisibility, setErrorBoxVisibility] = useState(false)
  useEffect(() => {
    if (dbResponse === 'fail') setErrorBoxVisibility(true)
  }, [])

  const [tasks, taskDispatch] = useReducer(taskReducer, fetchedTasks)

  //console.log('STATE', state)
  console.log(tasks)
  //console.log(process.env.NODE_ENV)

  const renderTodo = () => {
    return tasks.todo.map((todo: Todo, index) => (
      <Task
        type={TaskType.Todo}
        bg={'secondary'}
        taskId={todo.taskId}
        title={todo.title}
        description={todo.description}
        score={todo.score}
        showErrorBox={() => setErrorBoxVisibility(true)}
        dispatch={taskDispatch}
        index={index}
        key={todo.taskId}
      />
    ))
  }

  const renderInProgress = () => {
    return tasks.inprogress.map((inprogress: InProgress, index) => (
      <Task
        type={TaskType.InProgress}
        bg={'info'}
        taskId={inprogress.taskId}
        title={inprogress.title}
        description={inprogress.description}
        score={inprogress.score}
        showErrorBox={() => setErrorBoxVisibility(true)}
        dispatch={taskDispatch}
        index={index}
        key={inprogress.taskId}
      />
    ))
  }

  const renderDone = () => {
    return tasks.done.map((done: Done, index) => (
      <Task
        type={TaskType.Done}
        bg={'success'}
        taskId={done.taskId}
        title={done.title}
        description={done.description}
        score={done.score}
        showErrorBox={() => setErrorBoxVisibility(true)}
        dispatch={taskDispatch}
        index={index}
        key={done.taskId}
      />
    ))
  }

  const onDragEnd = async (result) => {
    console.log(result)
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const item = tasks[source.droppableId].find(
      (task) => task.taskId === draggableId
    )

    if (item.type !== 'done' && destination.droppableId === 'done') {
      dispatch({ type: 'UPDATE_SCORE', payload: item.score })
    } else if (item.type === 'done' && destination.droppableId !== 'done') {
      dispatch({ type: 'UPDATE_SCORE', payload: -item.score })
    }

    taskDispatch({
      type: 'MOVE_TASK',
      payload: item,
      dropTarget: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index
    })

    const response = await fetch(config.url.MOVE_TASKS, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskId: item.taskId,
        dropTarget: destination.droppableId
      })
    })

    const jsonResponse = await response.json()

    if (
      !jsonResponse ||
      !jsonResponse.result ||
      jsonResponse.result !== 'success'
    ) {
      setErrorBoxVisibility(true)
    }
  }

  return (
    <Layout>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container style={{ marginTop: '50px' }}>
          <Row>
            <Col>
              TODO
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCreateTaskModalVisibility(true)}
              >
                +
              </Button>
              <TaskDropCol droppableId="todo">{renderTodo()}</TaskDropCol>
            </Col>
            <Col md={{ offset: 1 }}>
              IN-PROGRESS
              <TaskDropCol droppableId="inprogress">
                {renderInProgress()}
              </TaskDropCol>
            </Col>
            <Col md={{ offset: 1 }}>
              DONE
              <TaskDropCol droppableId="done">{renderDone()}</TaskDropCol>
            </Col>
          </Row>
        </Container>
      </DragDropContext>
      <div style={{ textAlign: 'center' }}>{score}</div>
      <ModalWithChildren
        show={createTaskModalVisibility}
        onHide={() => setCreateTaskModalVisibility(false)}
        title="create task"
      >
        <CreateTaskForm
          closeModal={() => setCreateTaskModalVisibility(false)}
          dispatch={taskDispatch}
          showErrorBox={() => setErrorBoxVisibility(true)}
        />
      </ModalWithChildren>
      <ModalWithChildren
        show={errorBoxVisibility}
        onHide={() => setErrorBoxVisibility(false)}
        title="Error Box"
      >
        <div>FAILED</div>
      </ModalWithChildren>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(config.url.GET_TASKS)
  const responseJson = await response.json()

  const todo = responseJson.taskList.filter((task) => task.type === 'todo')
  const inprogress = responseJson.taskList.filter(
    (task) => task.type === 'inprogress'
  )
  const done = responseJson.taskList.filter((task) => task.type === 'done')

  const fetchedTasks = { todo, inprogress, done }

  //! TODO: null check
  return {
    props: {
      fetchedTasks,
      dbResponse: responseJson.dbResponse.result
    } // will be passed to the page component as props
  }
}

export default Dashboard
