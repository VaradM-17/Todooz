import axios from "axios";

const AUTH_BASE_URL = "http://localhost:8080/api/auth";

export const REGISTER_URL = (registerObj) =>
  axios.post(`${AUTH_BASE_URL}/register`, registerObj);

export const LOGIN_URL = (usernameOrEmail, password) =>
  axios.post(`${AUTH_BASE_URL}/login`, { usernameOrEmail, password });

export const storeToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role) => {
  sessionStorage.setItem("authenticatedUser", username);
  sessionStorage.setItem("role", role);
};

export const isUserLoggedIn = () =>
  sessionStorage.getItem("authenticatedUser") != null;

export const getLoggedInUser = () =>
  sessionStorage.getItem("authenticatedUser");

export const logout = () => {
  sessionStorage.clear();
  localStorage.clear();
};

export const isAdminUser = () =>
  sessionStorage.getItem("role") === "ROLE_ADMIN";
