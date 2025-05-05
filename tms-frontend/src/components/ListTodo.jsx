import React, { useEffect, useState } from "react";
import {
  getAllTodos,
  deleteTodo,
  completed,
  incomplete,
} from "../services/TodoService";
import "../component style/ListTodo.scss";
import { useNavigate } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

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

  function addNewTodo() {
    navigate("/add-todo");
  }

  function updateTodo(id) {
    navigate(`/update-todo/${id}`);
  }

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

  function markAsCompleted(id) {
    completed(id)
      .then(() => {
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function markAsInCompleted(id) {
    incomplete(id)
      .then(() => {
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container mx-auto my-8 px-4 max-w-6xl">
      <button
        className="mb-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        onClick={addNewTodo}
      >
        <PlusIcon className="h-5 w-5" />
        <span>Add Todo</span>
      </button>

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center">
                Task Id
              </th>
              <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center">
                Task
              </th>
              <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center">
                Description
              </th>
              <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center">
                Status
              </th>
              <th
                className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center"
                colSpan={4}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {todos.map((todo) => (
              <tr
                key={todo.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 text-center">{todo.id}</td>
                <td className="px-6 py-4 text-center font-medium text-gray-800">
                  {todo.title}
                </td>
                <td className="px-6 py-4 text-center text-gray-600">
                  {todo.description}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      todo.completed
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {todo.completed ? "Completed" : "Incomplete"}
                  </span>
                </td>
                <td className="px-3 py-4 text-center">
                  <button
                    onClick={() => updateTodo(todo.id)}
                    className="text-blue-600 hover:text-blue-800 transition-all duration-200"
                  >
                    <PencilSquareIcon
                      className="h-6 w-6 inline"
                      title="Update"
                    />
                  </button>
                </td>
                <td className="px-3 py-4 text-center">
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="text-red-600 hover:text-red-800 transition-all duration-200"
                  >
                    <TrashIcon className="h-6 w-6 inline" title="Delete" />
                  </button>
                </td>

                {/* mark as task completed */}
                <td className="px-3 py-4 text-center">
                  <button
                    onClick={() => markAsCompleted(todo.id)}
                    className="text-green-600 hover:text-green-800 transition-all duration-200"
                  >
                    <CheckCircleIcon
                      className="h-6 w-6 inline"
                      title="Mark as Completed"
                    />
                  </button>
                </td>

                {/* mark as task In-Completed */}
                <td className="px-3 py-4 text-center">
                  <button
                    onClick={() => markAsInCompleted(todo.id)}
                    className="text-yellow-600 hover:text-yellow-800 transition-all duration-200"
                  >
                    <XCircleIcon
                      className="h-6 w-6 inline"
                      title="Mark as Incompleted"
                    />
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

export default ListTodo;
