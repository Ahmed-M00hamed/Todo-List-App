import React, { useState, useEffect } from "react";


function TodoInput({ addEditTodo, editTodo }) {
    const [input, setInput] = useState("");

    useEffect(() => {
        if (editTodo?.text) setInput(editTodo.text);
    }, [editTodo]);

    const handleSubmit = () => {
        if (!input.trim()) return;
        addEditTodo(input);
        setInput("");
    };

    return (
        <div className="flex mb-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 p-2 border rounded-l outline-none"
            />
            <button
                onClick={handleSubmit}
                className={`px-4 rounded-r font-bold text-white transition-colors ${editTodo ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
                    }`}
            >
                {editTodo ? "Edit" : "Add"}
            </button>
        </div>
    );
}

export default TodoInput;