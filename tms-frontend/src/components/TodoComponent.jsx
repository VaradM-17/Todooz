import React, { useEffect, useState } from "react";
import { getTodo, saveTodo, updateTodo } from "../services/TodoService";
import { useNavigate, useParams } from "react-router-dom";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch todo by ID
  useEffect(() => {
    if (id) {
      getTodo(id)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  // Save or Update Todo
  function saveOrUpdateTodo(e) {
    e.preventDefault();
    const todo = { title, description, completed };

    if (id) {
      updateTodo(id, todo)
        .then((response) => {
          console.log(response.data);
          alert("Task Updated");
          navigate("/todos");
        })
        .catch((error) => {
          console.error(error);
          alert("Task Not Updated");
        });
    } else {
      saveTodo(todo)
        .then(() => {
          alert("Task Added");
          navigate("/todos");
        })
        .catch((error) => {
          console.error(error);
          alert("Task Not Added");
        });
    }
  }

  function pageTitle() {
    return (
      <h4 className="card-title text-center mb-4 fst-italic text-bold fs-2 text-secondary">
        {id ? "Update Task" : "Add New Task"}
      </h4>
    );
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: "30rem" }}>
        <form>
          {pageTitle()}
          <div className="form-group mb-3">
            <label className="form-label fs-5">Todo Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your todo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label fs-5">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Describe your task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="todoStatus" className="form-label fs-5">
              Status
            </label>
            <select
              id="todoStatus"
              className="form-select"
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
            >
              <option value="false">Incomplete</option>
              <option value="true">Completed</option>
            </select>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary fs-5"
              onClick={(e) => saveOrUpdateTodo(e)}
            >
              {id ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoComponent;
