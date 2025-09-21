import axios from "axios";
import { getToken } from "./AuthService";

const baseUrl = "http://localhost:8080/api/todos";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchTodos = () => axios.get(baseUrl);
export const createTodo = (todo) => axios.post(`${baseUrl}/add-todo`, todo);
export const fetchTodoById = (id) => axios.get(`${baseUrl}/get-todo/${id}`);
export const editTodo = (id, todo) =>
  axios.put(`${baseUrl}/update-todo/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${baseUrl}/delete-todo/${id}`);
export const todoCompleted = (id) =>
  axios.patch(`${baseUrl}/completed-todo/${id}`);
export const todoPending = (id) =>
  axios.patch(`${baseUrl}/incomplete-todo/${id}`);
