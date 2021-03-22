import React from "react";
import { Modal, Button } from "react-bootstrap";

const RestartModal = (props) => {

  return (
    <>
      <Modal show={props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Game Finished</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to restart a game?</Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={props.handleRestart}>
            Restart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RestartModal;