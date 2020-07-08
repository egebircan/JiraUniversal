import React, { useContext, useState } from 'react'
import { StoreContext } from "store"
import Layout from 'components/layout'
import CreateTaskModal from "components/createTaskModal"
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Todo, InProgress, Done } from 'store/types'
import Task from "components/task"
import { TaskType } from "store/types"

const Dashboard: React.FC = () => {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  const [ createTaskModalVisibility, setCreateTaskModalVisibility ] = useState(false)

  //console.log(state)

  const renderTodo = () => {
    return (
      state.todoTasks.map((todo: Todo) => <Task type={TaskType.Todo} title={todo.title} description={todo.description} point={todo.point}/>)
    )
  }

  const renderInProgress = () => {
    return (
      state.todoTasks.map((todo: InProgress) => <Task type={TaskType.InProgress} title={todo.title} description={todo.description} point={todo.point}/>)
    )
  }

  const renderDone = () => {
    return (
      state.todoTasks.map((todo: Done) => <Task type={TaskType.Done} title={todo.title} description={todo.description} point={todo.point}/>)
    )
  }

  return (
    <Layout>
      <Container style={{ marginTop: '50px' }}>
        <Row>
          <Col>
            TODO
            <Button variant="primary" size="sm" onClick={() => setCreateTaskModalVisibility(true)}>+</Button>
            {renderTodo()}
          </Col>
          <Col md={{ offset: 1 }}>
            IN-PROGRESS
            {renderInProgress()}
          </Col>
          <Col md={{ offset: 1 }}>
            DONE
            {renderDone()}
          </Col>
        </Row>
      </Container>
      <CreateTaskModal show={createTaskModalVisibility} onHide={() => setCreateTaskModalVisibility(false)}/>
    </Layout>
  )
}

export default Dashboard