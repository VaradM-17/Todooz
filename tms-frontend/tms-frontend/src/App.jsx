import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ListTodo from "./components/ListTodo";
import TodoComponent from "./components/TodoComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListTodo />} />
          <Route path="/add-todo" element={<TodoComponent/>} />
          <Route path="/update-todo/:id" element={<TodoComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
