import axios from "axios";
import { getToken } from "./AuthService";

const TODO_BASE_URL = "http://localhost:8080/api/todos";

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchTodos = () => axios.get(TODO_BASE_URL);
export const createTodo = (todo) => axios.post(`${TODO_BASE_URL}/todo`, todo);
export const fetchTodoById = (id) => axios.get(`${TODO_BASE_URL}/${id}`);
export const editTodo = (id, todo) => axios.put(`${TODO_BASE_URL}/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${TODO_BASE_URL}/${id}`);
export const todoCompleted = (id) =>
  axios.patch(`${TODO_BASE_URL}/complete/${id}`);
export const todoPending = (id) =>
  axios.patch(`${TODO_BASE_URL}/incomplete/${id}`);
