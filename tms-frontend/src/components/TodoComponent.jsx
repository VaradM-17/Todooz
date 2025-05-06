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
          navigate("/todos");
        })
        .catch(() => alert("Task Not Updated"));
    } else {
      saveTodo(todo)
        .then(() => {
          alert("Task Added");
          navigate("/todos");
        })
        .catch(() => alert("Task Not Added"));
    }
  }

  function pageTitle() {
    return (
      <h4 className="text-center text-black mb-4 text-2xl font-semibold text-secondary">
        {id ? "Update Task" : "Add New Task"}
      </h4>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cool-gray-100">
      <form
        onSubmit={saveOrUpdateTodo}
        className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-200"
      >
        {pageTitle()}

        {/* Task Field */}
        <div className="mb-4">
          <label className="block mb-1 text-base font-semibold text-gray-700">
            Task Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900`}
            placeholder="Enter task"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block mb-1 text-base font-semibold text-gray-700">
            Description
          </label>
          <textarea
            rows="3"
            placeholder="Describe your task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 resize-none`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Status Field */}
        <div className="mb-4">
          <label
            htmlFor="todoStatus"
            className="block mb-1 text-base font-semibold text-gray-700"
          >
            Status
          </label>
          <select
            id="todoStatus"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            value={completed}
            onChange={(e) => setCompleted(e.target.value === "true")}
          >
            <option value="false">Incomplete</option>
            <option value="true">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-50 mx-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>{id ? "Update Todo" : "Add Todo"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default TodoComponent;
