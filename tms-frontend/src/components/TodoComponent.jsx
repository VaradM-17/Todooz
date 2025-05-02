import React, { useState } from "react";
import { saveTodo } from "../services/TodoService";
import { useNavigate } from "react-router-dom";

const TodoComponent = () => {
  // state variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  // use navigate
  const navigate = useNavigate();

  // saveTodo function
  function saveOrUpdateTodo(e) {
    e.preventDefault();
    const todo = { title, description, completed };

    // call save todo from service
    saveTodo(todo)
      .then((response) => {
        console.log(response.data);
        alert("Todo Added")
        navigate("/todos");
      })
      .catch((error) => {
        alert("Todo Not Added")
        console.error(error);
      });
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: "30rem" }}>
        <h4 className="card-title text-center mb-4 fst-italic text-bold fs-2 text-secondary">
          Add New Task
        </h4>
        <form>
          {/* title */}
          <div className="form-group mb-3">
            <label className="form-label fs-4">Todo Title</label>
            <input
              type="text"
              className="form-control"
              id="todoTitle"
              placeholder="Enter your todo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* description */}
          <div className="form-group mb-3">
            <label className="form-label fs-4">Description</label>
            <textarea
              className="form-control"
              id="todoDesc"
              rows="3"
              placeholder="Describe your task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {/* status */}
          <div className="form-group mb-3">
            <label className="form-label fs-4">Todo Status</label>

            <select
              className="form-group mb-3"
              value={completed}
              onChange={(e) => setCompleted(e.target.value === "true")} // convert to boolean === true
            >
              <option value="false">Incomplete</option>
              <option value="true">Completed</option>
            </select>
          </div>

          {/* button */}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary fs-5"
              onClick={(e) => saveOrUpdateTodo(e)}
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoComponent;
