import React, { useEffect, useState } from "react";
import {
  deleteTodo,
  fetchTodos as listTodos,
  todoCompleted,
  todoPending,
} from "../services/TodosServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAdminUser } from "../services/AuthService";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();

  // fetch todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  // local function to fetch todos and update state
  function loadTodos() {
    listTodos()
      .then((response) => {
        setTodos(response.data.content);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load todos!");
      });
  }

  // add todo
  function addTodo() {
    navigate("/add-todo");
  }

  // update todo
  function updateTodo(id) {
    navigate(`/update-todo/${id}`);
  }

  // delete todo
  function removeTodo(id) {
    deleteTodo(id)
      .then(() => {
        loadTodos();
        toast.success("Task deleted successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong while deleting!");
      });
  }

  // toggle todo status
  function toggleStatus(todo) {
    const action = todo.completed ? todoPending : todoCompleted;
    action(todo.id)
      .then(() => {
        loadTodos();
        toast.success(
          todo.completed
            ? "Task marked as pending!"
            : "Congratulations! Task completed!"
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong while updating status!");
      });
  }

  return (
    <div>
      <div className="container my-5">
        {isAdmin && (
          <button className="btn btn-primary mb-3" onClick={addTodo}>
            Add Task
          </button>
        )}

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "Completed" : "Pending"}</td>
                <td className="text-center">
                  {/* update */}
                  {isAdmin && (
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => updateTodo(todo.id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}

                  {/* delete */}
                  {isAdmin && (
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => removeTodo(todo.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}

                  {/* toggle status */}
                  <button
                    className={`btn ${
                      todo.completed ? "btn-warning" : "btn-success"
                    } btn-sm`}
                    onClick={() => toggleStatus(todo)}
                  >
                    Mark
                    {todo.completed ? (
                      <i className="bi bi-x"></i>
                    ) : (
                      <i className="bi bi-check"></i>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodos;
