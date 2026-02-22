import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CourseList from "../components/CourseList";
import CourseForm from "../components/CourseForm";

function CoursesPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingCourse(null);
  };

  const handleSuccess = () => {
    handleClose();
    // Refresh the list (you might want to use context or state management here)
    window.location.reload();
  };

  return (
    <>
      <CourseList onEdit={handleEdit} />

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCourse ? "Edit Course" : "Create New Course"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CourseForm course={editingCourse} onSuccess={handleSuccess} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CoursesPage;
