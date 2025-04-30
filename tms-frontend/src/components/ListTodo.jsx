import React, { useEffect, useState } from "react";
import { getAllTodos } from "../services/TodoService";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-5 fw-bold">Your Tasks</h1>
      <table className="table table-striped table-bordered text-center">
        <thead>
          <tr className="fs-4">
            <th scope="col">Todo Title</th>
            <th scope="col">Todo Description</th>
            <th scope="col">Todo Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.complete ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
