import React, { useEffect, useState } from "react";
import { getAllTodos } from "../services/TodoService";
import "../component style/ListTodo.scss";

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
    <div className="container mt-5">
      <button className="btn btn-success mb-3 btn-lg">Add Todo</button>
      <table className="table table-striped table-bordered text-center ">
        <thead>
          <tr className="fs-4 fst-italic">
            <th scope="col">Task Id</th>
            <th scope="col">Task</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody className="fs-5">
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.complete ? "Complete" : "Incomplete"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
