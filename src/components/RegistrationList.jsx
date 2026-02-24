import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Dropdown } from "react-bootstrap";
import { registrationApi } from "../services/api";

function RegistrationList({ occasionId, participantId }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, [occasionId, participantId]);

  const fetchRegistrations = async () => {
    try {
      let response;
      if (occasionId) {
        response = await registrationApi.getByOccasionId(occasionId);
      } else if (participantId) {
        response = await registrationApi.getByParticipantId(participantId);
      } else {
        response = await registrationApi.getAll();
      }
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await registrationApi.updateStatus(id, status);
      fetchRegistrations();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await registrationApi.confirm(id);
      fetchRegistrations();
    } catch (error) {
      console.error("Error confirming registration:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await registrationApi.cancel(id);
      fetchRegistrations();
    } catch (error) {
      console.error("Error cancelling registration:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this registration?")) {
      try {
        await registrationApi.delete(id);
        fetchRegistrations();
      } catch (error) {
        console.error("Error deleting registration:", error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      confirmed: "success",
      cancelled: "danger",
    };
    return (
      <Badge bg={variants[status.toLowerCase()] || "secondary"}>{status}</Badge>
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Participant</th>
            <th>Course</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td>
                {registration.participant.firstName}{" "}
                {registration.participant.lastName}
              </td>
              <td>{registration.courseOccasion.course.name}</td>
              <td>
                {new Date(registration.registrationDate).toLocaleDateString()}
              </td>
              <td>{getStatusBadge(registration.status)}</td>
              <td>
                <Dropdown className="d-inline-block me-2">
                  <Dropdown.Toggle variant="secondary" size="sm">
                    Status
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        handleStatusChange(registration.id, "Pending")
                      }
                    >
                      Set to Pending
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleConfirm(registration.id)}
                    >
                      Confirm
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleCancel(registration.id)}
                    >
                      Cancel
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(registration.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RegistrationList;
