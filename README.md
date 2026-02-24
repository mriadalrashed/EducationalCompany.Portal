# 🎓 EducationalCompany.Portal

A production-structured React administrative portal for managing an Educational Company ecosystem.

This application provides full CRUD workflows for Courses, Course Occasions, Teachers, Participants, and Registrations, and integrates with a Clean Architecture .NET backend via a structured service layer.

---

# 🧭 System Context

EducationalCompany.Portal is the frontend presentation layer of a larger system:

Frontend (React)  
⬇  
Backend API (ASP.NET Core – Layered Architecture)  
⬇  
Database

The frontend is intentionally designed to remain:

- UI-focused
- API-driven
- Stateless beyond component state
- Decoupled from backend implementation details

---

# 🏗️ Architectural Overview

## 1️⃣ Layered Frontend Structure

```
Pages → Components → Services → API
```

### Pages Layer (`src/pages`)

Responsible for:

- Route-level rendering
- Page composition
- Orchestrating components

No direct HTTP logic exists here.

---

### Components Layer (`src/components`)

Responsible for:

- Form handling
- Data rendering
- Reusable UI logic
- Local state management

Forms are implemented using:

- **Formik** (state handling)
- **Yup** (schema validation)

This ensures:

- Declarative validation
- Controlled inputs
- Predictable form state

---

### Services Layer (`src/services/api.js`)

Responsible for:

- Centralized HTTP communication
- Axios configuration
- Request/response interceptors
- Endpoint abstraction

This isolates the UI from backend contract changes.

---

# 🔌 API Communication Strategy

## Base Configuration

```javascript
const API_BASE_URL = "/api";
```

The application uses a **Vite development proxy**, meaning:

- Frontend calls `/api/...`
- Vite forwards to backend
- Avoids CORS complexity in development

---

## Axios Interceptors

The application uses Axios interceptors to:

- Log requests
- Handle global errors
- Maintain consistent response handling

This pattern enables:

- Centralized error control
- Future token injection
- Observability expansion

---

# 📡 Implemented Domain Modules

## Courses

- Searchable listing
- Full CRUD operations
- Metadata display (duration, pricing)

## Course Occasions

- Upcoming filter
- Teacher assignment
- Capacity status check
- Registration aggregation

## Registrations

- Status lifecycle management
- Confirm / Cancel transitions
- Participant-occasion relationship handling

## Participants

- Searchable CRUD
- View with related registrations

## Teachers

- Searchable CRUD
- View with assigned occasions

---

# 🧠 Engineering Decisions

### Why Service Layer?

To:

- Avoid direct Axios usage inside components
- Support future migration to different HTTP clients
- Simplify testing and mocking

---

### Why Formik + Yup?

To:

- Maintain declarative validation schemas
- Prevent uncontrolled form state
- Reduce manual validation logic

---

### Why Modular Folder Structure?

To:

- Scale feature-by-feature
- Support domain-based refactoring later
- Improve onboarding readability

---

# 🗂️ Project Structure

```
src/
│
├── components/      # Reusable UI & forms
├── pages/           # Route-level composition
├── services/        # API abstraction layer
├── assets/
│
├── App.jsx          # Router configuration
├── main.jsx         # Application bootstrap
└── index.css
```

---

# ⚙️ Installation

```bash
git clone https://github.com/mriadalrashed/EducationalCompany.Portal.git
cd EducationalCompany.Portal
npm install
npm run dev
```

---

# 🏗️ Production Build

```bash
npm run build
```

Output: `dist/`

# 🧩 Backend Compatibility

Designed to integrate with:

**EducationalCompany.Api**

- Clean Architecture (.NET)
- Layered separation
- RESTful endpoints

The frontend remains agnostic to backend internal layering.

---

# 📄 License

Academic project demonstrating proficiency in C#, database architecture, layered system design, and automated testing.
