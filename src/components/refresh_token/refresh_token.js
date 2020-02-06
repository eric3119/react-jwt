import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function RefreshToken(props) {
    const [show, setShow] = useState(false);
    const { confirm } = props;
  
    const handleClose = () => setShow(false);
    const handleConfirm = () => confirm();
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}