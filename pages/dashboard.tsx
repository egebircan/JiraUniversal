import React, { useContext, useState } from 'react'
import { StoreContext } from "store"
import Layout from 'components/layout'
import ModalWithChildren from "components/modalWithChildren"
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Todo, InProgress, Done } from 'store/types'
import Task from "components/task"
import { TaskType } from "store/types"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskDropCol from 'components/taskDropCol'
import CreateTaskForm from 'components/createTaskForm'

const Dashboard: React.FC = () => {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  const {tasks, notes, score} = state
  const [ modalWithChildrenVisibility, setModalWithChildrenVisibility ] = useState(false)

  console.log("STATE", state)

  const renderTodo = () => {
    return (
      tasks.todoTasks.map((todo: Todo) => <Task type={TaskType.Todo} bg={"secondary"} title={todo.title} description={todo.description} point={todo.point}/>)
    )
  }

  const renderInProgress = () => {
    return (
      tasks.inProgressTasks.map((todo: InProgress) => <Task type={TaskType.InProgress} bg={"info"} title={todo.title} description={todo.description} point={todo.point}/>)
    )
  }

  const renderDone = () => {
    return (
      tasks.doneTasks.map((todo: Done) => <Task type={TaskType.Done} bg={"success"} title={todo.title} description={todo.description} point={todo.point}/>)
    )
  }

  const onDrop = (item, dropTarget) => {
    dispatch({ type: "MOVE_TASK", payload: item, dropTarget })
    dispatch({ type: "BASIC_CASE", payload: "Şerifali"})
  }

  return (
    <Layout>
      <DndProvider backend={HTML5Backend}>
        <Container style={{ marginTop: '50px' }}>
          <Row>
            <Col>
              TODO
              <Button variant="primary" size="sm" onClick={() => setModalWithChildrenVisibility(true)}>+</Button>
              <TaskDropCol onDrop={onDrop} acceptTypes={[TaskType.InProgress]} type={"todoTasks"}>
                {renderTodo()}
              </TaskDropCol>
            </Col>
            <Col md={{ offset: 1 }}>
              IN-PROGRESS
              <TaskDropCol onDrop={onDrop} acceptTypes={[TaskType.Todo, TaskType.Done]} type={"inProgressTasks"}>
                {renderInProgress()}
              </TaskDropCol>
            </Col>
            <Col md={{ offset: 1 }}>
              DONE
              <TaskDropCol onDrop={onDrop} acceptTypes={[TaskType.InProgress]} type={"doneTasks"} >
                {renderDone()}
              </TaskDropCol>
            </Col>
          </Row>
        </Container>
      </DndProvider>
      <ModalWithChildren show={modalWithChildrenVisibility} onHide={() => setModalWithChildrenVisibility(false)} title="create task">
        <CreateTaskForm closeModal={() => setModalWithChildrenVisibility(false)}/>
      </ModalWithChildren>
    </Layout>
  )
}

export default Dashboard