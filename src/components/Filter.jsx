import React from "react";

function Filter({ filter, setFilter, ClearAll, todos }) {
    const filters = [
        { name: "All", value: "all", color: "gray" },
        { name: "Completed", value: "completed", color: "green" },
        { name: "Incomplete", value: "incomplete", color: "red" },

    ];

    return (
        <div className="flex justify-center space-x-2 mb-4">
            {filters.map(f => (
                <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`px-1.5 py-1 rounded-2xl font-bold text-white bg-slate-600 hover:bg-slate-800 border border-slate-700 transition-colors ${filter === f.value ? `bg-${f.color}-600` : `bg-${f.color}-400 hover:bg-${f.color}-500`
                        }`}
                >
                    {f.name}
                </button>
            ))}
            {todos.length >= 2 && (
            <button
                onClick={ClearAll}
                className={`px-3 py-1 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-700 border border-red-700 transition-colors outline-none border-none`}
            >
                Delete All
            </button>
            )}
        </div>
    );
}

export default Filter;