import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_URL,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLoginData(e) {
    e.preventDefault();
    if (!usernameOrEmail || !password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await LOGIN_URL(usernameOrEmail, password);
      const token = response.data.accessToken; // store raw token
      const role = response.data.role;

      storeToken(token);
      saveLoggedInUser(usernameOrEmail, role);

      toast.success("Login successful! Welcome back.");
      navigate("/todos");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Check your credentials.");
    }
  }

  return (
    <div className="container my-5 col-md-4 offset-md-4 card p-4 shadow-lg text-center">
      <h2 className="m-3">Login</h2>
      <form onSubmit={handleLoginData}>
        <div className="row mb-3 mt-3">
          <label htmlFor="usernameOrEmail" className="col-md-3 control-label">
            Username / Email
          </label>
          <div className="col-md-9">
            <input
              type="text"
              id="usernameOrEmail"
              className="form-control"
              placeholder="Enter your username or email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="password" className="col-md-3 control-label">
            Password
          </label>
          <div className="col-md-9">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="offset-md-3 col-md-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
