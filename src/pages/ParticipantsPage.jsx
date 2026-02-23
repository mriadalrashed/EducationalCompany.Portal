import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ParticipantList from "../components/ParticipantList";
import ParticipantForm from "../components/ParticipantForm";

function ParticipantsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);

  const handleEdit = (participant) => {
    setEditingParticipant(participant);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingParticipant(null);
  };

  const handleSuccess = () => {
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <ParticipantList onEdit={handleEdit} />

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingParticipant ? "Edit Participant" : "Create New Participant"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ParticipantForm
            participant={editingParticipant}
            onSuccess={handleSuccess}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ParticipantsPage;
