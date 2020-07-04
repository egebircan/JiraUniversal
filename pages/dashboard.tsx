import React, { useContext } from 'react'
import { StoreContext } from "../store"
import Layout from '../components/layout'
import { Container, Row, Col } from 'react-bootstrap'
import { Todo } from '../store/types'

const Dashboard: React.FC = () => {
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value

  console.log(state)

  const renderTodo = () => {
    return (
      state.todoTasks.map((todo: Todo) => <div>{todo.name}</div>)
    )
  }

  return (
    <Layout>
      <Container style={{ marginTop: '50px' }}>
        <Row>
          <Col>
            TODO
            <div style={{ border: '4px solid' }}>{renderTodo()}</div>
          </Col>
          <Col md={{ offset: 1 }}>
            IN-PROGRESS
            <div style={{ border: '4px solid' }}>{renderTodo()}</div>
          </Col>
          <Col md={{ offset: 1 }}>
            DONE
            <div style={{ border: '4px solid' }}>{renderTodo()}</div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Dashboard