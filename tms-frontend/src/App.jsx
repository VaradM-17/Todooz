import "./App.css";
import ListTodo from "./components/ListTodo";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoComponent from "./components/TodoComponent";

function App() {
  return (
    <div className="min-h-screen 	bg-cool-gray-100">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListTodo />} />
          <Route path="/todos" element={<ListTodo />} />
          <Route path="/add-todo" element={<TodoComponent />} />
          <Route path="/update-todo/:id" element={<TodoComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
