import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { courseApi } from "../services/api";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  durationHours: Yup.number()
    .required("Duration is required")
    .min(1, "Duration must be at least 1 hour"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
});

function CourseForm({ course, onSuccess }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: course?.name || "",
      description: course?.description || "",
      durationHours: course?.durationHours || 0,
      price: course?.price || 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        if (course) {
          await courseApi.update(course.id, values);
        } else {
          await courseApi.create(values);
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
        <Card.Title>{course ? "Edit Course" : "Create New Course"}</Card.Title>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.description && formik.errors.description
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration (hours)</Form.Label>
            <Form.Control
              type="number"
              name="durationHours"
              value={formik.values.durationHours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.durationHours && formik.errors.durationHours
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.durationHours}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.price && formik.errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading || !formik.isValid}
          >
            {loading ? "Saving..." : course ? "Update" : "Create"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CourseForm;
