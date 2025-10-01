import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import ListTodos from "./components/ListTodos";
import AddTodo from "./components/AddTodo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { isUserLoggedIn } from "./services/AuthService";

function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn; // check if user is logged in

    if (!isAuth) {
      return <LoginForm />;
    }
    return children;
  }

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/add-todo"
          element={
            <AuthenticatedRoute>
              <AddTodo />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/update-todo/:id"
          element={
            <AuthenticatedRoute>
              <AddTodo />
            </AuthenticatedRoute>
          }
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/todos"
          element={
            <AuthenticatedRoute>
              <ListTodos />
            </AuthenticatedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
