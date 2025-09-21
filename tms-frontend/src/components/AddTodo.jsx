import React, { useEffect, useState } from "react";
import { createTodo, editTodo, fetchTodoById } from "../services/TodosServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // add todo
  function saveOrUpdateTodo(e) {
    e.preventDefault();

    const newTodo = { title, description, completed };

    if (id) {
      editTodo(id, newTodo)
        .then((response) => {
          console.log("Todo updated successfully", response.data);
          setTitle("");
          setDescription("");
          setCompleted(false);
          toast.success("Task updated successfully!");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
          alert("Failed to update task. Please try again.");
        });
    } else {
      createTodo(newTodo)
        .then((response) => {
          setTitle("");
          setDescription("");
          setCompleted(false);
          // alert("Task added successfully!");
          toast.success("Task added successfully!");
          navigate("/");
        })
        .catch((error) => {
          // alert("Failed to add task. Please try again.");
          toast.error("Failed to add task. Please try again.");
        });
    }
  }

  function titleChangeHandler(id) {
    if (id) {
      return <h3 className="text-center">Update Task</h3>;
    } else {
      return <h3 className="text-center">Add Task</h3>;
    }
  }

  useEffect(() => {
    if (id) {
      fetchTodoById(id)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg border-0" style={{ width: "35rem" }}>
        <div className="card-body">
          <h3 className="card-title mt- mb-3 text-secondary">
            {titleChangeHandler(id)}
          </h3>
          <form onSubmit={saveOrUpdateTodo}>
            <div className="mb-4">
              <label className="form-label fw-bold">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <label className="form-check-label">Mark as Completed</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-1">
              {id ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
