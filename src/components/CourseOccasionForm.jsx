import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { courseOccasionApi, courseApi, teacherApi } from "../services/api";

const validationSchema = Yup.object({
  courseId: Yup.string().required("Course is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
  maxParticipants: Yup.number()
    .required("Max participants is required")
    .min(1, "Must have at least 1 participant"),
});

function CourseOccasionForm({ occasion, onSuccess }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseApi.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await teacherApi.getAll();
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      courseId: occasion?.courseId || "",
      startDate: occasion
        ? new Date(occasion.startDate).toISOString().slice(0, 16)
        : "",
      endDate: occasion
        ? new Date(occasion.endDate).toISOString().slice(0, 16)
        : "",
      maxParticipants: occasion?.maxParticipants || 10,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        const formattedValues = {
          ...values,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
        };

        if (occasion) {
          await courseOccasionApi.update(occasion.id, formattedValues);
        } else {
          await courseOccasionApi.create(formattedValues);
        }
        onSuccess();
      } catch (err) {
        setError(err.response?.data || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {occasion ? "Edit Course Occasion" : "Create New Course Occasion"}
        </Card.Title>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Select
              name="courseId"
              value={formik.values.courseId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.courseId && formik.errors.courseId}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.courseId}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.startDate && formik.errors.startDate
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.startDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>End Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.endDate && formik.errors.endDate}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.endDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Maximum Participants</Form.Label>
            <Form.Control
              type="number"
              name="maxParticipants"
              value={formik.values.maxParticipants}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.maxParticipants && formik.errors.maxParticipants
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.maxParticipants}
            </Form.Control.Feedback>
          </Form.Group>

          {occasion && teachers.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>Assign Teacher</Form.Label>
              <Form.Select
                defaultValue={occasion.teacherId || ""}
                onChange={async (e) => {
                  try {
                    await courseOccasionApi.assignTeacher(
                      occasion.id,
                      e.target.value,
                    );
                    alert("Teacher assigned successfully");
                  } catch (err) {
                    setError(err.response?.data || "Failed to assign teacher");
                  }
                }}
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName} -{" "}
                    {teacher.specialization}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={loading || !formik.isValid}
          >
            {loading ? "Saving..." : occasion ? "Update" : "Create"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CourseOccasionForm;
