import React, { useContext, useState, useReducer, useEffect } from 'react'
import { StoreContext } from 'store'
import Layout from 'components/layout'
import ModalWithChildren from 'components/modalWithChildren'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Todo, InProgress, Done } from 'store/types'
import Task from 'components/task'
import { TaskType, TaskInterface } from 'store/types'
import TaskDropCol from 'components/taskDropCol'
import CreateTaskForm from 'components/createTaskForm'
import { config } from 'config'
import { GetStaticProps } from 'next'
import { taskReducer } from 'store/tasks'
import { DragDropContext } from 'react-beautiful-dnd'
import Link from 'next/link'

const Dashboard: React.FC = ({ fetchedTasks, dbResponse }: any) => {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  const { score, userName } = state
  const [createTaskModalVisibility, setCreateTaskModalVisibility] = useState(
    false
  )

  const [errorBoxVisibility, setErrorBoxVisibility] = useState(false)

  useEffect(() => {
    if (dbResponse === 'fail') setErrorBoxVisibility(true)

    const calculateTotalScore = () => {
      let totalScore = 0
      let filteredTasks = filterTasksByUser(fetchedTasks)
      filteredTasks['done'].forEach((element: TaskInterface) => {
        if (element.type === TaskType.Done) {
          totalScore += element.score
        }
      })
      dispatch({ type: 'INITIAL_SCORE', payload: totalScore })
    }

    calculateTotalScore()
  }, [])

  const filterTasksByUser = (obj) => {
    let newobj = {}
    for (let key in obj) {
      newobj[key] = obj[key].filter((task) => task.userName == userName)
    }

    return newobj
  }

  const [tasks, taskDispatch] = useReducer(
    taskReducer,
    filterTasksByUser(fetchedTasks)
  )

  //console.log('STATE', state)
  //console.log(tasks, userName)
  //console.log(process.env.NODE_ENV)

  const renderTodo = () => {
    console.log(tasks.todo)
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

    //console.log(item)

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
      <Button
        variant="primary"
        size="lg"
        onClick={() => setCreateTaskModalVisibility(true)}
        style={{ marginTop: '15px', marginLeft: '15px' }}
      >
        Create New
      </Button>
      <Link href="/">
        <Button
          style={{ marginTop: '15px', marginRight: '15px', float: 'right' }}
          onClick={() => dispatch({ type: 'LOGOUT' })}
          variant="secondary"
          size="lg"
        >
          Log Out
        </Button>
      </Link>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container style={{ marginTop: '0px' }}>
          <Row>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <h4>TODO</h4>
              </div>

              <TaskDropCol droppableId="todo">{renderTodo()}</TaskDropCol>
            </Col>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <h4>IN PROGRESS</h4>
              </div>{' '}
              <TaskDropCol droppableId="inprogress">
                {renderInProgress()}
              </TaskDropCol>
            </Col>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <h4>DONE</h4>
              </div>{' '}
              <TaskDropCol droppableId="done">{renderDone()}</TaskDropCol>
            </Col>
          </Row>
        </Container>
      </DragDropContext>
      <div style={{ textAlign: 'center', fontSize: '25px', marginTop: '20px' }}>
        Score: {score}
      </div>
      <ModalWithChildren
        show={createTaskModalVisibility}
        onHide={() => setCreateTaskModalVisibility(false)}
        title="Create Task"
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
