import React from "react"
import { Modal } from 'react-bootstrap'
import CreateTaskForm from "components/createTaskForm"

interface CreateTaskModalProps {
  show: boolean
  onHide: () => any
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = (props) => {
  return(
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateTaskForm closeModal={props.onHide} />
      </Modal.Body>
    </Modal>
  )
}

export default CreateTaskModal