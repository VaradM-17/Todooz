import React, { useEffect, useState } from "react";
import {
  getAllTodos,
  deleteTodo,
  completed,
  incomplete,
} from "../services/TodoService";
import { useNavigate } from "react-router-dom";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listTodos();
  }, []);

  const listTodos = () => {
    getAllTodos()
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    deleteTodo(id)
      .then(() => listTodos())
      .catch(() => alert("Delete failed"));
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-primary" onClick={() => navigate("/add-todo")}>
          Add Todo
        </button>
      </div>

      <div className="row">
        {todos.map((todo) => (
          <div className="col-md-4 mb-4" key={todo.id}>
            <div className="card shadow-sm border-1 rounded-4 bg-light">
              <div className="card-body">
                <h5 className="card-title poppins-bold text-dark">{todo.title}</h5>

                <p className="card-text text-dark">{todo.description}</p>

                <span
                  className={`badge ${
                    todo.completed ? "bg-success" : "bg-warning text-dark"
                  } mb-3`}
                >
                  {todo.completed ? "Completed" : "Incomplete"}
                </span>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/update-todo/${todo.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => completed(todo.id).then(listTodos)}
                  >
                    ✓
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => incomplete(todo.id).then(listTodos)}
                  >
                    ✗
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-center mt-5">No todos found.</p>
      )}
    </div>
  );
};

export default ListTodo;
