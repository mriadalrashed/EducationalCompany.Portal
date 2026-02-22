import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import TeacherList from "../components/TeacherList";
import TeacherForm from "../components/TeacherForm";

function TeachersPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingTeacher(null);
  };

  const handleSuccess = () => {
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <TeacherList onEdit={handleEdit} />

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTeacher ? "Edit Teacher" : "Create New Teacher"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TeacherForm teacher={editingTeacher} onSuccess={handleSuccess} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TeachersPage;
