import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import RegistrationList from "../components/RegistrationList";
import RegistrationForm from "../components/RegistrationForm";

function RegistrationsPage() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const occasionId = queryParams.get("occasionId");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleSuccess = () => {
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h2>Course Registrations</h2>
        {!occasionId && (
          <Button variant="primary" onClick={handleShow}>
            Add New Registration
          </Button>
        )}
      </div>

      <RegistrationList occasionId={occasionId} />

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistrationForm onSuccess={handleSuccess} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegistrationsPage;
