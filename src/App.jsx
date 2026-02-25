import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import Filter from "./components/Filter";


function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  // إضافة أو تعديل
  const addEditTodo = (text) => {
    if (editId !== null) {
      setTodos(
        todos.map(todo => (todo.id === editId ? { ...todo, text } : todo))
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text, completed: false }]);
    }
  };

  const deleteTodo = (id) => setTodos(todos.filter(todo => todo.id !== id));

  const startEdit = (todo) => setEditId(todo.id);
  
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const clearAll = () => {
    setTodos([]);
    localStorage.removeItem("todos");
  };
  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="max-w-sm lg:max-w-lg md:max-w-md mx-auto mt-10 p-5 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
      <TodoInput
        addEditTodo={addEditTodo}
        editTodo={todos.find(todo => todo.id === editId)}
      />
      <Filter filter={filter} setFilter={setFilter} ClearAll={clearAll} todos={todos}  />
      <ul className="mt-4">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            startEdit={startEdit}
            ClearAll={clearAll}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;