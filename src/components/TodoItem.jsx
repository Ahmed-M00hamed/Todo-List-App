import React from "react";
import { Pencil, X } from 'lucide-react';

function TodoItem({ todo, toggleComplete, deleteTodo, startEdit }) {
    return (
        <li className="flex items-center justify-between mb-2 p-2 border rounded hover:bg-gray-50">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="mr-2"
                />
                <span className={`${todo.completed ? "line-through text-gray-400" : ""} max-w-58 md:max-w-72 lg:max-w-88  wrap-break-word `}>
                    {todo.text}
                </span>
            </div>
            <div className="flex gap-x-1">
                <button
                    onClick={() => startEdit(todo)}
                    className={`px-1.5 py-1 rounded-2xl text-white bg-yellow-500 hover:bg-yellow-700 border border-yellow-700 transition-colors outline-none border-none`}
                >
                    <Pencil size={18} />
                </button>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className={`px-1 py-1 rounded-2xl text-white bg-red-500 hover:bg-red-700 border border-red-700 transition-colors outline-none border-none`}
                >
                    <X />
                </button>
            </div>
        </li>
    );
}

export default TodoItem;