import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { participantApi } from "../services/api";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

function ParticipantForm({ participant, onSuccess }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: participant?.firstName || "",
      lastName: participant?.lastName || "",
      email: participant?.email || "",
      phone: participant?.phone || "",
      address: participant?.address || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        if (participant) {
          await participantApi.update(participant.id, values);
        } else {
          await participantApi.create(values);
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
          {participant ? "Edit Participant" : "Create New Participant"}
        </Card.Title>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.lastName && formik.errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.phone && formik.errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.address && formik.errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading || !formik.isValid}
          >
            {loading ? "Saving..." : participant ? "Update" : "Create"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ParticipantForm;
