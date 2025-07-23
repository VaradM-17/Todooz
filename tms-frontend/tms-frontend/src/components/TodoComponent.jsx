import React, { useEffect, useState } from "react";
import { getTodo, saveTodo, updateTodo } from "../services/TodoService";
import { useNavigate, useParams } from "react-router-dom";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const [errors, setErrors] = useState({ title: "", description: "" });

  const validateForm = () => {
    let isValid = true;
    const errorsCopy = { title: "", description: "" };

    if (!title.trim()) {
      errorsCopy.title = "Title is required";
      isValid = false;
    }

    if (!description.trim()) {
      errorsCopy.description = "Description is required";
      isValid = false;
    }

    setErrors(errorsCopy);
    return isValid;
  };

  function saveOrUpdateTodo(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const todo = { title, description, completed };

    if (id) {
      updateTodo(id, todo)
        .then(() => {
          alert("Task Updated");
          navigate("/");
        })
        .catch(() => alert("Task Not Updated"));
    } else {
      saveTodo(todo)
        .then(() => {
          alert("Task Added");
          navigate("/");
        })
        .catch(() => alert("Task Not Added"));
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={saveOrUpdateTodo}
        className="w-100 p-4 bg-white rounded shadow-sm border"
        style={{ maxWidth: "600px" }}
      >
        <h4 className="text-center text-secondary mb-4">
          {id ? "Update Task" : "Add New Task"}
        </h4>

        <div className="mb-3">
          <label className="form-label">Task Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            placeholder="Enter task"
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            placeholder="Describe your task"
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={completed}
            onChange={(e) => setCompleted(e.target.value === "true")}
          >
            <option value="false">Incomplete</option>
            <option value="true">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
          <span>{id ? "Update Todo" : "Add Todo"}</span>
          <i className="bi bi-plus-circle"></i>
        </button>
      </form>
    </div>
  );
};

export default TodoComponent;
