import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  registrationApi,
  participantApi,
  courseOccasionApi,
} from "../services/api";

const validationSchema = Yup.object({
  participantId: Yup.string().required("Participant is required"),
  courseOccasionId: Yup.string().required("Course occasion is required"),
});

function RegistrationForm({ registration, onSuccess }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [courseOccasions, setCourseOccasions] = useState([]);
  const [filteredOccasions, setFilteredOccasions] = useState([]);

  useEffect(() => {
    fetchParticipants();
    fetchCourseOccasions();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await participantApi.getAll();
      setParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const fetchCourseOccasions = async () => {
    try {
      const response = await courseOccasionApi.getAll();
      setCourseOccasions(response.data);
      setFilteredOccasions(response.data);
    } catch (error) {
      console.error("Error fetching course occasions:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      participantId: registration?.participantId || "",
      courseOccasionId: registration?.courseOccasionId || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        if (registration) {
          await registrationApi.update(registration.id, values);
        } else {
          await registrationApi.create(values);
        }
        onSuccess();
      } catch (err) {
        setError(err.response?.data || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleParticipantChange = (e) => {
    formik.handleChange(e);
    const participantId = e.target.value;

    // Filter course occasions to show only available ones for this participant
    if (participantId) {
      // In a real app, you might want to check if the participant is already registered
      // For now, we'll show all occasions
      setFilteredOccasions(courseOccasions);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {registration ? "Edit Registration" : "Create New Registration"}
        </Card.Title>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Participant</Form.Label>
            <Form.Select
              name="participantId"
              value={formik.values.participantId}
              onChange={handleParticipantChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.participantId && formik.errors.participantId
              }
            >
              <option value="">Select a participant</option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.firstName} {participant.lastName} (
                  {participant.email})
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.participantId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course Occasion</Form.Label>
            <Form.Select
              name="courseOccasionId"
              value={formik.values.courseOccasionId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.courseOccasionId &&
                formik.errors.courseOccasionId
              }
            >
              <option value="">Select a course occasion</option>
              {filteredOccasions
                .filter((occasion) => !occasion.isFull) // Only show non-full occasions
                .map((occasion) => (
                  <option key={occasion.id} value={occasion.id}>
                    {occasion.course.name} -{" "}
                    {new Date(occasion.startDate).toLocaleDateString()}(
                    {occasion.currentParticipants}/{occasion.maxParticipants}{" "}
                    participants)
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.courseOccasionId}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading || !formik.isValid}
          >
            {loading ? "Saving..." : registration ? "Update" : "Register"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default RegistrationForm;
