import React from "react"
import { Modal } from "react-bootstrap"

interface ModalWithChildrenProps {
  show: boolean
  title: string
  onHide: () => any
}

const ModalWithChildren: React.FC<ModalWithChildrenProps> = props => {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  )
}

export default ModalWithChildren
