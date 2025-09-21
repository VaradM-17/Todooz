import axios from "axios";

const AUTH_BASE_URL = "http://localhost:8080/api/auth";

export const REGISTER_URL = (registerObj) =>
  axios.post(`${AUTH_BASE_URL}/register`, registerObj);
export const LOGIN_URL = (usernameOrEmail, password) =>
  axios.post(`${AUTH_BASE_URL}/login`, { usernameOrEmail, password });

// store token in local storage
export const storeToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

// // display links as per user authentication in header
// export const saveLoggedInUser = (username) =>
//   sessionStorage.setItem("authenticatedUser", username);

// export const isUserLoggedIn = (username) => {
//   sessionStorage.getItem("authenticatedUser");
//   if (username == null) {
//     return false;
//   } else {
//     return true;
//   }
// };

// export const getLoggedInUser = () => {
//   const username = sessionStorage.getItem("authenticatedUser");
//   return username;
// };
