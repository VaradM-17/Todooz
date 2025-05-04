import React, { useEffect, useState } from "react";
import { getTodo, saveTodo, updateTodo } from "../services/TodoService";
import { useNavigate, useParams } from "react-router-dom";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch todo by ID
  useEffect(() => {
    if (id) {
      getTodo(id)
        .then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  // Save or Update Todo
  function saveOrUpdateTodo(e) {
    e.preventDefault();
    const todo = { title, description, completed };

    if (id) {
      updateTodo(id, todo)
        .then((response) => {
          console.log(response.data);
          alert("Task Updated");
          navigate("/todos");
        })
        .catch((error) => {
          console.error(error);
          alert("Task Not Updated");
        });
    } else {
      saveTodo(todo)
        .then(() => {
          alert("Task Added");
          navigate("/todos");
        })
        .catch((error) => {
          console.error(error);
          alert("Task Not Added");
        });
    }
  }

  function pageTitle() {
    return (
      <h4 className="card-title text-center text-black mb-4 text-bold fs-2 text-secondary">
        {id ? "Update Task" : "Add New Task"}
      </h4>
    );
  }

  return (
    // <div className="container mt-5 d-flex justify-content-center">
    //   <div className="card shadow p-4" style={{ width: "30rem" }}>
    //     <form>
    //       {pageTitle()}
    //       <div className="form-group mb-3">
    //         <label className="form-label fs-5">Todo Title</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Enter your todo"
    //           value={title}
    //           onChange={(e) => setTitle(e.target.value)}
    //         />
    //       </div>

    //       <div className="form-group mb-3">
    //         <label className="form-label fs-5">Description</label>
    //         <textarea
    //           className="form-control"
    //           rows="3"
    //           placeholder="Describe your task"
    //           value={description}
    //           onChange={(e) => setDescription(e.target.value)}
    //         ></textarea>
    //       </div>

    //       <div className="mb-3">
    //         <label htmlFor="todoStatus" className="form-label fs-5">
    //           Status
    //         </label>
    //         <select
    //           id="todoStatus"
    //           className="form-select"
    //           value={completed}
    //           onChange={(e) => setCompleted(e.target.value)}
    //         >
    //           <option value="false">Incomplete</option>
    //           <option value="true">Completed</option>
    //         </select>
    //       </div>

    //       <div className="d-flex justify-content-center">
    //         <button
    //           type="submit"
    //           className="btn btn-primary fs-5"
    //           onClick={(e) => saveOrUpdateTodo(e)}
    //         >
    //           {id ? "Update Todo" : "Add Todo"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div>
      <form className="max-w-sm mx-auto p-8 gap-1 bg-white rounded-xl shadow-lg border border-gray-200 my-8">
    {pageTitle()}

    {/* <!-- To-do Title --> */}
    <div className="mb-5">
        <label className="block mb-2 text-sm font-semibold text-gray-700">To-do Title</label>
        <input type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900" placeholder="Enter task" required />
    </div>

    {/* <!-- Description --> */}
    <div className="mb-5">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Description</label>
        <textarea
        rows="3"
        placeholder="Describe your task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="password" id="password" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 resize-none" required />
    </div>

    {/* <!-- Select-option --> */}
    <div className="mb-5">
        <label htmlFor="todoStatus" className="block mb-2 text-sm font-semibold text-gray-700">Status</label>
        <select
            id="todoStatus"
            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}>
            <option value="false">Incomplete</option>
            <option value="true">Completed</option>
        </select>
    </div>

    <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200 flex items-center justify-center space-x-2">
        <span>Add Task</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
    </button>
</form>
    </div>
  );
};

export default TodoComponent;
