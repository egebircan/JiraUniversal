import React, { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import { StoreContext } from "store"

interface CreateTaskFormProps {
  closeModal: () => any
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = (props) => {
  const [ formValues, setFormValues ] = useState({})
  const { value } = useContext(StoreContext)
  const { state, dispatch } = value

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value})
  }

  const onSubmit = () => {
    dispatch({ type: "CREATE_TASK", payload: formValues})
    props.closeModal()
  }

  return(
    <div>
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" placeholder="Enter title" name={"title"} onChange={onChange} />
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" placeholder="Enter description" name={"description"} onChange={onChange} />
      <Form.Label>Story Point</Form.Label>
      <Form.Control as="select" onChange={onChange} name={"point"}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </Form.Control>
      <Button onClick={onSubmit} style={{ float: "right", margin: "15px"}}>Submit</Button>
    </div>
  )
}

export default CreateTaskForm