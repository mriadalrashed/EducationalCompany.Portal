import axios from "axios";

// Use relative path since we're proxying through Vite
const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

// Course endpoints
export const courseApi = {
  getAll: (search = "") => api.get(`/courses?search=${search}`),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post("/courses", data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
};

// Course Occasion endpoints
export const courseOccasionApi = {
  getAll: () => api.get("/course-occasions"),
  getUpcoming: () => api.get("/course-occasions/upcoming"),
  getById: (id) => api.get(`/course-occasions/${id}`),
  create: (data) => api.post("/course-occasions", data),
  update: (id, data) => api.put(`/course-occasions/${id}`, data),
  delete: (id) => api.delete(`/course-occasions/${id}`),
  getWithRegistrations: (id) =>
    api.get(`/course-occasions/${id}/with-registrations`),
  getByCourseId: (courseId) => api.get(`/course-occasions/course/${courseId}`),
  checkIsFull: (id) => api.get(`/course-occasions/${id}/is-full`),
  assignTeacher: (id, teacherId) =>
    api.put(`/course-occasions/${id}/assign-teacher`, { teacherId }),
};

// Registration endpoints
export const registrationApi = {
  getAll: () => api.get("/registrations"),
  getById: (id) => api.get(`/registrations/${id}`),
  getDetails: (id) => api.get(`/registrations/${id}/details`),
  getByParticipantId: (participantId) =>
    api.get(`/registrations/participant/${participantId}`),
  getByOccasionId: (occasionId) =>
    api.get(`/registrations/occasion/${occasionId}`),
  create: (data) => api.post("/registrations", data),
  updateStatus: (id, status) =>
    api.put(`/registrations/${id}/status`, { status }),
  confirm: (id) => api.put(`/registrations/${id}/confirm`),
  cancel: (id) => api.put(`/registrations/${id}/cancel`),
  delete: (id) => api.delete(`/registrations/${id}`),
};

// Participant endpoints
export const participantApi = {
  getAll: (search = "") => api.get(`/participants?search=${search}`),
  getById: (id) => api.get(`/participants/${id}`),
  getWithRegistrations: (id) =>
    api.get(`/participants/${id}/with-registrations`),
  create: (data) => api.post("/participants", data),
  update: (id, data) => api.put(`/participants/${id}`, data),
  delete: (id) => api.delete(`/participants/${id}`),
};

// Teacher endpoints
export const teacherApi = {
  getAll: (search = "") => api.get(`/teachers?search=${search}`),
  getById: (id) => api.get(`/teachers/${id}`),
  getWithOccasions: (id) => api.get(`/teachers/${id}/with-occasions`),
  create: (data) => api.post("/teachers", data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

export default api;
