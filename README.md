# 🎓 EducationalCompany.Portal

A production-structured React administrative portal for managing the EducationalCompany ecosystem.

This application provides full CRUD workflows for Courses, Course Occasions, Teachers, Participants, and Registrations, and integrates with a Clean Architecture .NET backend via a structured service layer.

---

## 🌍 Full System

This frontend is part of a full-stack system.

👉 Backend Repository:  
https://github.com/mriadalrashed/EducationalCompany.Api

Frontend (React + Vite)  
⬇  
ASP.NET Core Minimal API  
⬇  
PostgreSQL Database  

---

## 🧭 System Context

EducationalCompany.Portal is the frontend presentation layer of a larger system.

The frontend is intentionally designed to remain:

- UI-focused
- API-driven
- Stateless beyond component-level state
- Decoupled from backend implementation details

---

## 🏗️ Architectural Overview

### Layered Frontend Structure

```
Pages → Components → Services → API
```

---

### 📄 Pages Layer (`src/pages`)

Responsible for:

- Route-level rendering
- Page composition
- Orchestrating components

No direct HTTP logic exists here.

---

### 🧩 Components Layer (`src/components`)

Responsible for:

- Form handling
- Data rendering
- Reusable UI logic
- Local state management

Forms are implemented using:

- **Formik** (form state management)
- **Yup** (schema-based validation)

This ensures:

- Declarative validation
- Controlled inputs
- Predictable form state

---

### 🔌 Services Layer (`src/services/api.js`)

Responsible for:

- Centralized HTTP communication
- Axios configuration
- Request/response interceptors
- Endpoint abstraction

This isolates the UI from backend contract changes.

---

## 🔄 API Communication Strategy

### Base Configuration

```javascript
const API_BASE_URL = "/api";
```

The application uses a **Vite development proxy**, meaning:

- Frontend calls `/api/...`
- Vite forwards to backend
- Avoids CORS issues during development

---

### Axios Interceptors

Axios interceptors are used to:

- Log requests
- Handle global errors
- Maintain consistent response handling

This enables:

- Centralized error control
- Future token injection
- Improved observability

---

## 📡 Implemented Domain Modules

### 📚 Courses
- Searchable listing
- Full CRUD operations
- Metadata display (duration, pricing)

### 📅 Course Occasions
- Upcoming filter
- Teacher assignment
- Capacity status check
- Registration aggregation

### 📝 Registrations
- Status lifecycle management
- Confirm / Cancel transitions
- Participant–occasion relationship handling

### 👨‍🎓 Participants
- Searchable CRUD
- View with related registrations

### 🧑‍🏫 Teachers
- Searchable CRUD
- View with assigned occasions

---

## 🗂️ Project Structure

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

## 📸 Application Preview

### Courses Management
![Courses Page](./screenshots/Dashboard.jpg)

---

## ⚙️ Installation

```bash
git clone https://github.com/mriadalrashed/EducationalCompany.Portal.git
cd EducationalCompany.Portal
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

⚠️ Ensure the backend API is running before starting the frontend.

---

## 🏗️ Production Build

```bash
npm run build
```

Output directory:

```
dist/
```

---

## 🔗 Backend Compatibility

Designed to integrate with:

**EducationalCompany.Api**

- Clean Architecture (.NET)
- Layered separation
- RESTful endpoints
- PostgreSQL database

The frontend remains agnostic to backend internal implementation details.

---

## 📘 About This Project

Developed as part of an academic software engineering course, this project demonstrates practical proficiency in modern React development, REST API integration, modular frontend architecture, and real-world CRUD workflow implementation.

---

## 📄 License

This project is for academic and educational purposes only.
