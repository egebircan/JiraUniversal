import React, { useContext, useState } from 'react'
import { StoreContext } from 'store'
import Layout from 'components/layout'
import ModalWithChildren from 'components/modalWithChildren'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Todo, InProgress, Done } from 'store/types'
import Task from 'components/task'
import { TaskType } from 'store/types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskDropCol from 'components/taskDropCol'
import CreateTaskForm from 'components/createTaskForm'

const Dashboard: React.FC = () => {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  const { tasks, notes, score } = state
  const [
    modalWithChildrenVisibility,
    setModalWithChildrenVisibility
  ] = useState(false)

  console.log('STATE', state)

  const renderTodo = () => {
    return tasks.todoTasks.map((todo: Todo) => (
      <Task
        type={TaskType.Todo}
        bg={'secondary'}
        id={todo.id}
        title={todo.title}
        description={todo.description}
        score={todo.score}
      />
    ))
  }

  const renderInProgress = () => {
    return tasks.inProgressTasks.map((todo: InProgress) => (
      <Task
        type={TaskType.InProgress}
        bg={'info'}
        id={todo.id}
        title={todo.title}
        description={todo.description}
        score={todo.score}
      />
    ))
  }

  const renderDone = () => {
    return tasks.doneTasks.map((todo: Done) => (
      <Task
        type={TaskType.Done}
        bg={'success'}
        id={todo.id}
        title={todo.title}
        description={todo.description}
        score={todo.score}
      />
    ))
  }

  const onDrop = (item, dropTarget) => {
    console.log(item)
    dispatch({ type: 'MOVE_TASK', payload: item, dropTarget })

    if (item.type === 'inprogress' && dropTarget === 'doneTasks') {
      dispatch({ type: 'UPDATE_SCORE', payload: item.score })
    } else if (item.type === 'done') {
      dispatch({ type: 'UPDATE_SCORE', payload: -item.score })
    }
  }

  return (
    <Layout>
      <DndProvider backend={HTML5Backend}>
        <Container style={{ marginTop: '50px' }}>
          <Row>
            <Col>
              TODO
              <Button
                variant="primary"
                size="sm"
                onClick={() => setModalWithChildrenVisibility(true)}
              >
                +
              </Button>
              <TaskDropCol
                onDrop={onDrop}
                acceptTypes={[TaskType.InProgress]}
                type={'todoTasks'}
              >
                {renderTodo()}
              </TaskDropCol>
            </Col>
            <Col md={{ offset: 1 }}>
              IN-PROGRESS
              <TaskDropCol
                onDrop={onDrop}
                acceptTypes={[TaskType.Todo, TaskType.Done]}
                type={'inProgressTasks'}
              >
                {renderInProgress()}
              </TaskDropCol>
            </Col>
            <Col md={{ offset: 1 }}>
              DONE
              <TaskDropCol
                onDrop={onDrop}
                acceptTypes={[TaskType.InProgress]}
                type={'doneTasks'}
              >
                {renderDone()}
              </TaskDropCol>
            </Col>
          </Row>
        </Container>
      </DndProvider>
      <div style={{ textAlign: 'center' }}>{score}</div>
      <ModalWithChildren
        show={modalWithChildrenVisibility}
        onHide={() => setModalWithChildrenVisibility(false)}
        title="create task"
      >
        <CreateTaskForm
          closeModal={() => setModalWithChildrenVisibility(false)}
        />
      </ModalWithChildren>
    </Layout>
  )
}

export default Dashboard
