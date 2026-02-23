import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import CoursesPage from "./pages/CoursesPage";
import CourseOccasionsPage from "./pages/CourseOccasionsPage";
import RegistrationsPage from "./pages/RegistrationsPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import TeachersPage from "./pages/TeachersPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Educational Company
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/courses">
                  Courses
                </Nav.Link>
                <Nav.Link as={Link} to="/course-occasions">
                  Course Occasions
                </Nav.Link>
                <Nav.Link as={Link} to="/registrations">
                  Registrations
                </Nav.Link>
                <Nav.Link as={Link} to="/participants">
                  Participants
                </Nav.Link>
                <Nav.Link as={Link} to="/teachers">
                  Teachers
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<CourseOccasionsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course-occasions" element={<CourseOccasionsPage />} />
            <Route path="/registrations" element={<RegistrationsPage />} />
            <Route path="/participants" element={<ParticipantsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
