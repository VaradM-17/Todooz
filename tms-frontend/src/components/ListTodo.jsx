import React, { useEffect, useState } from "react";
import { getAllTodos, deleteTodo } from "../services/TodoService";
import "../component style/ListTodo.scss";
import { useNavigate } from "react-router-dom";

const ListTodo = () => {
  // set variables
  const [todos, setTodos] = useState([]);

  // use navigate
  const navigate = useNavigate();

  // Fetch
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
  // Add Todo
  function addNewTodo() {
    navigate("/add-todo");
  }

  //update Todo
  function updateTodo(id) {
    console.log(id);
    navigate(`/update-todo/${id}`);
  }

  // delete Todo
  function removeTodo(id) {
    deleteTodo(id)
      .then(() => {
        alert("Task Deleted");
        listTodos();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to Delete Task");
      });
  }

  return (
    <div className="container mt-5 bg-custom">
      <button className="btn btn-primary mb-3 btn-lg" onClick={addNewTodo}>
        Add Todo
      </button>
      <table className="table table-striped table-bordered text-center ">
        <thead>
          <tr className="fs-4 fst-italic">
            <th scope="col">Task Id</th>
            <th scope="col">Task</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="fs-5">
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.completed ? "Completed" : "Incomplete"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => updateTodo(todo.id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
