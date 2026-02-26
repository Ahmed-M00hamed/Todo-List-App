import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find((u) => u.email === email)) {
            alert("Email already exists.");
            return;
        }

        const newUser = { email, password };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        navigate("/");
    };

    return (
        <form onSubmit={handleRegister} className="w-lg m-auto mt-50 p-5 border-1 border-gray-300 rounded flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Sign up</h2>
            <input 
                className="mb-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="mb-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  cursor-pointer" 
                type="submit"
            > SignUP</button>
            <p
                className="mt-4 text-sm text-gray-600">
                    Already have an account?
                <Link to="/login" className="text-blue-700 underline"> Login</Link>
            </p>
        </form>
    );
}

export default Register;