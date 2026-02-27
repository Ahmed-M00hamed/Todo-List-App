import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TodoApp from "./TodoApp";
import Login from "./components/Login";
import Register from "./components/Register";
import LoaderWrapper from "./components/Loader/LoaderWrapper";

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  return (
    <LoaderWrapper>
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
        <Route
          path="/"
          element={currentUser ? <TodoApp onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
      </Routes>
    </LoaderWrapper>
  );
}

export default App;