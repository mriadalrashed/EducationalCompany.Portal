import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CourseOccasionList from "../components/CourseOccasionList";
import CourseOccasionForm from "../components/CourseOccasionForm";

function CourseOccasionsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingOccasion, setEditingOccasion] = useState(null);

  const handleEdit = (occasion) => {
    setEditingOccasion(occasion);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingOccasion(null);
  };

  const handleSuccess = () => {
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <CourseOccasionList onEdit={handleEdit} />

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingOccasion
              ? "Edit Course Occasion"
              : "Create New Course Occasion"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CourseOccasionForm
            occasion={editingOccasion}
            onSuccess={handleSuccess}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CourseOccasionsPage;
