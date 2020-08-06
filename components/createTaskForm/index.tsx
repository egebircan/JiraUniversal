import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { StoreContext } from 'store'
import { v4 as uuidv4 } from 'uuid'

interface CreateTaskFormProps {
  closeModal: () => any
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

  const onSubmit = () => {
    dispatch({ type: 'CREATE_TASK', payload: { ...formValues, id: uuidv4() } })
    props.closeModal()
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
