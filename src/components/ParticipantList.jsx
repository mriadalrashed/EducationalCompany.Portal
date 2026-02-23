import React, { useState, useEffect } from "react";
import { Table, Button, Form, InputGroup, Badge } from "react-bootstrap";
import { participantApi } from "../services/api";
import { Link } from "react-router-dom";

function ParticipantList({ onEdit, onDelete }) {
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await participantApi.getAll(search);
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchParticipants();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this participant?")) {
      try {
        await participantApi.delete(id);
        fetchParticipants();
      } catch (error) {
        console.error("Error deleting participant:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Participants</h2>
        <Button variant="primary" onClick={() => onEdit(null)}>
          Add New Participant
        </Button>
      </div>

      <Form onSubmit={handleSearch} className="mb-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search participants..."
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
            <th>Address</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>
                {participant.firstName} {participant.lastName}
              </td>
              <td>{participant.email}</td>
              <td>{participant.phone}</td>
              <td>{participant.address}</td>
              <td>{new Date(participant.createdDate).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(participant)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDelete(participant.id)}
                >
                  Delete
                </Button>
                <Button
                  as={Link}
                  to={`/registrations?participantId=${participant.id}`}
                  variant="secondary"
                  size="sm"
                >
                  View Registrations
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ParticipantList;
