import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { StoreContext } from 'store'
import { v4 as uuidv4 } from 'uuid'
import { config } from 'config'

interface CreateTaskFormProps {
  closeModal: () => any
  dispatch: any
  showErrorBox: any
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = (props) => {
  const [formValues, setFormValues] = useState({})
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value

  const onChange = (e) => {
    let { name, value } = e.target
    if (name === 'score') value = parseInt(value)

    setFormValues({ ...formValues, [name]: value })
  }

  const onSubmit = async () => {
    const taskId = uuidv4()

    const response = await fetch(config.url.CREATE_TASK, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formValues,
        taskId,
        type: 'todo',
        userName: 'deneme'
      })
    })

    const jsonResponse = await response.json()

    if (
      jsonResponse &&
      jsonResponse.result &&
      jsonResponse.result === 'success'
    ) {
      props.dispatch({
        type: 'CREATE_TASK',
        payload: { ...formValues, taskId, type: 'todo' }
      })
      props.closeModal()
    } else {
      props.showErrorBox()
    }
  }

  return (
    <div>
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter title"
        name={'title'}
        onChange={onChange}
      />
      <Form.Label>Description</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter description"
        name={'description'}
        onChange={onChange}
      />
      <Form.Label>Story Point</Form.Label>
      <Form.Control as="select" onChange={onChange} name={'score'}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Form.Control>
      <Button onClick={onSubmit} style={{ float: 'right', margin: '15px' }}>
        Submit
      </Button>
    </div>
  )
}

export default CreateTaskForm
