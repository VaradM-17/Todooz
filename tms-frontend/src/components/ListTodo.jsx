import React, { useEffect, useState } from "react";
import { getAllTodos } from "../services/TodoService";
import "../component style/ListTodo.scss";
import { useNavigate ,useParams} from "react-router-dom";

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
    navigate(`/update-todo/${id}`)
  }

  return (
    // <div className="container mt-5 bg-custom">
    //   <button className="btn btn-primary mb-3 btn-lg" onClick={addNewTodo}>
    //     Add Todo
    //   </button>
    //   <table className="table table-striped table-bordered text-center ">
    //     <thead>
    //       <tr className="fs-4 fst-italic">
    //         <th scope="col">Task Id</th>
    //         <th scope="col">Task</th>
    //         <th scope="col">Description</th>
    //         <th scope="col">Status</th>
    //         <th scope="col" colSpan={2}>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody className="fs-5">
    //       {todos.map((todo) => (
    //         <tr key={todo.id}>
    //           <td>{todo.id}</td>
    //           <td>{todo.title}</td>
    //           <td>{todo.description}</td>
    //           <td>{todo.completed ? "Completed" : "Incomplete"}</td>
    //           <td><button className="btn btn-primary" onClick={()=>updateTodo(todo.id)}>Update</button></td>
    //           <td><button className="btn btn-danger">Delete</button></td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>


    <div className="container mx-auto my-8 px-4 max-w-6xl">
  <button className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2" onClick={addNewTodo}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
    <span>Add Todo</span>
  </button>
  
  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg bg-white">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
          <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center">Task Id</th>
          <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center">Task</th>
          <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center">Description</th>
          <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center">Status</th>
          <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-center" colSpan={2}>Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {todos.map((todo) => (
          <tr key={todo.id} className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-center">{todo.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center font-medium text-gray-800">{todo.title}</td>
            <td className="px-6 py-4 text-center text-gray-600">{todo.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                todo.completed 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {todo.completed ? "Completed" : "Incomplete"}
              </span>
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-center">
              <button 
                onClick={() => updateTodo(todo.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200"
              >
                Update
              </button>
            </td>
            <td className="px-3 py-4 whitespace-nowrap text-center">
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-300 focus:outline-none transition-all duration-200">
                Delete
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
