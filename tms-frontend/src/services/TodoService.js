import axios from "axios";

const BASE_URL = "http://localhost:8080/todos";

export const getAllTodos = () => axios.get(`${BASE_URL}/getAllTodos`);
