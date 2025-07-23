import axios from "axios";

const BASE_URL = "http://localhost:8080/todos";

export const getAllTodos = () => axios.get(`${BASE_URL}/get-all-todos`);

export const saveTodo = (todo) => axios.post(`${BASE_URL}/add-todo`, todo);

export const updateTodo = (id, todo) => axios.put(`${BASE_URL}/update-todo/${id}`, todo);

export const getTodo = (id) => axios.get(`${BASE_URL}/get-todo/${id}`);

export const deleteTodo = (id) => axios.delete(`${BASE_URL}/delete-todo/${id}`);

export const completed = (id) => axios.patch(`${BASE_URL}/completed-todo/${id}`);

export const incomplete = (id)=> axios.patch(`${BASE_URL}/incomplete-todo/${id}`)
