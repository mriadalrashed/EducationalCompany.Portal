import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { courseOccasionApi } from "../services/api";

function CourseOccasionList({ onEdit, onDelete }) {
  const [occasions, setOccasions] = useState([]);
  const [upcomingOccasions, setUpcomingOccasions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchOccasions();
    fetchUpcomingOccasions();
  }, []);

  const fetchOccasions = async () => {
    try {
      const response = await courseOccasionApi.getAll();
      setOccasions(response.data);
    } catch (error) {
      console.error("Error fetching occasions:", error);
    }
  };

  const fetchUpcomingOccasions = async () => {
    try {
      const response = await courseOccasionApi.getUpcoming();
      setUpcomingOccasions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching upcoming occasions:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this course occasion?")
    ) {
      try {
        await courseOccasionApi.delete(id);
        fetchOccasions();
        fetchUpcomingOccasions();
      } catch (error) {
        console.error("Error deleting occasion:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  const renderTable = (data) => (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Course</th>
          <th>Teacher</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Participants</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((occasion) => (
          <tr key={occasion.id}>
            <td>{occasion.course.name}</td>
            <td>
              {occasion.teacher
                ? `${occasion.teacher.firstName} ${occasion.teacher.lastName}`
                : "Not assigned"}
            </td>
            <td>{new Date(occasion.startDate).toLocaleString()}</td>
            <td>{new Date(occasion.endDate).toLocaleString()}</td>
            <td>
              {occasion.currentParticipants}/{occasion.maxParticipants}
            </td>
            <td>
              <Badge bg={occasion.isFull ? "danger" : "success"}>
                {occasion.isFull ? "Full" : "Available"}
              </Badge>
            </td>
            <td>
              <Button
                variant="info"
                size="sm"
                className="me-2"
                onClick={() => onEdit(occasion)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="me-2"
                onClick={() => handleDelete(occasion.id)}
              >
                Delete
              </Button>
              <Button
                as={Link}
                to={`/registrations?occasionId=${occasion.id}`}
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
  );

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2>Course Occasions</h2>
        <Button as={Link} to="/course-occasions/new" variant="primary">
          Add New Course Occasion
        </Button>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="all" title={`All Occasions (${occasions.length})`}>
          {renderTable(occasions)}
        </Tab>
        <Tab
          eventKey="upcoming"
          title={`Upcoming (${upcomingOccasions.length})`}
        >
          {renderTable(upcomingOccasions)}
        </Tab>
      </Tabs>
    </div>
  );
}

export default CourseOccasionList;
