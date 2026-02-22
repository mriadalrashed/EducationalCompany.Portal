import React, { useState, useEffect } from "react";
import { Table, Button, Form, InputGroup, Badge } from "react-bootstrap";
import { teacherApi } from "../services/api";
import { Link } from "react-router-dom";

function TeacherList({ onEdit, onDelete }) {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await teacherApi.getAll(search);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTeachers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await teacherApi.delete(id);
        fetchTeachers();
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Teachers</h2>
        <Button variant="primary" onClick={() => onEdit(null)}>
          Add New Teacher
        </Button>
      </div>

      <Form onSubmit={handleSearch} className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline-secondary" type="submit">
            Search
          </Button>
        </InputGroup>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialization</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>
                {teacher.firstName} {teacher.lastName}
              </td>
              <td>{teacher.email}</td>
              <td>{teacher.phone}</td>
              <td>{teacher.specialization}</td>
              <td>{new Date(teacher.createdDate).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(teacher)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDelete(teacher.id)}
                >
                  Delete
                </Button>
                <Button
                  as={Link}
                  to={`/course-occasions?teacherId=${teacher.id}`}
                  variant="secondary"
                  size="sm"
                >
                  View Course Occasions
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TeacherList;
