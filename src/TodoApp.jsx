import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import Filter from "./components/Filter";
import { useNavigate } from "react-router-dom";


function TodoApp() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [todos, setTodos] = useState(() => {
        if (!currentUser) return [];
        const saved = localStorage.getItem(`todos_${currentUser.email}`);
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(
                `todos_${currentUser.email}`,
                JSON.stringify(todos)
            );
        }
    }, [todos]);

    const [filter, setFilter] = useState("all");
    const [editId, setEditId] = useState(null);

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
        localStorage.removeItem(`todos_${currentUser.email}`);
    };
    const filteredTodos = todos.filter(todo => {
        if (filter === "completed") return todo.completed;
        if (filter === "incomplete") return !todo.completed;
        return true;
    });

    return (
        <div className="max-w-sm lg:max-w-lg md:max-w-md mx-auto mt-50 p-5 bg-white border-1 border-gray-300  rounded">
            <button
                onClick={handleLogout}
                className="mb-4 bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition-colors "
            >
                Log Out
            </button>
            <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
            <TodoInput
                addEditTodo={addEditTodo}
                editTodo={todos.find(todo => todo.id === editId)}
            />
            <Filter filter={filter} setFilter={setFilter} ClearAll={clearAll} todos={todos} />
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

export default TodoApp;