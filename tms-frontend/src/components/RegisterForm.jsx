import React, { useState } from "react";
import { REGISTER_URL } from "../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // validation
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill in all fields!");
      return;
    }

    REGISTER_URL(formData)
      .then((response) => {
        console.log(response.data);
        // alert("Registration successful!");
        toast.success("Registration successful! You can now log in.");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const data = error.response.data;
          if (data.message) {
            // Custom exception
            alert(data.message);
          } else {
            // Validation errors
            const messages = Object.values(data).join("\n");
            alert(messages);
          }
        } else {
          alert("Something went wrong!");
        }
      });
  };

  return (
    <div className="container my-5 ">
      <div className="row mt-5 mb-3 g-3 ">
        <div className="col-md-5 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h4 className="m-2 text-center fw-bold">Register Here</h4>
            </div>
            <div className="card-body">
              {/* connect submit */}
              <form onSubmit={handleSubmit}>
                {/* name */}
                <div className="row mb-3">
                  <label htmlFor="name" className="col-md-3 control-label">
                    Name
                  </label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* username */}
                <div className="row mb-3">
                  <label htmlFor="username" className="col-md-3 control-label">
                    Username
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* email */}
                <div className="row mb-3">
                  <label htmlFor="email" className="col-md-3 control-label">
                    Email
                  </label>
                  <div className="col-md-9">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* password */}
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

                {/* submit button */}
                <div className="form-group text-center mb-3">
                  <button type="submit" className="btn btn-primary w-50">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
