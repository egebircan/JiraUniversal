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
  const [errorMsg, setErrorMsg] = useState('')
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value
  const { userName } = state

  const onChange = (e) => {
    let { name, value } = e.target
    if (name === 'score') value = parseInt(value)

    setFormValues({ ...formValues, [name]: value })
  }

  const onSubmit = async () => {
    const taskId = uuidv4()

    const { title, description, score } = formValues
    if (!title || !description || !score) {
      setErrorMsg('Fields cannot be empty')
      return
    }

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
        userName: userName
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
        payload: { ...formValues, taskId, type: 'todo', userName }
      })
      props.closeModal()
    } else {
      props.showErrorBox()
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '10px', color: 'red' }}>{errorMsg}</div>
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
        <option>Story Point</option>
        <option>3</option>
        <option>5</option>
        <option>8</option>
        <option>13</option>
        <option>21</option>
        <option>34</option>
        <option>55</option>
      </Form.Control>
      <Button onClick={onSubmit} style={{ float: 'right', margin: '15px' }}>
        Submit
      </Button>
    </div>
  )
}

export default CreateTaskForm
