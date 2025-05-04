import "./App.css";
import ListTodo from "./components/ListTodo";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoComponent from "./components/TodoComponent";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path="/" element={<ListTodo></ListTodo>}></Route>
          <Route path="/todos" element={<ListTodo></ListTodo>}></Route>

          <Route path="/add-todo" element={<TodoComponent></TodoComponent>}></Route>

          <Route path="/update-todo/:id" element={<TodoComponent></TodoComponent>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
