import { Routes, Route, Navigate } from "react-router-dom";
import TodoApp from "./TodoApp";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={currentUser ? <TodoApp /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;