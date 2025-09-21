import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, storeToken } from "../services/AuthService";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleLoginData(e) {
    e.preventDefault();
    console.log("Login data submitted:", formData);
    if (!formData.usernameOrEmail || !formData.password) {
      alert("Please fill in all fields!");
      return;
    }

    LOGIN_URL(formData.usernameOrEmail, formData.password)
      .then((response) => {
        console.log(response.data);

        const token =
          "Basic " +
          window.btoa(formData.usernameOrEmail + ":" + formData.password);
        storeToken(token);

        // saveLoggedInUser(formData.usernameOrEmail);
        toast.success("Login successful! Welcome back.");
        navigate("/todos");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const data = error.response.data;
          if (data.message) {
            alert(data.message);
          } else {
            const messages = Object.values(data).join("\n");
            alert(messages);
          }
        } else {
          alert("Something went wrong!");
        }
      });
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
              value={formData.usernameOrEmail}
              onChange={(e) =>
                setFormData({ ...formData, usernameOrEmail: e.target.value })
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
